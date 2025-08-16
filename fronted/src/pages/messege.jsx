import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ⚠️ If you see duplicate connections in dev, ensure this file isn't hot-reloading multiple times.
const socket = io("https://backend-w2fp.onrender.com", {
    autoConnect: true,
});

export default function Meggege() {
    const [name, setName] = useState("");
    const [tempName, setTempName] = useState("");
    const [keyValue, setKeyValue] = useState("");
    const [tempKey, setTempKey] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const fileInputRef = useRef();
    const chatEndRef = useRef();
    const messageIdsRef = useRef(new Set()); // track IDs to avoid duplicates when server echoes back
    const navigate = useNavigate();

    // Join chat room
    const handleJoin = () => {
        if (tempName.trim() && tempKey.trim()) {
            const cleanName = tempName.trim();
            const cleanKey = tempKey.trim();
            setName(cleanName);
            setKeyValue(cleanKey);
            setTempName("");
            setTempKey("");

            socket.emit("joinRoom", { name: cleanName, room: cleanKey });
        }
    };

    // Listen for messages (attach once)
    useEffect(() => {
        const onReceive = (msg) => {
            const id =
                msg.id ||
                `${msg.sender}-${msg.time}-${msg.text?.slice(0, 20)}`;

            if (messageIdsRef.current.has(id)) return;
            messageIdsRef.current.add(id);

            setMessages((prev) => [...prev, { ...msg, id }]);
        };

        socket.on("receiveMessage", onReceive);

        return () => {
            socket.off("receiveMessage", onReceive);
        };
    }, []);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const nowTime = () =>
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    const genId = () =>
        `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    // Send text message (optimistic update)
    const sendMessage = () => {
        if (!inputValue.trim() || !name || !keyValue) return;

        const newMessage = {
            id: genId(),
            sender: name,
            text: inputValue.trim(),
            type: "text",
            time: nowTime(),
        };

        messageIdsRef.current.add(newMessage.id);
        setMessages((prev) => [...prev, newMessage]);

        socket.emit("sendMessage", { room: keyValue, message: newMessage });
        setInputValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Send files (PDF/Image) with optimistic update
    const sendFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !name || !keyValue) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(
                "https://backend-w2fp.onrender.com/upload",
                formData // 👈 no manual headers
            );

            const fileMessage = {
                id: genId(),
                sender: name,
                text: res.data.previewUrl, // thumbnail or same URL for image
                fileUrl: res.data.fileUrl, // direct file URL
                type: file.type.startsWith("image") ? "image" : "pdf",
                time: nowTime(),
            };

            messageIdsRef.current.add(fileMessage.id);
            setMessages((prev) => [...prev, fileMessage]);

            socket.emit("sendMessage", { room: keyValue, message: fileMessage });

            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            console.error("File upload failed:", err.response || err.message);
            alert("File upload failed. Please try again.");
        }
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <>
            <div className="page-wrapper">
                {!name && (
                    <div className="snackbar">
                        <input
                            type="text"
                            placeholder="Enter your name..."
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="snackbar-input"
                        />
                        <input
                            type="password"
                            placeholder="Enter chat key..."
                            value={tempKey}
                            onChange={(e) => setTempKey(e.target.value)}
                            className="snackbar-input"
                        />
                        <button onClick={handleJoin} className="snackbar-button">
                            Join
                        </button>
                    </div>
                )}

                {name && (
                    <>
                        <div className="chat-box">
                            {messages.map((msg, idx) => (
                                <div
                                    key={msg.id || idx}
                                    className={
                                        msg.sender === name
                                            ? "message user-msg"
                                            : "message group-msg"
                                    }
                                >
                                    <div className="msg-header">
                                        <strong>{msg.sender}</strong> &nbsp;&nbsp;
                                        <span className="msg-time">{msg.time}</span>
                                    </div>
                                    <div className="msg-body">
                                        {msg.type === "text" && msg.text}

                                        {msg.type === "image" && (
                                            <img
                                                src={msg.text}
                                                alt={`${msg.sender}'s upload`}
                                                style={{ maxWidth: "100%", borderRadius: 8 }}
                                            />
                                        )}

                                        {msg.type === "pdf" && (
                                            <>
                                                {msg.text && (
                                                    <img
                                                        src={msg.text}
                                                        alt={`${msg.sender}'s PDF preview`}
                                                        style={{
                                                            maxWidth: "200px",
                                                            marginBottom: 8,
                                                            borderRadius: 6,
                                                        }}
                                                    />
                                                )}

                                                <iframe
                                                    title={`pdf-${msg.id}`}
                                                    src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
                                                        msg.fileUrl || ""
                                                    )}`}
                                                    width="100%"
                                                    height="60vh"
                                                    allowFullScreen
                                                    style={{ border: "none" }}
                                                />

                                                <div style={{ marginTop: 8 }}>
                                                    <a
                                                        href={msg.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Open PDF in new tab
                                                    </a>{" "}
                                                    |{" "}
                                                    <a href={msg.fileUrl} download>
                                                        Download PDF
                                                    </a>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="input-bar">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="chat-input"
                            />
                            <label className="file-icon">
                                🖇
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={sendFile}
                                    accept="image/*,.pdf"
                                />
                            </label>
                            <button className="send-button" onClick={sendMessage}>
                                Send
                            </button>
                            <button className="end-button" onClick={handleLogout}>
                                End-Room
                            </button>
                        </div>
                    </>
                )}

                <br />
                <br />
                <div className="footer">
                    <p>Copyright © 2025 Golam Moniruzzaman</p>
                </div>
            </div>
        </>
    );
}

