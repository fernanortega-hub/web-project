import react from "react";
import { FaUserCircle } from "react-icons/fa";
import {BiLike, BiMessageRounded} from "react-icons/bi";


const PostCard = ({struct}) => {

    /*const {
        title, description, image, user, likes, createdAt, comments
    } = struct;*/



    return (
        <div className="flex flex-col m-8  rounded bg-gray-300 p-4 shadow-inner space-y-12 lg:w-10/12 lg:ml-28 lg: ">
            <div className="flex flex-nowrap items-center space-x-3" > {/*Mostrar nombre de usuario*/}
                <FaUserCircle size="25"/>
                <h3> @{/*{user?.username}*/}User </h3>
            </div>
            
            {          
                <img className="w-full h-40 object-cover my-2 rounded-2xl" src={{/*image*/}} alt="Imagen para el usuario" />
            }        
            <p className="font-semibold">"Titulo: titulo de post"{/*title */} </p>
            <p>"Descripcion: descripcion de post"</p>
            <div className="flex justify-center space-x-8">
                <div className="flex justify-center">
                    <button><span><BiLike className="mr-2" size={25}/></span></button>
                    {/*likes.length*/}1
                </div>
                <div className="flex justify-center">
                    <button><span><BiMessageRounded className="mr-2 " size={25}/></span> </button>
                    {/*comments.length*/}2
                </div>
            </div>
        </div>
    );
}
export default PostCard;