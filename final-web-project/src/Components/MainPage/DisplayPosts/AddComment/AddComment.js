import react from "react";
import axios from "axios";
import { useState } from "react";

const AddComment = (post, afterSubmit) =>{
    const [inputVal, setInput] = useState('');

    function onChange(e) {
        setInput(e.target.value);    
    }

   async function onSubmit(e) {
        e.preventDefault();

        const body = {
            description: inputVal
        };

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }; 
        const {dataUser} = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${post}`,null, config); 
        setInput('');

        afterSubmit(body);   
    }

    //Problema: no se trae el id desde el axios entonces no deja escribir luego en la caja de comentarios
    //Ver PostCard
    return (
        <div className=" px-5 py-2  ">
            <form> 
                <input placeholder="Press enter to comment" type="text" className="w-full border-blue-400 border-2 py-2 px-4 rounded-xl h-10 " value={inputVal}></input>
            </form>
        </div>
    )
}
export default AddComment;