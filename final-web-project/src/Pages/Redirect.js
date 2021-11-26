import react from "react";
import { FaSpinner } from "react-icons/fa";

const Redirect = () => (
    <div className="w-full h-screen bg-gray-400 flex items-center justify-center flex-col space-y-7">
        <h1 className="text-center text-white font-semibold text-4xl"> Redireccionando... </h1>
        <FaSpinner size="40" className="text-white animate-spin"/>

    </div>
);

export default Redirect;
