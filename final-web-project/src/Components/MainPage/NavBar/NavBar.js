import { FaSearch, FaSignOutAlt, FaRegStar } from "react-icons/fa";
import { react, useState } from "react";
import { logout } from "../../../Services/Services";
import { useNavigate } from "react-router";
import axios from "axios";

const NavBar = () => {

    const [active, setActive] = useState(false);

    const onClickShow = () => {
        setActive(!active);
    };

    const navigate = useNavigate();

    const onClickLogout = () => {
        logout();
        navigate('/');
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
        <ul className="font-medium w-full max-h-30 h-14 px-2 border bg-gray-100 flex items-center rounded shadow overflow-hidden justify-around">
            <li className="p-2 flex rounded-lg">
                <button className="p-2 rounded-lg hover:bg-gray-400" > <FaRegStar /> </button>
                <button className="p-2 rounded-lg mr-1 hover:bg-gray-400"
                    onClick={() => {
                        onClickShow();
                        if(active === true) {
                            onSubmitSearch();
                        }
                    }} > <FaSearch /> </button>

                <input
                    className={`${active ? '' : 'hidden'} p-1 text-center w-32 rounded-lg border border-gray-400`}
                    placeholder="Buscar post" />
            </li>
            <li className="">
                <img className="h-9 w-9"
                    src="https://w7.pngwing.com/pngs/568/379/png-transparent-technology-computer-icons-technology-electronics-text-logo.png" alt="logo" />
            </li>

            <li className="flex items-center">
                <button className="p-2 rounded-lg hover:bg-gray-400"
                    onClick={onClickLogout}> <FaSignOutAlt /> </button>
                <p className="hidden tablet:block"> Cerrar sesion </p>
            </li>
        </ul>
    );
}
export default NavBar;