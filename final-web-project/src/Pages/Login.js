import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import React, { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { signIn } from "../Services/Services";

//Página del login
const Login = () => {
    const username = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    function showPassword() {
        let passwordValue = document.getElementById('input-password');
        if (passwordValue.type === "password") passwordValue.type = "text"
        else passwordValue.type = "password"
    };

    useEffect(() => {
        document.title = "Login"
    }, []);

    async function onSubmit(e) {
        e.preventDefault();

        const inputUsername = username.current.value;
        const inputPassword = password.current.value;

        if (!inputUsername || !inputPassword)
            return toast('Llena las casillas con tus datos', { type: 'warning' });

        try {
            const response = await signIn(inputUsername,inputPassword);
            
            if(response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);

                if(response.data.role === "admin") navigate('/MainPage');
                
                else if (response.data.role === "user") navigate('/MainPage');   
            }
        } catch (error) {
            const { response } = error
            
            if(response.status === 404) toast('Usuario no encontrado', { type: 'error' });
            else if(response.status === 403) toast('Servicio denegado', { type: 'error' });
        }
    };

    return (
        <form className="flex flex-wrap justify-center rounded-xl h-96 bg-white max-h-80 p-5 w-60 tablet:w-80" onSubmit={onSubmit}>
            <div className="flex flex-wrap items-center mb-2">
                <ToastContainer />
                <FaUserAlt size={60} />
                <h1 className="p-4 text-center text-2xl font-medium">Login</h1>
            </div>
            <div className="flex items-center mb-2 w-full">
                <MdAlternateEmail size={20} />
                <input id="input-username" placeholder="Username" className="rounded-lg ml-2 p-2 text-lg w-full" ref={username} />
            </div>
            <div className="flex items-center mb-2 w-full">
                <FaLock size={20} />
                <input id="input-password" type="password" placeholder="Password" className="rounded-lg ml-2 p-2 text-lg w-full" ref={password} />
            </div>
            <div className="flex flex-row w-full flex-start text-sm items-center p-1">
                <input type="checkbox" className=""
                    onClick={() => {
                        showPassword();
                    }} />
                <p className="ml-2 text-sm"> Show password </p>
            </div>
            <div>
                <button className="bg-theRevenant-darkBlue px-4 py-2 text-white bg-gradient-to-r text-lg font-medium rounded-xl 
                hover:from-blue-800 to-indigo-900"> Login </button>
            </div>
        </form>
    );
};

export default Login;