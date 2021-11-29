import PostCard from '../DisplayPosts/PostCard/PostCard';
import Loading from '../../Loadings/Loading';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';



const DisplayPosts = ({ username }) => {

    const [Post, setPost] = useState({
        status: 'Loading',
        data: null,
    });

    const pages = useRef();
    const [page, setpage] = useState(0);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const getPost = async () => {

            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=10&page=${page}`, config);
            setPost({ status: 'Ok', data: response.data });
            pages.current = response.pages;
        };
        getPost();
    }, [page]); 

    if (Post.status === 'Loading') return <Loading />;

    //scroll para la página
    const scrollPage = () =>{
        window.scroll({
            top: 0,
            left:0,
            behavior: 'smooth',
        })
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 rounded-xl space-y-10 flex flex-col py-8 items-center laptop:w-1/2 dark:bg-gray-600">
            {
                Post.data && Post.data.map((it) => <PostCard key={it._id} struct={it} username={username}/>)
            }

            <div className="flex items-center h-14 justify-center">
                <button className="bg-gray-400 m-2 p-2 rounded-lg text-white flex items-center hover:bg-gray-600 dark:hover:bg-gray-800" 
                    onClick={() => {
                        
                        setpage(page - 1);
                        scrollPage();
                        if (page === 0) setpage(page);
                    }}>
                    <FaArrowLeft className="mr-1" />
                </button>
                <span className="bg-gray-400 my-3 px-2 py-1 rounded-lg text-white font-medium dark:bg-gray-800" > {page + 1} </span>
                <button className="bg-gray-400 m-2 p-2 rounded-lg text-white flex items-center hover:bg-gray-600 dark:hover:bg-gray-800"
                    onClick={() => {
                        setpage(page + 1);
                        scrollPage();
                        if (page >= pages) {
                            toast('No hay mas paginas', { type: 'Warning' });
                            setpage(page - 1);
                            
                            }
                        }
                    }>
                    <FaArrowRight className="ml-1" />
                </button>
            </div>
        </div>
    );
}
export default DisplayPosts;