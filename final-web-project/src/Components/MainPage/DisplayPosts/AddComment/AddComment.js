import react from "react";
import axios from "axios";


const AddComment = (id) =>{

    function onSubmit(e) {
        e.preventDefault();

        const body = {
            description: input?.current?.value,
        };

        const {data} = axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${id}`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        
    }

    return (
        <div>
            <form>
                <input placeholder="Press enter to comment" type="text"></input>
            </form>
        </div>
    )
}

export default AddComment;