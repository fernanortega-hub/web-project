import react from "react";
import axios from "axios";
import { useState } from "react/cjs/react.development";




const AddComment = (id, afterSubmit) =>{

    const [inputVal, setInput] = useState('');

    function onChange(e) {
        setInput(e.target.value);
        
    }

   

   async function onSubmit(e) {
        e.preventDefault();

        const body = {
            description: inputVal,
        };

        await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${id}`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        setInput('');

        afterSubmit(body);

        
    }

    return (
        <div>
            <form>
                <input value={inputVal} 
                        placeholder="Press enter to comment" 
                        type="text">                    
                </input>
            </form>
        </div>
    )
}

export default AddComment;