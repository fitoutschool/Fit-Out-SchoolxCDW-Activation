import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

const MotionDiv = motion.div;

export default function RegistrationScreen({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    academicYear: "",
    marketingConsent: false,
  });

  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <MotionDiv
      className="panel screen"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="step-label">01 / REGISTRATION</div>
      <h2>
        Before we begin,
        <br />
        <em>let's meet you.</em>
      </h2>
      <p className="muted">
        Just a few details. Then straight into the challenge.
      </p>

      <form onSubmit={submit} className="registration-form">
        <label>
          <span>
            <UserRound size={15} /> FULL NAME
          </span>
          <input
            required
            maxLength="100"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          <span>
            <Mail size={15} /> EMAIL ADDRESS
          </span>
          <input
            required
            type="email"
            maxLength="254"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          <span>
            <Phone size={15} /> PHONE NUMBER
          </span>
          <input
            required
            type="tel"
            inputMode="tel"
            pattern="(01[0125][0-9]{8}|[+]201[0125][0-9]{8})"
            title="Enter an Egyptian mobile number, such as 01012345678 or +201012345678."
            maxLength="13"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="01XXXXXXXXX or +201XXXXXXXXX"
          />
        </label>
        <label>
          <span>
            <Building2 size={15} /> UNIVERSITY
          </span>
          <input
            required
            maxLength="100"
            value={form.university}
            onChange={(event) => update("university", event.target.value)}
            placeholder="Your university"
          />
        </label>
        <label>
          <span>
            <BookOpen size={15} /> MAJOR
          </span>
          <select
            required
            value={form.major}
            onChange={(event) => update("major", event.target.value)}
          >
            <option value="">Select your major</option>
            <option>Interior Design</option>
            <option>Architecture</option>
            <option>Civil Engineering</option>
            <option>Applied Arts</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span>
            <GraduationCap size={15} /> ACADEMIC YEAR
          </span>
          <select
            required
            value={form.academicYear}
            onChange={(event) => update("academicYear", event.target.value)}
          >
            <option value="">Select your year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
            <option>5th Year</option>
            <option>Fresh Graduate</option>
            <option>Other</option>
          </select>
        </label>

        <label className="consent">
          <input
            type="checkbox"
            checked={form.marketingConsent}
            onChange={(event) =>
              update("marketingConsent", event.target.checked)
            }
          />
          <span>
            I agree to receive FIT-OUT SCHOOL updates and opportunities.
            (Optional)
          </span>
        </label>

        <button className="primary-btn" disabled={loading}>
          {loading ? "REGISTERING..." : "CONTINUE TO THE CHALLENGE"}
          <ArrowRight size={18} />
        </button>
      </form>
    </MotionDiv>
  );
}