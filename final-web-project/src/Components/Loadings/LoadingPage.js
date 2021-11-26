import react from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingPage = () => (
    <div className="w-full h-screen bg-gray-400 flex items-center justify-center flex-col space-y-7">
        <FaSpinner size="40" className="text-white animate-spin"/>
    </div>
);

export default LoadingPage;