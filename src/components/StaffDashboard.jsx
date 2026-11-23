import { createElement, useEffect, useState } from "react";
import {
  Users,
  ClipboardCheck,
  Ticket,
  BadgeCheck,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { api } from "../services/api";

export default function StaffDashboard({ onBack }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStats() {
    try {
      const result = await api.getDashboardStats();
      setStats(result.stats);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  }

  function refreshStats() {
    setLoading(true);
    setError("");
    loadStats();
  }

  useEffect(() => {
    let active = true;

    api
      .getDashboardStats()
      .then((result) => {
        if (active) {
          setStats(result.stats);
          setError("");
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Unable to load dashboard statistics.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const cards = [
    {
      label: "Registrations",
      value: stats?.totalParticipants,
      icon: Users,
    },
    {
      label: "Quiz Completions",
      value: stats?.completedQuizzes,
      icon: ClipboardCheck,
    },
    {
      label: "Vouchers Issued",
      value: stats?.vouchersIssued,
      icon: Ticket,
    },
    {
      label: "Redeemed Vouchers",
      value: stats?.redeemedVouchers,
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="staff-dashboard">
      <div className="dashboard-heading">
        <div>
          <span className="dashboard-eyebrow">FIT-OUT SCHOOL / CDW 2026</span>
          <h1>
            Staff <em>Dashboard.</em>
          </h1>
          <p>Activation overview and live performance.</p>
        </div>

        <button className="dashboard-back-btn" onClick={onBack}>
          <ArrowLeft size={17} />
          BACK
        </button>
      </div>

      <div className="dashboard-toolbar">
        <span>
          {loading
            ? "Updating statistics..."
            : stats
              ? `Updated ${new Date(stats.lastUpdated).toLocaleTimeString()}`
              : "Statistics unavailable"}
        </span>

        <button className="dashboard-refresh-btn" onClick={refreshStats} disabled={loading}>
          <RefreshCw size={15} className={loading ? "refresh-spinning" : ""} />
          REFRESH
        </button>
      </div>

      {error && (
        <div className="dashboard-error">
          <AlertCircle size={17} />
          {error}
        </div>
      )}

      <div className="dashboard-stats-grid">
        {cards.map(({ label, value, icon }) => (
          <div className="dashboard-stat-card" key={label}>
            <div className="dashboard-stat-icon">
              {createElement(icon, { size: 20 })}
            </div>

            <strong>{loading && stats === null ? "—" : (value ?? 0)}</strong>

            <span>{label}</span>
          </div>
        ))}
      </div>

      <section className="reward-breakdown">
        <div className="breakdown-heading">
          <div>
            <span className="dashboard-eyebrow">REWARD ANALYTICS</span>
            <h2>Reward Distribution</h2>
          </div>

          <span className="breakdown-total">
            {stats?.vouchersIssued ?? 0} TOTAL
          </span>
        </div>

        {stats?.rewardBreakdown?.map((reward) => {
          const percentage =
            stats.vouchersIssued > 0
              ? (reward.issued / stats.vouchersIssued) * 100
              : 0;

          return (
            <div className="reward-row" key={reward.label}>
              <div className="reward-row-info">
                <span>{reward.label}</span>
                <strong>{reward.issued}</strong>
              </div>

              <div className="reward-progress">
                <div
                  className="reward-progress-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        {!loading && !stats?.rewardBreakdown?.length && (
          <p className="dashboard-empty">No vouchers issued yet.</p>
        )}
      </section>

      <div className="dashboard-footer">
        <div>
          <span>Pending vouchers</span>
          <strong>{stats?.pendingVouchers ?? 0}</strong>
        </div>

        <div>
          <span>Quiz completion rate</span>
          <strong>
            {stats?.totalParticipants
              ? `${Math.round(
                  (stats.completedQuizzes / stats.totalParticipants) * 100,
                )}%`
              : "0%"}
          </strong>
        </div>
      </div>
    </div>
  );
}
