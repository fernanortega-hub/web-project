import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditForm = ({postId, setStatus}) => {
    const userToken = localStorage.getItem('token');


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        };

        // Guardando la informacion del formulario con formData
        const formData = new FormData(e.target);
        const formBody = Object.fromEntries(formData.entries());

        if (formBody.title === "" || formBody.description === "") return toast('Llena todos los datos', { type: 'warning' });

        console.log(formBody);

        try {
            const response = await axios.put(`https://posts-pw2021.herokuapp.com/api/v1/post/update/${postId}`, formBody, config);
            
            if (response.status === 200) {
                toast('Post editado!', { type: 'success' }, { position: 'top-center' });
                setStatus(postId);
            }
        } catch (error) {
            const { response } = error;
            if (response.status === 401) toast('No tienes acceso a esta funcion', { type: 'warning' });
            if (response.status === 400) toast('Mal formulario', { type: 'error' });
            if (response.status === 404) toast('post no encontrado', { type: 'error' });
        }
    };


    return( 
        <div className="w-full h-auto max-h-96 bg-gray-100 flex flex-col items-center rounded-lg shadow-lg dark:bg-gray-600">
            <ToastContainer />
            <main className={`w-full dark:text-white`}>
                <form onSubmit={onSubmitHandler}
                    className="flex flex-col p-4 space-y-2 ">
                    <input placeholder="Titulo de publicación"
                        name="title" id="title" className=" rounded px-2 py-2 dark:bg-gray-500 dark:placeholder-gray-300" minLength="8" maxLength="32"/>

                    <input placeholder="Descripción"
                        name="description" id="description" className="rounded px-2 py-2 max-h-24 h-24 dark:bg-gray-500 dark:placeholder-gray-300" minLength="8"/>

                    <input placeholder="Imagen (URL)" name="image" id="image" className=" rounded px-2 py-2 dark:placeholder-gray-300 dark:bg-gray-500" />

                    <button className="bg-indigo-600 rounded-xl text-white font-medium py-2 px-6 hover:bg-indigo-800"> Editar </button>
                </form>
            </main>
        </div>
    );
}
export default EditForm;