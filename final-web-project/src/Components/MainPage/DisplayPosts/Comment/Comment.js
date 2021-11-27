import react from "react";

const Comments = ({infoComment}) =>{
    const {user, description} = infoComment;

    return (
        <div className="px-4 py-1 max-h-36 dark:text-white">
            <div className="border-2 border-blue-400 rounded-lg px-1">
                <h1 className="text-theRevenant-blueGray font-poppins dark:text-blue-200" > @{user?.username } </h1>
                <h1 className="px-2 font-">{description}</h1>
            </div>
        </div>
    )
}

export default Comments;

