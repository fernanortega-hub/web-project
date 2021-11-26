import { FaSpinner } from "react-icons/fa";

const Loading = () => ( 
    <div className=" flex  z-20 bg-gray-600 h-screen w-full justify-center items-center rounded-lg bg-opacity-50 ">
        <FaSpinner className="w-8 h-8 stroke text-white animate-spin" />
    </div>
);

export default Loading;