export const ENV = {
  BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:9000",
  TOKEN_EXPIRES_IN: import.meta.env.VITE_TOKEN_EXPIRE || "2400",
};
