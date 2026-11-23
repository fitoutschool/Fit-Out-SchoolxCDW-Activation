
const API_URL =
  "https://script.google.com/macros/s/AKfycbzBBheyFr7ui5B8kj-3mt5XEoAujDmC_gzMwmP5xiWQOiuDG_dBlc00VUk2vOhg5pOsNw/exec";

async function request(action, data = {}) {
  if (!API_URL.startsWith("https://script.google.com/")) {
    throw new Error("Please configure your Apps Script Web App URL.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action, data })
  });

  if (!response.ok) {
    throw new Error("Could not connect to the activation server.");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
}

export const api = {
  register: (data) => request("register", data),
  submitQuiz: (data) => request("submitQuiz", data),
  spin: (data) => request("spin", data),
  getParticipant: (data) => request("getParticipant", data),

  // Staff dashboard
  getDashboardStats: () => request("getDashboardStats")
};
