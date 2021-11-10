import {FaUserAlt} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
 import {MdAlternateEmail} from "react-icons/md";

const User = () =>{
    return(
        <div class='flex justify-center mt-64  '>
            <div class='flex flex-col bg-green-400 rounded h-60 w-3/4 md:w-1/4 md:h-72' >
                <div class='flex justify-center mt-10 '>
                    <FaUserAlt/>
                </div>

                <div class='flex justify-center flex-row mt-8 '>
                <MdAlternateEmail/><input class='border-4 ml-4 ' placeholder='Username'></input>
                </div> 

                <div class='flex justify-center flex-row mt-4 ' >
                <FaLock/><input class='border-4 ml-4'  placeholder='Password'></input>
                </div>     

                <div class='flex justify-center mt-6'><button class='  rounded bg-gray-100 w-24'>LOGIN</button>    </div>
            </div>
        </div>
    )
}

export default User;