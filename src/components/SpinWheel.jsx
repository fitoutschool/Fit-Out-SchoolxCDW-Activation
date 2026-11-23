import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

const MotionDiv = motion.div;
const MotionWheel = motion.div;

const REWARDS = [
  { label: "10% OFF", value: 10, type: "DISCOUNT" },
  { label: "15% OFF", value: 15, type: "DISCOUNT" },
  { label: "20% OFF", value: 20, type: "DISCOUNT" },
  { label: "25% OFF", value: 25, type: "DISCOUNT" },
  { label: "FREE TRAINING", value: 100, type: "FREE" },
];

const SEGMENT_CENTERS = [90, 234, 315, 349.2, 358.2];
const WHEEL_LABELS = [
  { label: "10% OFF", className: "wheel-label-10" },
  { label: "15% OFF", className: "wheel-label-15" },
  { label: "20% OFF", className: "wheel-label-20" },
];

export default function SpinWheel({ onSpin, loading, onComplete }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const status = loading
    ? "SECURING YOUR REWARD..."
    : spinning
      ? "YOUR REWARD IS ON ITS WAY..."
      : "CLICK FS TO SPIN.";

  async function handleSpin() {
    if (spinning || loading) return;
    setSpinning(true);

    try {
      const voucher = await onSpin();
      const index = REWARDS.findIndex((reward) => reward.label === voucher.reward);
      const center = SEGMENT_CENTERS[index < 0 ? 0 : index];
      setRotation(360 * 6 + (360 - center));
    } catch {
      setSpinning(false);
    }
  }

  return (
    <MotionDiv
      className="panel screen spin-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="step-label">03 / THE REWARD WHEEL</div>
      <h2>
        You've earned
        <br />
        <em>your moment.</em>
      </h2>
      <p className="muted">
        Give the wheel a spin and reveal your FIT-OUT SCHOOL reward.
      </p>

      <div className="wheel-wrap">
        <div className="wheel-aura" />
        <div className="wheel-pointer">
          <span />
        </div>
        <MotionWheel
          className="wheel"
          role="img"
          aria-label="Reward wheel with discount and free training prizes"
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: [0.12, 0.75, 0.15, 1] }}
          onAnimationComplete={() => {
            if (spinning && rotation > 0) {
              setSpinning(false);
              onComplete();
            }
          }}
        >
          {WHEEL_LABELS.map(({ label, className }) => (
            <span className={`wheel-sector-label ${className}`} key={label}>
              {label}
            </span>
          ))}
        </MotionWheel>
        <button
          type="button"
          className="wheel-center-button"
          onClick={handleSpin}
          disabled={spinning || loading}
          aria-label="Spin the wheel to reveal your reward"
        >
          <Sparkles size={13} />
          <strong>FS</strong>
        </button>
      </div>

      <div className="spin-status" role="status" aria-live="polite">
        <span
          className={
            spinning || loading ? "spin-status-dot active" : "spin-status-dot"
          }
        />
        {status}
      </div>

      <div className="reward-legend" aria-label="Possible rewards">
        {REWARDS.map(({ label, type }, index) => (
          <div className="reward-chip" key={label}>
            <span
              className={`reward-chip-mark reward-chip-mark-${index + 1}`}
              aria-hidden="true"
            >
              {type === "FREE" ? <Gift size={12} /> : null}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <p className="spin-secure-note">Reward selected securely by our server</p>
    </MotionDiv>
  );
}