import { useEffect, useState } from "react";
import DisplayOwned from "../Components/Profile/DisplayOwned/DisplayOwned";
import { Auth } from "../Services/Services";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [username, setUser] = useState();
    const token = localStorage.getItem('token')
    const navigate = useNavigate();


    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await Auth(token);
                setUser(response.username);
            } catch (error) {
                toast('Algo salio mal, inicia sesion nuevamente', { type: 'error' });
                navigate('/');
            }
        }
        verifyUser();
        document.title = "Principal";
    }, []);


    return(
        <div className="flex flex-col justify-items-center items-center bg-gray-200 gap-3 overflow-x-hidden dark:bg-gray-900">
            <DisplayOwned username={username} />
        </div>
    );
}

export default Profile;