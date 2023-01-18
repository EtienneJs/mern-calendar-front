export const getEnv = () => {
  import.meta.env.VITE_API_URL;
  console.log(import.meta.env.VITE_API_URL);
  return {
    ...import.meta.env,
  };
};
