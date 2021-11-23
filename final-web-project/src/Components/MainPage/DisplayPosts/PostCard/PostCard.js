import react, { useState } from "react";
import { FaUserCircle, FaStar } from "react-icons/fa";
import { BiLike, BiMessageRounded } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

const PostCard = ({ struct }) => {

    const {
        title, description, image, user, likes, createdAt, comments
    } = struct;

    const [favorite, setFavorite] = useState(false);

    // onClickFavorite = () => {
    //     setFavorite(!favorite);
    //     let config = {
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     };

    //     try {
    //         let responseFavorite = axios.patch();
    //     } catch (error) {
            
    //     }
    // };
// };

return (
    <div className="w-4/5 flex flex-col justify-center rounded-lg bg-gray-300 p-4 space-y-10">
        <div className="flex flex-nowrap items-center space-x-3" >

            <div>
                <FaUserCircle size="20" />

            </div>
            <h3> @{user?.username} </h3>
            <div className="w-full flex justify-end items-center h-full">
                <FaStar size="25" />
            </div>
        </div>

        {
            <img className="w-full object-cover my-2 rounded-2xl h-auto" src={image} alt="Imagen para el usuario" />
        }
        <div>
            <p className="font-semibold"> {title} </p>
            <p className="text-xs"> {new Date(createdAt).toLocaleDateString()} </p>
        </div>
        <p> {description} </p>

        <div className="flex justify-center space-x-8">
            <div className="flex justify-center">
                <button><BiLike className="mr-2" size={25} /></button>
                {likes.length}
            </div>
            <div className="flex justify-center">
                <button><BiMessageRounded className="mr-2" size={25} /></button>
                {comments.length}
            </div>
        </div>
    </div>
);
}
export default PostCard;