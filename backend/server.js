


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins (for dev)
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.random().toString(36).slice(2, 9) + ext);
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      
                
  const fileUrl = `https://backend-w2fp.onrender.com/uploads/${req.file.filename}`;
  const previewUrl = req.file.mimetype.startsWith("image") ? fileUrl : "";

  res.json({ fileUrl, previewUrl });
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a chat room
  socket.on("joinRoom", ({ name, room }) => {
    socket.join(room);
    console.log(`${name} joined room: ${room}`);

    // Notify other users in the room
    socket.to(room).emit("receiveMessage", {
      id: `sys-${Date.now()}`,
      sender: "System",
      text: `${name} joined the chat`,
      type: "text",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  });

  // Handle messages
  socket.on("sendMessage", ({ room, message }) => {
    io.to(room).emit("receiveMessage", message);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = 5001;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


