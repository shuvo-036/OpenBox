import React, { useState } from "react";

export default function Newchat() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background: "linear-gradient(135deg,#89f7fe,#66a6ff,#ff9d9d)",
                backgroundSize: "400% 400%",
                animation: "gradientBG 15s ease infinite",
            }}
        >
            <div
                style={{

                    color: "#fff",
                    textShadow: "0 4px 10px rgba(0,0,0,.3)",
                    marginBottom: "30px",
                }}>
                <h1
                    style={{
                        fontSize: "56px",
                        fontWeight: "700",
                    }}
                > Welcome to the newchat-page ✨</h1>
                <br />
                <p
                    style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        textAlign: "center",
                        color: "#414a66"
                    }}

                >
                    We apologize for your inconvenience : &nbsp;&nbsp;&nbsp;<span style={{ color: "#c42b63" }}>This page is in under construction</span></p>


            </div>


            <button
                onClick={() => setShowPopup(true)}
                style={{
                    padding: "14px 28px",
                    background: "#fff",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                    transition: "all 0.2s ease",
                }}
            >
                Message From Devloper
            </button>

            {showPopup && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,.4)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            width: "350px",
                            padding: "25px 30px",
                            background: "#ffffff",
                            borderRadius: "14px",
                            boxShadow:
                                "0 10px 30px rgba(0, 0, 0, 0.4), 0 4px 15px rgba(0,0,0,0.15)",
                            textAlign: "center",
                        }}
                    >
                        <h2 style={{ marginBottom: "15px" }}>👋 Hello!</h2>
                        <p style={{ marginBottom: "20px", color: "#555" }}>
                            We'll be back soon, Now you can go with existing page.
                        </p>
                        <button
                            onClick={() => window.location.href = "/"
                            }
                            style={{

                                padding: "10px 22px",
                                background: "#4f9cff",
                                color: "#fff",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "500",
                            }}
                        >
                            Back to Home
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                            onClick={() => setShowPopup(false)
                            }
                            style={{

                                padding: "10px 22px",
                                background: "#ff4f4f",
                                color: "#fff",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "500",
                            }}
                        >
                            ⛌
                        </button>
                    </div>
                </div>
            )}

            {/* Gradient animation keyframes */}
            <style>
                {`
          @keyframes gradientBG {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
            </style>
        </div>
    );
}

