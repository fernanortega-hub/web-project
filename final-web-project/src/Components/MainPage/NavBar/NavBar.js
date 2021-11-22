import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

const NavBar = () =>{
    
    return(
        <ul className="font-medium w-full max-h-30 h-10 px-2 border bg-gray-100 flex items-center rounded shadow overflow-hidden justify-between">
            <li className="px-2 flex shadow">
                <button className="pr-2"><FaSearch/></button>
                <input className="px-2 " placeholder=" Buscar"/>
            </li>

            <li className="">Insertar nombre y logo</li>
            
            <li className="px-2 h-6 md:ml-20 flex items-center shadow">
                <FaUserCircle className="h-5 w-5"/>
                <h3 className="p-2">Usuario</h3>
                <FaSignOutAlt className=""/>
            </li>
        </ul>
    );
}
export default NavBar;