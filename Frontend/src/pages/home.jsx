import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContexts.jsx";

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <>
            <div
                className="navBar"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 16px", // horizontal padding
                    height: 64, // or whatever your header height is
                    background: "#fff", // optional background
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ margin: 0 }}>Echoris</h2>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 16,       // space between the history group and the Logout button
                    }}
                >
                    {/* History “widget” */}
                    <div
                        onClick={() => navigate("/history")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap: 4,         // small gap between icon and text
                            padding: "4px 8px",  // clickable hit‑area
                            borderRadius: 4,     // subtle rounding
                            transition: "background .2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                        <RestoreIcon style={{ fontSize: 20 }} />
                        <span style={{ fontSize: 16, fontWeight: 500, lineHeight: 1 }}>
                            History
                        </span>
                    </div>

                    {/* Logout button */}
                    <Button
                        variant="text"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        style={{ textTransform: "none", fontWeight: 600, fontSize: 16, lineHeight: 1  }}
                    >
                        Logout
                    </Button>
                </div>

            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>The Highest Quality premium Meeting</h2>

                        <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
                            <TextField
                                onChange={(e) => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                            />
                            <Button onClick={handleJoinVideoCall} variant="contained">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="rightPanel">
                    <img srcSet="../public/3.svg" alt="" />
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
