import React from "react";
import Spinner from "../ui/spinner";

interface LoadingScreenProps {
  description: string;
}

const LoadingScreen = ({ description }: LoadingScreenProps) => {
  return (
    <div className="h-screen-minus flex flex-col items-center justify-center">
      <div>
        <Spinner />
        {description}
      </div>
    </div>
  );
};

export default LoadingScreen;
