import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const PostForm = () => {

    const [active, setactive] = useState(false);
    const userToken = localStorage.getItem('token');

    const activeForm = () => {
        setactive(!active);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };

        // Guardando la informacion del formulario con formData
        const formData = new FormData(e.target);
        const formBody = Object.fromEntries(formData.entries());

        if (formBody.title === "" || formBody.description === "") return toast('Llena todos los datos', { type: 'warning' });


        console.log(formBody);
        try {
            const response = await axios.post(`https://posts-pw2021.herokuapp.com/api/v1/post/create`, formBody, config);

            
            if (response.status === 201) {
                toast('Post creado!', { type: 'success' }, { position: 'top-center' });
            }
        } catch (error) {
            const { response } = error;
            if (response.status === 401) toast('No tienes acceso a esta funcion', { type: 'error' });
        }
    };
    


    return (
        <div className="w-4/5 h-auto max-h-96 bg-gray-100 border flex flex-col items-center rounded-lg shadow-lg laptop:w-1/2">
            <button className="flex justify-center items-center p-4 w-full h-6 transition duration-1000 ease-in-out"
                onClick={activeForm}>
                {active ? <FaArrowUp /> : <FaArrowDown />}
            </button>

            <ToastContainer />
            <main className={`${active ? '' : 'hidden'} w-max tablet:w-1/2`}>
                <form onSubmit={onSubmitHandler}
                    className="flex flex-col p-4 space-y-2 ">
                    <input placeholder="Titulo de publicación"
                        name="title" id="title" className=" rounded px-2 py-2" minLength="8" />

                    <input placeholder="Descripción"
                        name="description" id="description" className=" rounded px-2 py-2 max-h-24 h-24" minLength="8" />

                    <input placeholder="Imagen (URL)" name="image" id="image" className=" rounded px-2 py-2" />

                    <div className = "flex justify-items-center">
                        <label htmlFor="active">Post visible?</label>
                        <input
                            className="rounded-lg text-blue-500 w-5 h-5 mx-2 focus:ring-blue-400 focus:ring-opacity-25 border border-gray-300"
                            type="checkbox"
                            name="active"
                            id="active"
                        />
                    </div>

                    <button className="bg-indigo-600 rounded-xl text-white font-medium py-2 px-6 hover:bg-indigo-800"> Subir </button>
                </form>
            </main>
        </div>
    );
};


export default PostForm;