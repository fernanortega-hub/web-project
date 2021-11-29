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
import { HiUser } from 'react-icons/hi';

const NavBar = ({ username }) => {

    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [theme, setTheme] = UseDarkMode();
    const role = localStorage.getItem('role');

    const handleCheckTheme = (e) => {
        if (!checked) {
            setChecked(true);
            setTheme(theme);
        } else {
            setChecked(false);
            setTheme(theme);
        }

        localStorage.setItem('checked', checked);
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
            if (result.isConfirmed) {
                logout();
                navigate('/');
            } else if (result.isDenied) {
                return;
            }
        })
    }

    //retorna la barra superior de navegacion
    return (
        <ul className="font-medium w-full max-h-30 h-14 p-4 bg-gray-100 flex items-center 
            rounded shadow overflow-hidden justify-around dark:bg-gray-700 dark:text-white">
            <li className="flex rounded-lg">
               
                <div className="flex flex-row items-center ml-4 text-xl">
                    <FiSun className={checked ? 'hidden' : 'text-yellow-500'} />
                    <Switch
                        checked={checked}
                        onChange={handleCheckTheme}
                        title={checked ? 'Desactivar modo oscuro': 'Activar modo oscuro'}
                    />
                    <FiMoon className={!checked ? 'hidden' : ''} />
                </div>
            </li>
            <li className="">
                <img className="w-28 h-28 tablet:h-40 tablet:w-40"
                    src={!checked ? logoLight : logoDark1} alt="logo" />
            </li>

            <li className="flex justify-end items-center space-x-3">
                {
                    role === "admin" &&
                    <button className="p-2 rounded-lg hover:bg-gray-400 lg:text-2xl dark:hover:bg-gray-600" title={`Perfil de ${username}`}
                    onClick={(e) => {
                        if(window.location.pathname === '/MainPage'){
                            navigate('/profile');
                        } else if(window.location.pathname === '/profile'){
                            navigate('/MainPage');
                        }
                    }}>
                        <HiUser />
                    </button>
                }
                <button className="p-2 rounded-lg flex flex-row space-x-4 hover:bg-gray-400 lg:text-2xl dark:hover:bg-gray-600"
                    onClick={onClickLogout} title="Cerrar sesion"> <FaSignOutAlt /> <span className="hidden text-base tablet:block"> Cerrar sesion </span> </button>
            </li>
        </ul>
    );
}
export default NavBar;