import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { api } from "./services/api";
import AppShell from "./components/AppShell";
import QuizScreen from "./components/QuizScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import SpinWheel from "./components/SpinWheel";
import VoucherScreen from "./components/VoucherScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import StaffDashboard from "./components/StaffDashboard";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [participantId, setParticipantId] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previousScreen, setPreviousScreen] = useState("welcome");

  // Restore the existing participant when the page is refreshed.
  useEffect(() => {
    const savedId = localStorage.getItem("fitout_participant_id");
    if (!savedId) return;

    api
      .getParticipant({ participantId: savedId })
      .then((result) => {
        setParticipantId(savedId);

        if (result.voucher) {
          setVoucher(result.voucher);
          setScreen("voucher");
        } else if (result.quizCompleted) {
          setScreen("spin");
        } else {
          setScreen("quiz");
        }
      })
      .catch(() => {
        localStorage.removeItem("fitout_participant_id");
        setParticipantId("");
        setVoucher(null);
        setScreen("welcome");
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  function openStaffDashboard() {
    setPreviousScreen(screen);
    setScreen("dashboard");
  }
  async function runAction(action) {
    setLoading(true);
    setError("");

    try {
      return await action();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(data) {
    await runAction(async () => {
      const result = await api.register(data);

      setParticipantId(result.participantId);
      localStorage.setItem("fitout_participant_id", result.participantId);

      const state = await api.getParticipant({
        participantId: result.participantId,
      });

      if (state.voucher) {
        setVoucher(state.voucher);
        setScreen("voucher");
      } else if (state.quizCompleted) {
        setScreen("spin");
      } else {
        setScreen("quiz");
      }
    });
  }

  async function completeQuiz(answers) {
    await runAction(async () => {
      await api.submitQuiz({ participantId, answers });
      setScreen("spin");
    });
  }

  async function spin() {
    return runAction(async () => {
      const result = await api.spin({ participantId });
      setVoucher(result.voucher);
      return result.voucher;
    });
  }

  // Staff action: reset this device for the next visitor.
  function handleStaffReset() {
    localStorage.removeItem("fitout_participant_id");

    setParticipantId("");
    setVoucher(null);
    setError("");
    setScreen("welcome");
  }

  return (
    <AppShell
      onStaffReset={handleStaffReset}
      onOpenDashboard={openStaffDashboard}
    >
      <AnimatePresence mode="wait">
        {screen === "welcome" && (
          <WelcomeScreen
            key="welcome"
            onStart={() => setScreen("registration")}
          />
        )}
        {screen === "dashboard" && (
          <StaffDashboard
            key="dashboard"
            onBack={() => setScreen(previousScreen)}
          />
        )}
        {screen === "registration" && (
          <RegistrationScreen
            key="registration"
            onSubmit={register}
            loading={loading}
          />
        )}

        {screen === "quiz" && (
          <QuizScreen key="quiz" onComplete={completeQuiz} loading={loading} />
        )}

        {screen === "spin" && (
          <SpinWheel
            key="spin"
            onSpin={spin}
            loading={loading}
            onComplete={() => setScreen("voucher")}
          />
        )}

        {screen === "voucher" && voucher && (
          <VoucherScreen key="voucher" voucher={voucher} />
        )}
      </AnimatePresence>

      {error && (
        <div className="error-message" role="alert">
          {error}
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}
    </AppShell>
  );
}
