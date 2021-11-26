import PostCard from '../DisplayPosts/PostCard/PostCard';
import Loading from '../Loading/Loading';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';


const DisplayPosts = () => {

    const [Post, setPost] = useState({
        status: 'Loading',
        data: null,
    });

    const [page, setpage] = useState(0);
    let [allPages, setPages] = useState(0);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const getPost = async () => {
            const { data: response } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=15&page=0', config);

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

            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=15&page=${page}`, config);
            setPost({ status: 'Ok', data: response.data });
            setPages(allPages = response.pages);
        };
        getPost();
    }, [page]);

    if (Post.status === 'Loading') return <Loading />;

    return (
        <div className="w-full min-h-screen bg-gray-100 border rounded-xl space-y-10 flex flex-col py-8 items-center laptop:w-1/2">
            <div className="w-4/5 flex justify-end">
                <span className="bg-gray-400 px-4 py-2 rounded-lg text-white font-medium" > Página: {page + 1} </span>
            </div>
            {
                Post.data && Post.data.map((it) => <PostCard key={it._id} struct={it} />)
            }

            <div className="flex items-center h-14 justify-center">
                <button className="bg-gray-400 m-2 p-2 rounded-lg text-white flex items-center hover:bg-gray-600"
                    onClick={() => {
                        setpage(page - 1);
                        if (page === 0) setpage(page);
                    }}>
                    <FaArrowLeft className="mr-1" />
                </button>
                <span className="bg-gray-400 my-3 px-2 py-1 rounded-lg text-white font-medium" > {page + 1} </span>
                <button className="bg-gray-400 m-2 p-2 rounded-lg text-white flex items-center hover:bg-gray-600"
                    onClick={() => {
                        setpage(page + 1);
                        if (page >= allPages) {
                            toast('No hay mas paginas', { type: 'Warning' });
                            setpage(page - 1);
                        }

                    }}>
                    <FaArrowRight className="ml-1" />
                </button>
            </div>
        </div>
    );
}
export default DisplayPosts;