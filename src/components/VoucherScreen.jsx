import { motion } from "framer-motion";
import { Gift, Trophy } from "lucide-react";

const MotionDiv = motion.div;

export default function VoucherScreen({ voucher }) {
  return (
    <MotionDiv
      className="panel voucher-panel screen"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="step-label">04 / YOUR REWARD</div>
      <div className="gift-icon">
        <Gift size={30} />
      </div>
      <h2>
        THIS IS
        <br />
        <em>YOUR NEXT STEP.</em>
      </h2>
      <p className="muted">Congratulations! You've unlocked:</p>
      <div className="reward-ticket">
        <span>YOUR FIT-OUT SCHOOL REWARD</span>
        <strong>{voucher.reward}</strong>
        <div className="ticket-divider" />
        <small>YOUR UNIQUE VOUCHER CODE</small>
        <code>{voucher.code}</code>
      </div>
      <button
        className="primary-btn"
        onClick={() => {
          navigator.clipboard?.writeText(voucher.code);
        }}
      >
        COPY VOUCHER CODE <Trophy size={18} />
      </button>
      <p className="fine-print">
        Keep your voucher code and present it to the FIT-OUT SCHOOL team when
        redeeming your reward. Terms and availability apply.
      </p>
    </MotionDiv>
  );
}