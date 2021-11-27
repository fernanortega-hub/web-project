import { FaSearch, FaSignOutAlt, FaRegStar } from "react-icons/fa";
import { react, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { logout } from "../../../Services/Services";
import UseDarkMode from "../../../Services/UseDarkMode";
import Switch from '@mui/material/Switch';
import { FiMoon, FiSun } from 'react-icons/fi';
import logoLight from "../../../logoLight.svg";
import logoDark1 from "../../../logoDark1.svg";

const NavBar = () => {

    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [theme, setTheme] = UseDarkMode();


    const handleCheckTheme = (e) => {
        if (!checked) {
            setChecked(true);
            setTheme(theme);
        } else {
            setChecked(false);
            setTheme(theme);
        }
    };

    const onClickLogout = () => {
        Swal.fire({
            title: 'Cerrar sesión',
            text: '¿Deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed) {
                logout();
                navigate('/');
            } else if(result.isDenied) {
                return;
            }
        })
    }


    return (
        <ul className="font-medium w-full max-h-30 h-14 p-4 bg-gray-100 flex items-center 
            rounded shadow overflow-hidden justify-around dark:bg-gray-700 dark:text-white">
            <li className="flex rounded-lg">
                <button className="p-2 rounded-lg hover:bg-gray-400 lg:text-2xl "
                    onClick={(e)=>{navigate('/favorites')}}> <FaRegStar /> </button>
                <div className="flex flex-row items-center ml-4 text-xl">
                    <FiSun className={checked ? 'hidden' : 'text-yellow-500'}/>
                    <Switch
                        checked={checked}
                        onChange={handleCheckTheme}
                    />
                    <FiMoon className={!checked ? 'hidden' : ''}/>
                </div>
            </li> 
            <li className="">
                <img className="w-28 h-28 tablet:h-40 tablet:w-40"
                    src={!checked ? logoLight : logoDark1} alt="logo" />
            </li>

            <li className="flex justify-end items-center">
                <button className="p-2 rounded-lg hover:bg-gray-400 lg:text-2xl"
                    onClick={onClickLogout}> <FaSignOutAlt /> </button>
                <p className="hidden tablet:block"> Cerrar sesion </p>
            </li>
        </ul>
    );
}
export default NavBar;