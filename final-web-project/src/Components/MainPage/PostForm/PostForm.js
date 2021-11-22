import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const PostForm = () => {

    const [active, setactive] = useState(false);

    const activeForm = () => {
        setactive(!active);

        
    };

    return (
        <div className="w-4/5 h-auto max-h-64 bg-gray-100 border rounded-lg shadow-lg tablet:w-2/3">
            <button className="flex justify-center items-center p-4 w-full h-6 transition duration-1000 ease-in-out"
                onClick={activeForm}>
                {active ? <FaArrowUp/> : <FaArrowDown/>}
            </button>

            <main className={`${active ? '' : 'hidden'} transition duration-1000 ease-in-out `}>
                <form onSubmit={() => console.log("A")}
                    className="flex flex-col p-4 justify-center items-center">
                    <h3>Titulo:</h3>
                    <input name="title" className="w-5/6 border border-gray-500 rounded mb-1" />

                    <h3>Descripcion:</h3>
                    <input name="description" className="w-5/6 border border-gray-500 rounded mb-1" />

                    <h3>Imagen(url):</h3>
                    <input name="picture" className="w-5/6 border border-gray-500 rounded" />
                </form>
            </main>
        </div>
    );
};


export default PostForm;