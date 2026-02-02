import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { reportsData } from "../../data/reports";

export default function Reports() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  /* ---------- AUTH + LOADER ---------- */
  useEffect(() => {
    const patientId = localStorage.getItem("patientId");
    if (!patientId) navigate("/");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  /* ---------- LAST UPDATED ---------- */
  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setLastUpdated(formatted);
  }, []);

  const filteredReports = reportsData
    .filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (r) => statusFilter === "all" || r.status === statusFilter
    );

  /* ---------- LOADER ---------- */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, #181818, #0a0a0a)",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.2)",
            borderTop: "3px solid #fff",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #181818 0%, #0a0a0a 60%)",
        padding: "50px 20px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* BRAND */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "30px",
            fontWeight: "600",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.4px",
          }}
        >
          Medisetu
        </div>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "36px",
          }}
        >
          <div>
            <h1 style={{ marginBottom: "6px" }}>
              Reports Locker
            </h1>

            <small style={{ color: "#aaa", display: "block" }}>
              Patient ID: {localStorage.getItem("patientId")}
            </small>

            <small style={{ color: "#777", fontSize: "12px" }}>
              Last synced: {lastUpdated}
            </small>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div style={{ display: "flex", gap: "14px" }}>
            <button
              onClick={() => navigate("/analytics")}
              style={{
                padding: "10px 18px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                backdropFilter: "blur(18px)",
                cursor: "pointer",
              }}
            >
              📊 Stats
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("patientId");
                navigate("/");
              }}
              style={{
                padding: "10px 18px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                backdropFilter: "blur(18px)",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div style={{ marginBottom: "36px" }}>
          <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  style={{
    width: "220px",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "14px",

    /* glass effect */
    backgroundColor: "rgba(255,255,255,0.14)",
    backdropFilter: "blur(14px)",

    color: "#fff",
    border: "1px solid rgba(255,255,255,0.3)",
    outline: "none",
    cursor: "pointer",
  }}
>
  <option
    value="all"
    style={{ backgroundColor: "#111", color: "#fff" }}
  >
    All Reports
  </option>

  <option
    value="Normal"
    style={{ backgroundColor: "#111", color: "#fff" }}
  >
    Normal
  </option>

  <option
    value="Abnormal"
    style={{ backgroundColor: "#111", color: "#fff" }}
  >
    Abnormal
  </option>

  <option
    value="Pending"
    style={{ backgroundColor: "#111", color: "#fff" }}
  >
    Pending
  </option>
</select>


          <input
            type="text"
            placeholder="Search reports…"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff",
              outline: "none",
            }}
          />
        </div>

        {/* REPORT LIST */}
        {filteredReports.length === 0 ? (
          <p style={{ color: "#aaa" }}>
            🔍 No reports found
          </p>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              onMouseEnter={() =>
                setHoveredId(report.id)
              }
              onMouseLeave={() =>
                setHoveredId(null)
              }
              style={{
                padding: "24px",
                borderRadius: "22px",
                marginBottom: "22px",
                background:
                  hoveredId === report.id
                    ? "rgba(255,255,255,0.18)"
                    : "rgba(255,255,255,0.12)",
                backdropFilter: "blur(22px)",
                border:
                  "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.3s ease",
              }}
            >
              <div>
                <h3 style={{ marginBottom: "10px" }}>
                  {report.title}
                </h3>

                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    background:
                      report.status === "Normal"
                        ? "rgba(80,200,120,0.25)"
                        : report.status === "Abnormal"
                        ? "rgba(255,90,90,0.25)"
                        : "rgba(255,210,80,0.25)",
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
              </div>

              <Link
                to={`/report/${report.id}`}
                style={{
                  padding: "12px 22px",
                  borderRadius: "16px",
                  textDecoration: "none",
                  color: "#fff",
                  background: "rgba(255,255,255,0.18)",
                  border:
                    "1px solid rgba(255,255,255,0.35)",
                  backdropFilter: "blur(16px)",
                }}
              >
                View →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
