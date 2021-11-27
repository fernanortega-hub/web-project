
import react, { useState, useEffect } from "react";
import { FaUserCircle, FaStar, FaComment, FaHeart } from "react-icons/fa";
import axios from "axios";
import Comments from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import shortid from 'shortid';

const PostCard = ({ username, struct }) => {
    const {
        _id, title, description, image, user, likes, comments, createdAt
    } = struct;
    //comments
    const [showComm, setShow] = useState(false);
    const [commentState, setComments] = useState(comments)
    //likes 
    const [liked, setLiked] = useState(likes.some((it) => it.username === username));
    const [likesNumber, setLikesNumber] = useState(likes.length);
    const [favoriteBut, setFavorite] = useState(false);

    const getFavList = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/`, config);
        let checker = false;
        response.favorites.map((favId) => {
            if (favId == _id) {
                checker = true
            }
        })
        setFavorite(checker);
        console.log(response);
    };

    async function likesPost() {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            };

            await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null, config);

            //cuando das like
            if (!liked) {
                setLikesNumber(likesNumber + 1);
                setLiked(true);
            } else {
                //Cuando le quitas like
                setLikesNumber(likesNumber - 1);
                setLiked(false);
            }

        } catch (error) {
            console.log(error);
        }
    };

    function addCommentChange(comment) {
        const value = ([...commentState, { ...comment, user: { username } }]);
        setComments(value);
    };


    async function favoritesPost() {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            };

            await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/${_id}`, null, config);
            if (!favoriteBut) {
                setFavorite(true);
            } else {
                setFavorite(false);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-4/6 bg-gray-100 flex justify-center items-center w-11/12 dark:bg-gray-600">
            <div className="max-w-md container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl dark:bg-gray-500">
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 dark:text-white">{title}</h1>
                    <p className="text-xs dark:text-white"> {new Date(createdAt).toLocaleDateString()} </p>
                    <p className="text-gray-700 mt-3 hover:underline cursor-pointer dark:text-white">{description}</p>
                </div>
                <img className="w-full cursor-pointer" src={image} alt="" />
                <div className="flex p-4 justify-between dark:text-white">
                    <div className="flex items-center space-x-0 ">
                        <FaUserCircle className="w-10 rounded-full" size={25} />
                        <h2 className="text-gray-800 font-bold cursor-pointer dark:text-white">@{user?.username}</h2>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <div className="flex space-x-1 items-center">
                            <button type="button" onClick={() => setShow(!showComm)} className={`${showComm && `text-blue-400`} text-gray-400`}><FaComment size={25} /></button>
                            <span>{commentState.length}</span>
                        </div>
                        <div className="flex space-x-1 items-center">
                            <button type="button" onClick={likesPost} className={`${liked && `text-red-400`} text-gray-400`} fill="currentColor"> <FaHeart size={25} className="text-green" /></button>
                            <span> {likesNumber}</span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <button type="button" onClick={favoritesPost} className={`${favoriteBut && `text-yellow-400`} text-gray-400`}><FaStar size={25} /> </button>
                        </div>
                    </div>
                </div>
                <div className={`${!showComm && `hidden`}`} >
                    {
                        comments && commentState.map((it) => <Comments key={shortid.generate()} infoComment={it} />)
                    }
                    <AddComment post={_id} afterSubmit={addCommentChange} />
                </div>
                {/* <button onClick={getFavList}> Boton </button> Con este boton podes ver que no es necesaria el useEffect*/}
            </div>
        </div>
    )
}

export default PostCard;