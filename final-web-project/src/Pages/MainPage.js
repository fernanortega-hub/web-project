import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Auth } from "../Services/Services";



const MainPage = () => {
    const [role, setRole] = useState(()=>{return undefined});
    const navigate = useNavigate();

    //Para los panas: si no usaba useEffect entraba en loop hasta que devolviera la promesa --BORRAR--
    useEffect(()=>{
        const verifyRole = async(token) =>{
            try{
                let response = await Auth(token);
                setRole(response.role);
            }catch(error){
                console.log("Algo salio mal");
                //Invocar funcion que limpie localStorage
                navigate('/Login');
            }finally{
                console.log("ROL: "+role);
            }
        }
        verifyRole(localStorage.getItem('token'));
    },[role]);

    return (
        <h1> {role} </h1>
    );
};

export default MainPage;