import React from "react";

export default function Contact() {

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background:
                    "linear-gradient(135deg,#b7e5d4,#c9e7ff,#fce1e4)",


                backgroundSize: "300% 300%",
                animation: "animatedBG 14s ease infinite",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Back to home button */}
            <button
                onClick={() => (window.location.href = "/")}
                style={{
                    position: "absolute",
                    top: "25px",
                    right: "30px",
                    padding: "10px 20px",
                    background: "rgba(255,255,255,0.15)",
                    color: "#695757ff",
                    border: "1px solid rgba(255,255,255,0.45)",
                    borderRadius: "50px",
                    backdropFilter: "blur(8px)",
                    cursor: "pointer",
                    fontSize: "17px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    textShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
                    transition: "all .25s ease",
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05) translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1) translateY(0)";
                }}
            >
                ← Back Home 🏠
            </button>

            <h1
                style={{
                    color: "#418e7cff",
                    fontSize: "36px",
                    fontWeight: "700",
                    textShadow: "0 4px 20px rgba(0,0,0,.3)",
                    marginBottom: "35px",
                }}
            >
                Contact With Developer
            </h1>

            {/* INLINE TAGS */}
            <div style={{ display: "flex", gap: "18px" }}>
                <button
                    style={{
                        padding: "14px 30px",
                        background: "#111827",
                        color: "#fff",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        letterSpacing: "0.4px",
                        transition: "all .2s ease",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                    }}
                    onClick={() => (window.location.href = "https://shuvo-036.onrender.com/")}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05) translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1) translateY(0)";
                    }}
                >
                    🧑‍💻 Career
                </button>

                <button
                    style={{
                        padding: "14px 30px",
                        background: "#f87171",
                        color: "#fff",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        letterSpacing: "0.4px",
                        transition: "all .2s ease",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                    }}
                    onClick={() => (window.location.href = "https://www.paypal.com/paypalme/demo")}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05) translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1) translateY(0)";
                    }}
                >
                    💸 Donate
                </button>

                <button
                    style={{
                        padding: "14px 30px",
                        background: "#34a853",
                        color: "#fff",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        letterSpacing: "0.4px",
                        transition: "all .2s ease",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                    }}
                    onClick={() => (window.location.href = "mailto:iamshuvo036@gmail.com")}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05) translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1) translateY(0)";
                    }}
                >
                    💡 Give an Advice
                </button>
            </div>

            <style>{`
        @keyframes animatedBG {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
}

