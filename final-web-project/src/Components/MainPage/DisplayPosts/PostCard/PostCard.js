import { FaUserCircle } from "react-icons/fa";
const PostCard = () => {

    return (
        <div className=" m-4 mx-10 rounded bg-gray-300 p-4 shadow-inner space-y-2">
            <div className="flex flex-nowrap items-center space-x-3" >
                <FaUserCircle size="25"/>
                <h3> @Usuario </h3>
            </div>
            
            <div className="border border-black rounded h-44 text-center">
                imagen
            </div>
            <p className="font-semibold">"Titulo: titulo de post"</p>
            <p>"Descripcion: descripcion de post"</p>
        </div>
    );
}
export default PostCard;