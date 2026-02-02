import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [patientId, setPatientId] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!patientId) return;
    localStorage.setItem("patientId", patientId);
    navigate("/reports");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1f1f1f, #050505)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* GLASS CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px",
          borderRadius: "22px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Meditsu</h1>
        <p style={{ color: "#bbb", marginBottom: "30px" }}>
          Secure access to your medical reports
        </p>

        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(255,255,255,0.12)",
            color: "#fff",
            outline: "none",
            marginBottom: "24px",
            backdropFilter: "blur(12px)",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.35)",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            backdropFilter: "blur(14px)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background =
              "rgba(255,255,255,0.28)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background =
              "rgba(255,255,255,0.18)")
          }
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
