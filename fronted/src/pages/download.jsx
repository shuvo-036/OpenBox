import React, { useState } from "react";

export default function Download() {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background: "linear-gradient(120deg,#89f7fe,#66a6ff,#ff9c9c)",
                backgroundSize: "300% 300%",
                animation: "animateBG 12s ease infinite",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Back to Home Button */}
            <button
                onClick={() => (window.location.href = "/")}
                style={{
                    position: "absolute",
                    top: "25px",
                    right: "30px",
                    padding: "10px 20px",
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.45)",
                    borderRadius: "50px",
                    backdropFilter: "blur(8px)",
                    cursor: "pointer",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    textShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
                    transition: "all .25s ease",
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0) scale(1)";
                }}
            >
                ← Back Home
            </button>

            <h1
                style={{
                    fontSize: "34px",
                    color: "#ffffff",
                    marginBottom: "25px",
                    textShadow: "0 5px 20px rgba(0,0,0,.4)",
                    fontWeight: "700",
                }}
            >
                Download Our Messenger
            </h1>

            <button
                onClick={() => setShowOptions(true)}
                style={{
                    padding: "16px 30px",
                    fontSize: "17px",
                    fontWeight: "600",
                    background: "#ffffff",
                    color: "#111827",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                    transition: "all .2s ease",
                }}
            >
                Download Now
            </button>

            {showOptions && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: "100vw",
                        backgroundColor: "rgba(0,0,0,.45)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            background: "#ffffff",
                            padding: "30px 35px",
                            borderRadius: "14px",
                            width: "320px",
                            textAlign: "center",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
                        }}
                    >
                        <h2 style={{ marginBottom: "20px", fontWeight: 600 }}>
                            Choose Platform
                        </h2>

                        <button
                            style={{
                                width: "100%",
                                marginBottom: "10px",
                                padding: "12px 0",
                                background: "#4f9cff",
                                color: "#fff",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "500",
                            }}
                            onClick={() =>
                                (window.location.href = "https://example.com/webstore")
                            }
                        >
                            Web Store
                        </button>

                        <button
                            style={{
                                width: "100%",
                                marginBottom: "10px",
                                padding: "12px 0",
                                background: "#000",
                                color: "#fff",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "500",
                            }}
                            onClick={() =>
                                (window.location.href = "https://example.com/appstore")
                            }
                        >
                            App Store
                        </button>

                        <button
                            style={{
                                width: "100%",
                                padding: "12px 0",
                                background: "#34a853",
                                color: "#fff",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "500",
                            }}
                            onClick={() =>
                                (window.location.href = "https://example.com/playstore")
                            }
                        >
                            Google Play
                        </button>

                        <button
                            onClick={() => setShowOptions(false)}
                            style={{
                                marginTop: "15px",
                                fontSize: "14px",
                                color: "#6b7280",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* background animation */}
            <style>{`
        @keyframes animateBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
}


