import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const User = () => {
    function showPassword() {
        let password = document.getElementById('input-password');
        if (password.type === "password") password.type = "text"
        else password.type = "password"
    };
    return (
        <div className="flex flex-wrap justify-center rounded-xl h-96 bg-white max-h-80 p-5 w-60 tablet:w-80">
            <div className="flex flex-wrap items-center mb-2">
                <FaUserAlt size={60} />
                <h1 className="p-4 text-center text-2xl font-medium">Login</h1>
            </div>
            <div className="flex items-center mb-2 w-full">
                <MdAlternateEmail size={20} />
                <input placeholder="Username" className="rounded-lg ml-2 p-2 text-lg w-full" required />
            </div>
            <div className="flex items-center mb-2 w-full">
                <FaLock size={20} />
                <input id="input-password" type="password" placeholder="Password" className="rounded-lg ml-2 p-2 text-lg w-full" required />
            </div>
            <div className = "flex flex-row w-full flex-start text-sm items-center p-1">
                <input type="checkbox" className=""
                    onClick={() => {
                        showPassword();
                    }}/>
                <p className="ml-2 text-sm"> Show password </p>   
            </div>
            <div>
                <button className="bg-theRevenant-darkBlue px-4 py-2 text-white bg-gradient-to-r text-lg font-medium rounded-xl 
                hover:from-blue-800 to-indigo-900 "> Login </button>
            </div>
        </div>
    )
}

export default User;