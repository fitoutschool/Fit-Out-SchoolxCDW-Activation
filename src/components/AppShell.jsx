import { useState } from "react";
import {
  ArrowRight,
  LayoutDashboard,
  LockKeyhole,
  RotateCcw,
  X,
} from "lucide-react";

function Brand() {
  return (
    <div className="brand">
      <img
        className="brand-wordmark"
        src="/fitout-school-logo.png"
        alt="Fit-Out School"
      />
    </div>
  );
}

export default function AppShell({ children, onStaffReset, onOpenDashboard }) {
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Change this before the event.
  const STAFF_PIN = "AHMED&NAHLA";

  function verifyPin(e) {
    e.preventDefault();

    if (pin === STAFF_PIN) {
      setAuthenticated(true);
      setError("");
      setPin("");
    } else {
      setError("Incorrect staff PIN. Please try again.");
      setPin("");
    }
  }
  function closeStaffPanel() {
    setShowPin(false);
    setAuthenticated(false);
    setPin("");
    setError("");
  }

  function resetDevice() {
    onStaffReset?.();
    closeStaffPanel();
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <Brand />

        <div className="topbar-actions">
          <span className="edition-tag">CDW / 2026</span>

          <button
            type="button"
            className="staff-access-btn"
            onClick={() => setShowPin(true)}
            aria-label="Staff access"
            title="Staff access"
            aria-haspopup="dialog"
            aria-expanded={showPin}
          >
            <LockKeyhole size={16} />
            <span className="staff-access-label">STAFF ACCESS</span>
          </button>
        </div>
      </header>

      <section className="content">{children}</section>

      <footer className="footer">
        LEARN SOMETHING. TEST YOUR LUCK. WIN YOUR NEXT STEP.
      </footer>

      {showPin && (
        <div className="staff-overlay" onClick={closeStaffPanel}>
          <div
            className="staff-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="staff-close"
              onClick={closeStaffPanel}
              aria-label="Close"
            >
              <X size={19} />
            </button>

            {!authenticated ? (
              <>
                <div className="staff-icon">
                  <LockKeyhole size={23} />
                </div>

                <span className="staff-kicker">FIT-OUT SCHOOL / TEAM</span>
                <h2 id="staff-dialog-title">Staff Access</h2>
                <p>Enter your staff PIN to manage this device.</p>

                <form onSubmit={verifyPin}>
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Enter staff PIN"
                    aria-label="Staff PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    autoFocus
                  />

                  {error && <span className="staff-error">{error}</span>}

                  <button className="primary-btn" type="submit">
                    UNLOCK <LockKeyhole size={16} />
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="staff-icon">
                  <LockKeyhole size={23} />
                </div>

                <span className="staff-kicker">STAFF TOOLS</span>
                <h2 id="staff-dialog-title">What would you like to do?</h2>
                <p>Choose an action to continue.</p>

                <div className="staff-action-list">
                  <button
                    className="staff-action-card"
                    type="button"
                    onClick={() => {
                      onOpenDashboard?.();
                      closeStaffPanel();
                    }}
                  >
                    <span className="staff-action-icon">
                      <LayoutDashboard size={21} />
                    </span>
                    <span className="staff-action-copy">
                      <strong>View dashboard</strong>
                      <small>See registrations and reward activity</small>
                    </span>
                    <ArrowRight className="staff-action-arrow" size={18} />
                  </button>

                  <button
                    className="staff-action-card staff-action-reset"
                    type="button"
                    onClick={resetDevice}
                  >
                    <span className="staff-action-icon">
                      <RotateCcw size={21} />
                    </span>
                    <span className="staff-action-copy">
                      <strong>Start next participant</strong>
                      <small>Clear this device for the next visitor</small>
                    </span>
                    <ArrowRight className="staff-action-arrow" size={18} />
                  </button>
                </div>

                <button
                  className="staff-cancel-btn"
                  type="button"
                  onClick={closeStaffPanel}
                >
                  CLOSE
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
