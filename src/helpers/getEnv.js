export const getEnv = () => {
  import.meta.env.VITE_API_URL;
  return {
    ...import.meta.env.VITE_API_UR,
  };
};
