import { useNavigate } from "react-router-dom";
import { reportsData } from "../../data/reports";

export default function Analytics() {
  const navigate = useNavigate();

  const total = reportsData.length;
  const normal = reportsData.filter(r => r.status === "Normal").length;
  const abnormal = reportsData.filter(r => r.status === "Abnormal").length;
  const pending = reportsData.filter(r => r.status === "Pending").length;

  const abnormalReports = reportsData
    .filter(r => r.status === "Abnormal")
    .slice(0, 3);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "radial-gradient(circle at top, #181818, #0a0a0a)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1 style={{ marginBottom: "6px" }}>Analytics</h1>
            <p style={{ color: "#aaa" }}>
              Overview of your medical reports
            </p>
          </div>

          <button
            onClick={() => navigate("/reports")}
            style={{
              padding: "10px 18px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "#fff",
              backdropFilter: "blur(16px)",
              cursor: "pointer",
            }}
          >
            ← Back to Reports
          </button>
        </div>

        {/* STATS CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          {[
            ["Total Reports", total],
            ["Normal", normal],
            ["Abnormal", abnormal],
            ["Pending", pending],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                padding: "24px",
                borderRadius: "22px",
                background:
                  label === "Abnormal"
                    ? "rgba(255,90,90,0.18)"
                    : "rgba(255,255,255,0.12)",
                border:
                  label === "Abnormal"
                    ? "1px solid rgba(255,124,124,0.6)"
                    : "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(22px)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(0)")
              }
            >
              <h3 style={{ marginBottom: "8px", color: "#ccc" }}>
                {label}
              </h3>
              <h1>{value}</h1>
            </div>
          ))}
        </div>

        {/* DISTRIBUTION */}
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ marginBottom: "20px" }}>
            Report Distribution
          </h2>

          {[
            ["Normal", normal, "#7CFFA6"],
            ["Abnormal", abnormal, "#FF7C7C"],
            ["Pending", pending, "#FFE27C"],
          ].map(([label, count, color]) => (
            <div key={label} style={{ marginBottom: "16px" }}>
              <small style={{ color: "#aaa" }}>{label}</small>
              <div
                style={{
                  height: "10px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: total
                      ? `${(count / total) * 100}%`
                      : "0%",
                    height: "100%",
                    background: color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* RECENT ABNORMAL */}
        <div>
          <h2 style={{ marginBottom: "16px" }}>
            Recent Abnormal Reports
          </h2>

          {abnormalReports.length === 0 ? (
            <p style={{ color: "#7CFFA6" }}>
              ✅ All reports look normal
            </p>
          ) : (
            abnormalReports.map(r => (
              <div
                key={r.id}
                onClick={() => navigate(`/report/${r.id}`)}
                style={{
                  padding: "18px",
                  borderRadius: "18px",
                  marginBottom: "14px",
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform =
                    "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform =
                    "translateY(0)")
                }
              >
                <strong>{r.title}</strong>
                <span
                  style={{
                    marginLeft: "10px",
                    color: "#FF7C7C",
                  }}
                >
                  Abnormal
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
