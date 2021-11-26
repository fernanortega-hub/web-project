import { FaSearch, FaSignOutAlt, FaRegStar } from "react-icons/fa";
import { react, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { logout } from "../../../Services/Services";

const NavBar = () => {

    const onSearch = () => {
        
    }

    const navigate = useNavigate();

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

    const onSubmitSearch = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        try {
            let res = axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/one/`, config);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ul className="font-medium w-full max-h-30 h-14 p-4 border bg-gray-100 flex items-center rounded shadow overflow-hidden justify-around">
            <li className="flex rounded-lg">
                <button className="p-2 rounded-lg hover:bg-gray-400  lg:-ml-48 lg:text-2xl" > <FaRegStar /> </button>
                <button className="p-2 rounded-lg mr-1 hover:bg-gray-400 lg:text-2xl"> <FaSearch /> </button>
                
                <input
                    className="p-1 text-center rounded-lg border border-gray-400 text-sm w-20 tablet:text-base"
                    placeholder="Buscar" />
            </li> 
            <li className="">
                <img className="h-9 w-9 "
                    src="https://w7.pngwing.com/pngs/568/379/png-transparent-technology-computer-icons-technology-electronics-text-logo.png" alt="logo" />
            </li>

            <li className="flex justify-end items-center">
                <button className="p-2 rounded-lg hover:bg-gray-400 lg:text-2xl"
                    onClick={onClickLogout}> <FaSignOutAlt /> </button>
                <p className="hidden tablet:block lg:-mr-36"> Cerrar sesion </p>
            </li>
        </ul>
    );
}
export default NavBar;