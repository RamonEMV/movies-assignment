import { FunctionComponent } from "react";

interface LoadingSpinnerProps {}

const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = () => {
  return (
    <div className="w-12 h-12 border-2 border-solid border-sky-500 border-b-transparent rounded-full animate-spin"></div>
  );
};

export default LoadingSpinner;
