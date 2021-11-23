
import react, { useState } from "react";
import { FaUserCircle, FaStar, FaComment } from "react-icons/fa";
import {AiFillHeart} from 'react-icons/ai';
import axios from "axios";


import Comments from "../Comment/Comment";

const PostCard = ({username, struct }) => {

    const {
        _id, title, description, image, user, likes, createdAt, comments
    } = struct;

    const [liked, setLiked] = useState(likes.some((it) => it.username === username));
    const [likesNumber, setLikes] = useState(likes.length);

    const [commentsNumber, setComments] = useState(comments.length)

    const [favoriteBut, setFavorite] = useState(false);
    
    async function likesPost() {

        try {
            const {dataUser} = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null, {
                headers: {
                    Authorization: `Bearer: ${localStorage.getItem('token')}`,
                },
            });
            //cuando das like
            if (!liked) {
                setLikes(likesNumber + 1);
                setLiked(true);
            } else {
                //Cuando le quitas like
                setLikes(likesNumber - 1);
                setLiked(false);      
            }

        } catch (error) {
            console.log(error);
        }
        
    }

    function favoritesPost() {
        try {

            if(!favoriteBut){
                setFavorite(true);
            }else{
                setFavorite(false)
            }
        } catch (error) {
            console.log(error);           
        }
        
    }

    return (
        <div className="w-4/5 flex flex-col justify-center rounded-lg bg-gray-300 p-4 space-y-10">
            <div className="flex flex-nowrap items-center space-x-3" >

                <div>
                    <FaUserCircle size="20"/>

                </div>
                    <h3> @{user?.username} </h3>
                <button onClick={favoritesPost} className={`w-full flex justify-end items-center h-full ${favoriteBut && `text-blue-400`}`}>
                    <FaStar size="25" />
                </button>
            </div>

            <div>
                {
                    <img className="w-full object-cover my-2 rounded-2xl h-auto" src={image} alt="Imagen para el usuario" />
                }
            </div>
            <div>
                <p className="font-semibold"> {title} </p>
                <p className="text-xs"> {new Date(createdAt).toLocaleDateString()} </p>
            </div>
            <p> {description} </p>

            <div className="flex justify-center space-x-8">
                <div className="flex justify-center">
                    <button onClick={likesPost} className={`${liked && `text-blue-400`}`} type="button"><AiFillHeart className="mr-2" size={25} /></button>
                    {likes.length}
                </div>
                <div className="flex justify-center">
                    <button><FaComment className="mr-2" size={25} /></button>
                    {comments.length}
                </div>  
            </div>
            <div>
                {
                    comments && comments.map((it) => <Comments infoComment={it} />)            
                }
            </div>
        </div>
    );
}
export default PostCard;