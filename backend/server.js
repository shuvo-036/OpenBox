const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Cloudinary config
cloudinary.config({
  cloud_name:"dh4kqxqjs",
  api_key: " 679239181159316",
  api_secret:" zWOj_3PWaxOrNzi7EceBwYaUmbE",
});

// Multer (temporary upload before Cloudinary)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    let previewUrl = "";
    let fileUrl = "";

    if (req.file.mimetype.startsWith("image")) {
      // Image upload
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      previewUrl = uploaded.secure_url;
      fileUrl = uploaded.secure_url;

    } else if (req.file.mimetype === "application/pdf") {
      // PDF preview (PNG)
      const preview = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto", // generates preview image
      });
      previewUrl = preview.secure_url;

      // PDF actual file (raw)
      const raw = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw", // real PDF
      });
      fileUrl = raw.secure_url;

    } else {
      // Other file types
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      previewUrl = uploaded.secure_url;
      fileUrl = uploaded.secure_url;
    }

    return res.json({ previewUrl, fileUrl });

  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
});

// Socket.io
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinRoom", ({ name, room }) => {
    socket.join(room);
    console.log(`${name} joined room: ${room}`);
  });

  socket.on("sendMessage", ({ room, message }) => {
    io.to(room).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
server.listen(5000, () => console.log("Server running on port 5000"));


