import PostCard from '../DisplayPosts/PostCard/PostCard';
import Loading from '../Loading/Loading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const DisplayPosts = () => {

    const [Post, setPost] = useState({
        status: 'Loading',
        data: null,
    });

    const [page, setpage] = useState(0);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const getPost = async () => {
            const { data: response } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=10&page=0', config);

            setPost({ status: 'Ok', data: response.data });
        };

        getPost();
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const getPost = async () => {
            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=10&page=${page}`, config);

            setPost({ status: 'Ok', data: response.data });
        };

        getPost();
    }, [page]);

    if (Post.status === 'Loading') return <Loading />;



    return (
        <div className="w-4/5 min-h-screen bg-gray-100 border rounded-lg shadow-lg my-4 tablet:w-2/3">
            {
                Post.data && Post.data.map((it) => <PostCard key={it._id} struct={it} />)
            }

            <div className="flex items-center h-14 justify-center mb-2">
                <button className="bg-gray-400 m-2 p-2 rounded-lg text-white font-semibold flex items-center hover:bg-gray-600"
                    onClick={()=>{
                        setpage(page-1);
                        if(page===0) setpage(page);
                    }}
                >
                    <FaArrowLeft className="mr-1"/>
                    Posts anteriores
                </button>
                <button className="bg-gray-400 m-2 p-2 rounded-lg text-white font-semibold flex items-center hover:bg-gray-600"
                    onClick={()=>{
                        setpage(page+1);
                        // Agregar validacion de una maxima cantidad de paginas
                    }}
                >
                    Posts siguientes 
                    <FaArrowRight className="ml-1" />
                </button>
            </div>

        </div>
    );
}
export default DisplayPosts;