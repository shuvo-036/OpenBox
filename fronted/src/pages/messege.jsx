import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = io("https://backend-w2fp.onrender.com"); // replace with your server URL

export default function Meggege() {
    const [name, setName] = useState("");
    const [tempName, setTempName] = useState("");
    const [keyValue, setKeyValue] = useState(""); // user key
    const [tempKey, setTempKey] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const fileInputRef = useRef();
    const chatEndRef = useRef(); // scroll to bottom
    const Navigate = useNavigate();

    // Join chat room
    const handleJoin = () => {
        if (tempName.trim() && tempKey.trim()) {
            setName(tempName.trim());
            setKeyValue(tempKey.trim());
            setTempName("");
            setTempKey("");

            socket.emit("joinRoom", { name: tempName.trim(), room: tempKey.trim() });
        }
    };

    // Listen for messages
    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send text message
    const sendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage = {
            sender: name,
            text: inputValue.trim(),
            type: "text",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        socket.emit("sendMessage", { room: keyValue, message: newMessage });
        setInputValue("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    // Send files (PDF/Image)
    const sendFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("https://backend-w2fp.onrender.com", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const fileMessage = {
                sender: name,
                text: res.data.url,
                type: file.type.startsWith("image") ? "image" : "pdf",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            socket.emit("sendMessage", { room: keyValue, message: fileMessage });
        } catch (err) {
            console.error("File upload failed:", err);
        }
    };
    const handellogout = () => {
        Navigate("/");
    }

    return (

        <>



            <div className="page-wrapper">

                {/* ekhan theke start hobe  */}






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
                        <button onClick={handleJoin} className="snackbar-button">Join</button>
                    </div>
                )}

                {name && (
                    <>
                        <div className="chat-box">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={msg.sender === name ? "message user-msg" : "message group-msg"}
                                >
                                    <div className="msg-header">
                                        <strong>{msg.sender}</strong> &nbsp;&nbsp; <span className="msg-time">{msg.time}</span>
                                    </div>
                                    <div className="msg-body">
                                        {msg.type === "text" && msg.text}
                                        {msg.type === "image" && (
                                            <img src={msg.text} alt="img" />
                                        )}
                                        {msg.type === "pdf" && (
                                            <a href={msg.text} target="_blank" rel="noopener noreferrer">PDF File</a>
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
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message..."
                                className="chat-input"
                            />
                            <label className="file-icon">
                                🖇
                                <input type="file" ref={fileInputRef} onChange={sendFile} />
                            </label>
                            <button className="send-button" onClick={sendMessage}>Send</button>
                            <button className="end-button" onClick={handellogout}>End-Room</button>
                        </div>
                    </>
                )}
                <br /><br />
                <div className="footer">

                    <p>Copyright © 2025 Golam Moniruzzaman</p>


                </div>

            </div>
        </>
    );
}

