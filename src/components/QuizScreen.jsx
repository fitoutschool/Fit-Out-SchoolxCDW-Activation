import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";

const MotionDiv = motion.div;

const OPTION_LABELS = {
  en: ["A", "B", "C", "D"],
  ar: ["أ", "ب", "ج", "د"],
};

const QUESTIONS = [
  {
    en: {
      question: "What should happen before applying a finishing material?",
      options: [
        "Prepare and inspect the surface",
        "Install furniture",
        "Apply the final coat immediately",
        "Ignore surface conditions",
      ],
    },
    ar: {
      question: "ما الذي يجب فعله قبل تطبيق مواد التشطيب؟",
      options: [
        "تجهيز السطح وفحصه",
        "تركيب الأثاث",
        "تطبيق الطبقة النهائية فورًا",
        "تجاهل حالة السطح",
      ],
    },
    correct: 0,
  },
  {
    en: {
      question: "What is the main purpose of a site measurement?",
      options: [
        "To choose wall colors",
        "To ensure accurate execution",
        "To estimate social media reach",
        "To select furniture styles",
      ],
    },
    ar: {
      question: "ما الغرض الرئيسي من أخذ القياسات في الموقع؟",
      options: [
        "اختيار ألوان الجدران",
        "ضمان دقة التنفيذ",
        "تقدير الوصول إلى وسائل التواصل الاجتماعي",
        "اختيار أنماط الأثاث",
      ],
    },
    correct: 1,
  },
  {
    en: {
      question: "Which drawing helps communicate dimensions and layout?",
      options: [
        "Moodboard",
        "Perspective render",
        "Technical plan",
        "Color palette",
      ],
    },
    ar: {
      question: "أيّ الرسومات تساعد على توضيح الأبعاد والتوزيع؟",
      options: [
        "لوحة الإلهام",
        "منظور ثلاثي الأبعاد",
        "مخطط فني",
        "لوحة الألوان",
      ],
    },
    correct: 2,
  },
  {
    en: {
      question: "What is important before installing floor tiles?",
      options: [
        "Check substrate preparation and levels",
        "Paint the ceiling",
        "Install curtains",
        "Choose decorative accessories",
      ],
    },
    ar: {
      question: "ما الأمر المهم قبل تركيب بلاط الأرضيات؟",
      options: [
        "التحقق من تجهيز الأرضية واستوائها",
        "طلاء السقف",
        "تركيب الستائر",
        "اختيار الإكسسوارات الزخرفية",
      ],
    },
    correct: 0,
  },
  {
    en: {
      question:
        "A design looks perfect on screen, but the site conditions differ. What is the best approach?",
      options: [
        "Ignore the site conditions",
        "Make changes without coordination",
        "Review, coordinate, and adapt the execution",
        "Stop communicating with the team",
      ],
    },
    ar: {
      question:
        "يبدو التصميم مثاليًا على الشاشة، لكن ظروف الموقع مختلفة. ما أفضل تصرف؟",
      options: [
        "تجاهل ظروف الموقع",
        "إجراء تغييرات دون تنسيق",
        "مراجعة التنفيذ والتنسيق وتكييفه مع ظروف الموقع",
        "التوقف عن التواصل مع الفريق",
      ],
    },
    correct: 2,
  },
];

export default function QuizScreen({ onComplete, loading }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [language, setLanguage] = useState("en");
  const question = QUESTIONS[index];
  const localizedQuestion = question[language];
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
        <span dir={language === "ar" ? "rtl" : "ltr"}>
          {language === "ar" ? "السؤال" : "QUESTION"}{" "}
          {String(index + 1).padStart(2, "0")} / 05
        </span>
        <div className="quiz-language-toggle" role="group" aria-label="Question language">
          <button
            type="button"
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            type="button"
            aria-pressed={language === "ar"}
            onClick={() => setLanguage("ar")}
          >
            عربي
          </button>
        </div>
        <span>{Math.round(((index + 1) / 5) * 100)}%</span>
      </div>
      <div className="progress-track">
        <div style={{ width: `${((index + 1) / 5) * 100}%` }} />
      </div>
      <h2 className="question-title" dir={language === "ar" ? "rtl" : "ltr"}>
        {localizedQuestion.question}
      </h2>
      <div className="answers">
        {localizedQuestion.options.map((option, optionIndex) => (
          <button
            key={option}
            className={`answer ${selected === optionIndex ? "selected" : ""}`}
            dir={language === "ar" ? "rtl" : "ltr"}
            onClick={() => choose(optionIndex)}
          >
            <span className="answer-letter">
              {OPTION_LABELS[language][optionIndex]}
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