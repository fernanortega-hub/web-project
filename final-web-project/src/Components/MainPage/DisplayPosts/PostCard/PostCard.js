
import react, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaStar, FaComment, FaHeart, FaEdit } from "react-icons/fa";
import axios from "axios";
import Comments from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import shortid from 'shortid';
import { toast, ToastContainer } from 'react-toastify';
import EditForm from "../../../Profile/DisplayOwned/EditForm/EditForm";

const PostCard = ({ username, struct, reference, reloadReference}) => {
    const {
        _id, title, description, image, user, likes, comments, createdAt, active
    } = struct;
    //comments
    const [showComm, setShow] = useState(false);
    const [commentState, setComments] = useState(comments)
    //likes 
    const [liked, setLiked] = useState(likes.some((it) => it.username === username));
    const [likesNumber, setLikesNumber] = useState([]);
    const [likeCount, setLikes] = useState(likes.length)
    const [favoriteBut, setFavorite] = useState(false);
    const [post, setPost] = useState();
    //edit
    const [edit, setEdit] = useState(false);
    //toogle
    const [postStatus, setPostStatus] = useState(active);
    console.log("Titulo: "+ title);
    console.log("Estado: "+ active)

    useEffect(() => {
        async function getFavList() {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/fav`, config);
            let checker = false;
            response.favorites.map((favId) => {
                if (favId == _id) {
                    checker = true;
                };
            })
            setFavorite(checker);
        };
        getFavList();
    }, []);

    async function likesPost() {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            };

            await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null, config);

            axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/one/${_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then((res) => {
                const { data } = res;
                setPost(data);
                setLikesNumber({
                    likes: data.likes.length,
                    state: data.likes.some((like) => like.username === username) ? "remove" : "add" // Seteando el like, si el nombre de usuario existe en ese post, el like se quita
                });
            })
             // Si al post le estoy dando like (actualizarlo al instante)
            if (!liked) {
                setLikes(likeCount + 1);
                setLiked(true);
            } else {
                // Si el post le estoy quitando like (actualizarlo al instante)
                setLikes(likeCount - 1);
                setLiked(false);
            }
        } catch (error) {
            toast('No puedes dar like a este post', { type: 'error' });
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
    };

    const toogleHandler= async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            };

        await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/toggle/${_id}`, null, config);
        setPostStatus(!postStatus);
        reloadReference();
        }catch(e){
            console.log("Hubo un error 10000");
        }
    }

    return (
        <div className="h-4/6 bg-gray-100 flex flex-col justify-center items-center w-11/12 dark:bg-gray-600">
            <ToastContainer />
            <div className="max-w-md container bg-white rounded-xl shadow-lg transform transition duration-500 hover:shadow-2xl dark:bg-gray-500 overflow-x-hidden">
                {reference == "DisplayOwned" && active && 
                    <div className="w-full bg-green-600 flex justify-around overflow-x-hidden">
                        <h1 className="text-gray-800 font-bold">ACTIVO</h1>
                        <button onClick={(e)=>{toogleHandler()}}>desactivar</button>
                    </div>
                }

                {reference == "DisplayOwned" && !active && 
                    <div className="w-full bg-red-500 flex justify-around overflow-x-hidden">
                        <h1 className="text-gray-800 font-bold">DESACTIVO</h1>
                        <button onClick={(e)=>{toogleHandler()}}>activar</button>
                    </div>
                }
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-800 cursor-pointer break-all hover:text-gray-900 transition duration-100 dark:text-white">{title}</h1>
                    <p className="text-xs dark:text-white"> {new Date(createdAt).toLocaleDateString()} </p>
                    <p className="text-gray-700 mt-3 hover:underline cursor-pointer break-all dark:text-white">{description}</p>
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
                            <span> { likeCount }</span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <button type="button" onClick={favoritesPost} className={`${favoriteBut && `text-yellow-400`} text-gray-400`}><FaStar size={25} /> </button>
                        </div>
                        {reference == "DisplayOwned" && 
                            <div className="flex space-x-3 items-center">
                                <button type="button" onClick={()=>{setEdit(!edit)}} className={` text-gray-500`}><FaEdit size={25} /> </button>
                            </div>
                        }
                    </div>
                </div>
                <div className={`${!showComm && `hidden`}`} >
                    {
                        comments && commentState.map((it) => <Comments key={shortid.generate()} infoComment={it} />)
                    }
                    <AddComment post={_id} afterSubmit={addCommentChange} />
                </div>
                {edit && <EditForm postId={_id} setStatus={()=>{
                    setEdit(false);
                    reloadReference();
                    }}/>}
            </div>        
        </div>
    )
}

export default PostCard;


/*
<div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-800 cursor-pointer break-all hover:text-gray-900 transition duration-100 dark:text-white">{title}</h1>
                    <p className="text-xs dark:text-white"> {new Date(createdAt).toLocaleDateString()} </p>
                    <p className="text-gray-700 mt-3 hover:underline cursor-pointer break-all dark:text-white">{description}</p>
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
                            <span> { likeCount }</span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <button type="button" onClick={favoritesPost} className={`${favoriteBut && `text-yellow-400`} text-gray-400`}><FaStar size={25} /> </button>
                        </div>
                        {reference == "DisplayOwned" && 
                            <div className="flex space-x-3 items-center">
                                <button type="button" onClick={(e)=>{console.log("funciona")}} className={` text-gray-500`}><FaEdit size={25} /> </button>
                            </div>
                        }
                    </div>
                </div>
                <div className={`${!showComm && `hidden`}`} >
                    {
                        comments && commentState.map((it) => <Comments key={shortid.generate()} infoComment={it} />)
                    }
                    <AddComment post={_id} afterSubmit={addCommentChange} />
                </div>
*/