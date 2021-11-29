import { useEffect, useState } from "react";
import DisplayOwned from "../Components/Profile/DisplayOwned/DisplayOwned";
import { Auth } from "../Services/Services";
import { toast, ToastContainer } from 'react-toastify';
import NavBar from '../Components/MainPage/NavBar/NavBar';

const Profile = () => {
    const [username, setUser] = useState();
    const token = localStorage.getItem('token')

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await Auth(token);
                setUser(response.username);
            } catch (error) {
                toast('Algo salio mal, inicia sesion nuevamente', { type: 'error' });
            }
        }
        verifyUser();
        document.title = "Perfil";
    }, []);


    return(
        <div className="flex flex-col justify-items-center items-center bg-gray-200 gap-3 overflow-x-hidden dark:bg-gray-900">
            <ToastContainer/>
            <NavBar username={username}/>
            <DisplayOwned username={username}/>
        </div>
    );
}

export default Profile;