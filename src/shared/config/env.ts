export const ENV = Object.freeze({
  API_URL: import.meta.env.VITE_MOCKS === "true" ? "" : import.meta.env.VITE_API_URL,
});
