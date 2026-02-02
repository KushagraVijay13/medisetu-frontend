import { useParams, useNavigate } from "react-router-dom";
import { reportsData } from "../../data/reports";
const glassButtonStyle = {
  padding: "12px 24px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.18)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.35)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  cursor: "pointer",
  fontWeight: "500",
  letterSpacing: "0.3px",
  transition: "all 0.25s ease",
};

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const report = reportsData.find((r) => r.id === Number(id));

  if (!report) {
    return (
      <div style={{ padding: "40px", color: "#fff" }}>
        <p>Report not found</p>
        <button onClick={() => navigate("/reports")}>Back</button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        padding: "40px 20px",
      }}
    >
      {/* PAGE CONTAINER */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* CARD */}
        <div
          style={{
            background: "#1a1a1a",
            padding: "32px",
            borderRadius: "14px",
            border: "1px solid #2a2a2a",
            boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
          }}
        >
          {/* Back */}
          <button
            onClick={() => navigate("/reports")}
            style={{
              marginBottom: "20px",
              background: "transparent",
              border: "none",
              color: "#aaa",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ← Back to Reports
          </button>

          {/* Title */}
          <h1 style={{ marginBottom: "10px" }}>{report.title}</h1>

          {/* Meta */}
          <p><strong>Date:</strong> {report.date}</p>
          <p><strong>Source:</strong> {report.source}</p>

          {/* Status Badge */}
          <span
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "14px",
              background:
                report.status === "Normal"
                  ? "#173f2a"
                  : report.status === "Abnormal"
                  ? "#3f1d1d"
                  : "#3a3a1a",
              color:
                report.status === "Normal"
                  ? "#7CFFA6"
                  : report.status === "Abnormal"
                  ? "#FF7C7C"
                  : "#FFE27C",
            }}
          >
            {report.status}
          </span>

          <hr style={{ margin: "28px 0" }} />

          {/* Doctor Notes */}
          <h3>Doctor Notes</h3>
          <p style={{ color: "#bbb" }}>
            This is a dummy medical report created for demonstration purposes only.
          </p>

          <hr style={{ margin: "28px 0" }} />

          {/* Report File */}
          <h3>Report File</h3>
          <div
            style={{
              marginTop: "14px",
              padding: "16px",
              border: "1px solid #333",
              borderRadius: "10px",
              background: "#141414",
              maxWidth: "400px",
            }}
          >
            <p><strong>File name:</strong> cbc_report.pdf</p>
            <p><strong>File size:</strong> 1.2 MB</p>

            <button
  onClick={() => alert("Download started (dummy)")}
  style={glassButtonStyle}
  onMouseEnter={(e) => {
    e.target.style.background = "rgba(255,255,255,0.28)";
    e.target.style.transform = "translateY(-1px)";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "rgba(255,255,255,0.18)";
    e.target.style.transform = "translateY(0)";
  }}
  onMouseDown={(e) => {
    e.target.style.transform = "scale(0.97)";
  }}
  onMouseUp={(e) => {
    e.target.style.transform = "scale(1)";
  }}
>
  Download
</button>

          </div>
        </div>
      </div>
    </div>
  );
}
