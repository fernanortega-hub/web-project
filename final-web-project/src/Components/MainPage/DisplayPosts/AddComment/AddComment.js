import react from "react";
import axios from "axios";
import { useState } from "react";

const AddComment = ({post , afterSubmit}) => {
    const [inputVal, setInput] = useState("");

    function onChange(e) {
        setInput(e.target.value);
    }

    const body = {
        description: inputVal
    };

    async function onSubmit(e) {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${post}`, body, config);

        setInput('');

        afterSubmit(body);
    }

    return (
        <form onSubmit={onSubmit} className="px-4 py-2">
            <input placeholder="Press enter to comment" minLength="8" type="text" 
            className="w-full border-blue-400 border-2 py-2 px-4 rounded-xl h-10 dark:bg-gray-500 dark:placeholder-gray-300 dark:text-white" 
            onChange={onChange} value={inputVal} />
        </form>
    )
}
export default AddComment;