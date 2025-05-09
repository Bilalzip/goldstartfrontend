import axios from "axios";

const api = axios.create({
  baseURL: "https://goldstarserver-xeqt.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle subscription expiration globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if this is a subscription expiration error
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data &&
      error.response.data.subscriptionEnded
    ) {
      // Store that we should show the subscription expired message
      localStorage.setItem("subscription_expired", "true");

      // Redirect to the subscription page
      window.location.href =
        "/dashboard/settings?tab=subscription&expired=true";
    }

    // Return the error for further handling
    return Promise.reject(error);
  }
);

export default api;

export const couponService = {
  validate: (code: string) => api.post("/auth/coupons/validate", { code }),

  startTrial: (couponCode: string) =>
    api.post("/auth/payment/start-trial", { couponCode }),

  createCheckoutSession: (couponCode?: string) =>
    api.post("/auth/payment/create-checkout-session", { couponCode }),
};
