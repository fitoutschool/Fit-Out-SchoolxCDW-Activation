import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const MotionDiv = motion.div;

export default function WelcomeScreen({ onStart }) {
  return (
    <MotionDiv
      className="hero screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="eyebrow">
        <Sparkles size={15} /> YOUR NEXT STEP STARTS HERE
      </div>
      <h1>
        DESIGN IS
        <br />
        JUST THE <em>BEGINNING.</em>
      </h1>
      <p className="lead">
        Think you know what it takes to turn design into reality? Take the
        challenge, spin the wheel, and win your next step.
      </p>
      <div className="hero-stats">
        <div>
          <strong>05</strong>
          <span>QUESTIONS</span>
        </div>
        <div>
          <strong>01</strong>
          <span>SPIN</span>
        </div>
        <div>
          <strong>∞</strong>
          <span>POSSIBILITIES</span>
        </div>
      </div>
      <button className="primary-btn" onClick={onStart}>
        START YOUR EXPERIENCE <ArrowRight size={18} />
      </button>
    </MotionDiv>
  );
}