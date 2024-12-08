export const withDevOnly = <P extends object>(Component: React.ComponentType<P>) => {
  const isDevelopment = import.meta.env.MODE === "development";

  return (props: P) => {
    return isDevelopment ? <Component {...props} /> : null;
  };
};
