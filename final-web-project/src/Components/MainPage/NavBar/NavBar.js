const NavBar = () =>{
    
    return(
        <ul className=" border border-black flex items-baseline w-full space-x-7">
            <li>
                <input placeholder=" Buscar"/>
                <button>IC:lupa</button>
            </li>

            <li className="">Insertar imagen</li>
            
            <li>
                <h3>Icono y Usuario</h3>
            </li>
        </ul>
    );
}
export default NavBar;