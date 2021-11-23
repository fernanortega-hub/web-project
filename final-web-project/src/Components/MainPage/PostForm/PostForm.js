import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const PostForm = () => {

    const [active, setactive] = useState(false);

    const activeForm = () => {
        setactive(!active);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("A")
    };

    return (
        <div className="w-4/5 h-auto max-h-64 bg-gray-100 border flex flex-col items-center rounded-lg shadow-lg tablet:w-1/2">
            <button className="flex justify-center items-center p-4 w-full h-6 transition duration-1000 ease-in-out"
                onClick={activeForm}>
                {active ? <FaArrowUp/> : <FaArrowDown/>}
            </button>

            <main className={`${active ? '' : 'hidden'} w-96`}>
                <form onSubmit={onSubmitHandler}
                    className="flex flex-col p-4 justify-center items-center">
                    <input placeholder="Titulo de publicación" name="title" className="w-5/6 border border-gray-500 rounded mb-1" />

                    <input placeholder="Descripción" name="description" className="w-5/6 border border-gray-500 rounded mb-1 h-2/4" />

                    <input placeholder="Imagen (URL)" name="picture" className="w-5/6 border border-gray-500 rounded mb-1" />

                    <button className="bg-indigo-600 rounded-xl text-white font-medium py-2 px-4 hover:bg-indigo-800"> Subir </button>
                </form>
            </main>
        </div>
    );
};


export default PostForm;