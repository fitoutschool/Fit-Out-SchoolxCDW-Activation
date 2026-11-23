import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";

const MotionDiv = motion.div;

const QUESTIONS = [
  {
    question: "What should happen before applying a finishing material?",
    options: [
      "Prepare and inspect the surface",
      "Install furniture",
      "Apply the final coat immediately",
      "Ignore surface conditions",
    ],
    correct: 0,
  },
  {
    question: "What is the main purpose of a site measurement?",
    options: [
      "To choose wall colors",
      "To ensure accurate execution",
      "To estimate social media reach",
      "To select furniture styles",
    ],
    correct: 1,
  },
  {
    question: "Which drawing helps communicate dimensions and layout?",
    options: [
      "Moodboard",
      "Perspective render",
      "Technical plan",
      "Color palette",
    ],
    correct: 2,
  },
  {
    question: "What is important before installing floor tiles?",
    options: [
      "Check substrate preparation and levels",
      "Paint the ceiling",
      "Install curtains",
      "Choose decorative accessories",
    ],
    correct: 0,
  },
  {
    question:
      "A design looks perfect on screen, but the site conditions differ. What is the best approach?",
    options: [
      "Ignore the site conditions",
      "Make changes without coordination",
      "Review, coordinate, and adapt the execution",
      "Stop communicating with the team",
    ],
    correct: 2,
  },
];

export default function QuizScreen({ onComplete, loading }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const question = QUESTIONS[index];
  const selected = answers[index];

  function choose(optionIndex) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = optionIndex;
      return next;
    });
  }

  function next() {
    if (index < QUESTIONS.length - 1) {
      setIndex((current) => current + 1);
    } else {
      onComplete(
        answers.map((answer, questionIndex) => ({
          question: questionIndex + 1,
          answer,
        })),
      );
    }
  }

  return (
    <MotionDiv
      className="panel screen"
      key={index}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="step-label">02 / THE FIT-OUT CHALLENGE</div>
      <div className="quiz-progress">
        <span>QUESTION {String(index + 1).padStart(2, "0")} / 05</span>
        <span>{Math.round(((index + 1) / 5) * 100)}%</span>
      </div>
      <div className="progress-track">
        <div style={{ width: `${((index + 1) / 5) * 100}%` }} />
      </div>
      <h2 className="question-title">{question.question}</h2>
      <div className="answers">
        {question.options.map((option, optionIndex) => (
          <button
            key={option}
            className={`answer ${selected === optionIndex ? "selected" : ""}`}
            onClick={() => choose(optionIndex)}
          >
            <span className="answer-letter">
              {String.fromCharCode(65 + optionIndex)}
            </span>
            {option}
            {selected === optionIndex && <CheckCircle2 size={19} />}
          </button>
        ))}
      </div>
      <div className="quiz-actions">
        {index > 0 && (
          <button className="back-btn" onClick={() => setIndex((i) => i - 1)}>
            <ChevronLeft size={18} /> BACK
          </button>
        )}
        <button
          className="primary-btn"
          disabled={selected === undefined || loading}
          onClick={next}
        >
          {loading
            ? "SAVING..."
            : index === QUESTIONS.length - 1
              ? "COMPLETE CHALLENGE"
              : "NEXT QUESTION"}
          <ArrowRight size={18} />
        </button>
      </div>
      <p className="quiz-note">
        This is just for fun. Your answers don't affect your reward.
      </p>
    </MotionDiv>
  );
}