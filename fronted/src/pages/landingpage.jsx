// LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
            <div
                style={{
                    margin: 0,
                    fontFamily: "Arial, sans-serif",
                    background: "linear-gradient(135deg,#4f9cff,#a16eff)",
                    color: "#fff",
                    height: "100vh",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                {/* Top-left title box */}
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        padding: "8px 18px",
                        background: "rgba(255,255,255,0.2)",
                        color: "#57137eff",
                        backdropFilter: "blur(6px)",
                        borderRadius: "14px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                    }}
                >
                    OpenBox-(A product of NewOne)
                </div>

                {/* Top-right title box */}
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        padding: "8px 18px",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(6px)",
                        borderRadius: "14px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",

                    }}
                >
                    <Link
                        to="contact"
                        style={{ cursor: "pointer", textDecoration: "none", color: "#57137eff" }}
                    >
                        Contact With Developer
                    </Link>
                </div>

                {/* Copyright bottom-left */}
                <p
                    style={{
                        textAlign: "center",
                        bottom: "15px",
                        left: "20px",
                        fontSize: "50px",
                        opacity: 0.8,
                        animation: "floatUpDown 2s ease-in-out infinite"
                    }}



                >
                    Love from OpenBox Team
                </p>


                <style>{`
  @keyframes floatUpDown {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-15px); }
    100% { transform: translateY(0); }
  }
`}</style>





                <div
                    style={{
                        maxWidth: "500px",
                        padding: "40px",
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: "20px",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                >
                    <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>OpenBox</h1>
                    <p style={{ fontSize: "16px", lineHeight: "24px", marginBottom: "30px" }}>
                        Connect instantly with your friends and family. <br /> Simple, fast and secure
                        messaging app.
                    </p>

                    <a
                        href="messege"
                        style={{
                            display: "inline-block",
                            padding: "15px 35px",
                            background: "#ffffff",
                            color: "#000",
                            fontWeight: 600,
                            textDecoration: "none",
                            borderRadius: "50px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
                            transition: "all .2s",
                        }}
                    >
                        Create a new page
                    </a>
                    <br />
                    <br />
                    <a
                        href="newpage"
                        style={{
                            display: "inline-block",
                            padding: "15px 35px",
                            background: "#ffffff",
                            color: "#000",
                            fontWeight: 600,
                            textDecoration: "none",
                            borderRadius: "50px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
                            transition: "all .2s",
                        }}
                    >
                        Go to Existing page
                    </a>
                    <br />
                    <br />
                    <a
                        href="download"
                        style={{
                            display: "inline-block",
                            padding: "15px 35px",
                            background: "#ffffff",
                            color: "#000",
                            fontWeight: 600,
                            textDecoration: "none",
                            borderRadius: "50px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
                            transition: "all .2s",
                        }}
                    >
                        Download Messenger
                    </a>
                </div>

            </div>


            <div className="footer" style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", background: "linear-gradient(135deg,#4f9cff,#a16eff)", color: "#fff" }}>

                <p>Copyright © 2025 Golam Moniruzzaman</p>


            </div >
        </>
    );
}
