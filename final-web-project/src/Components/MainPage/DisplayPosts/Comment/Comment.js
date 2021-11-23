import react from "react";

const Comments = ({infoComment}) =>{
    const {user, description} = infoComment;

    return (
        <div>
            <h1>Hola soy el usuario @{/*user?.username */}</h1>
            <h1>Hola soy un comentario {/*description*/}</h1>
        </div>
    )

}

export default Comments;

