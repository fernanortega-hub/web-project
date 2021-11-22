import { FaSearch, FaSignOutAlt, FaRegStar} from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {

    const [active, setActive] = useState(false);
    const onClickShow = () => {
        setActive(!active);
    };

    return (
        <ul className="font-medium w-full max-h-30 h-14 px-2 border bg-gray-100 flex items-center rounded shadow overflow-hidden justify-around">
            <li className="p-2 flex rounded-lg">
                <button className="p-2 rounded-lg hover:bg-gray-400" > <FaRegStar /> </button>
                <button className="p-2 rounded-lg hover:bg-gray-400" onClick={onClickShow} > <FaSearch /> </button>
                <input id="search-input" className={`${active ? '' : 'hidden'} ml-1 px-2 w-28 rounded-lg border border-gray-400`} placeholder="Buscar post" />
            </li>
            <li className="">
                <img className="h-9 w-9"
                    src="https://w7.pngwing.com/pngs/568/379/png-transparent-technology-computer-icons-technology-electronics-text-logo.png" alt="logo" />
            </li>

            <li className="flex items-center">
                <button className="p-2 rounded-lg hover:bg-gray-400"> <FaSignOutAlt /> </button>
                <p className="hidden tablet:block"> Cerrar sesion </p>
            </li>
        </ul>
    );
}
export default NavBar;