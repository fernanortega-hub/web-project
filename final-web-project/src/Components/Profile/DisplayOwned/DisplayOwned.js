import Loading from '../../Loadings/Loading';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostCard from '../../MainPage/DisplayPosts/PostCard/PostCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import UseDarkMode from '../../../Services/UseDarkMode';

const DisplayOwned = ({username}) => {
    
    const [Post, setPost] = useState({
        status: 'Loading',
        data: null,
    });

    const pages = useRef();
    const [page, setpage] = useState(0);
    const [reload, setReload] = useState(()=>{return false});
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const getOwned = async () => {

            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/owned?limit=15&page=${page}`, config);
            setPost({ status: 'Ok', data: response.data });
            pages.current = response.pages;
        };
        getOwned();
    }, [page, reload]); 

    if (Post.status === 'Loading') return <Loading />;
    
    return(
        <div className="w-full min-h-screen bg-gray-100 rounded-xl space-y-10 flex flex-col py-8 items-center gap-3 laptop:w-1/2 dark:bg-gray-600">
        {
            Post.data && Post.data.map((it) => <PostCard key={it._id} struct={it} username={username} reference={"DisplayOwned"} reloadReference={()=>{
                //window.location.reload();
                setReload(!reload);
            }}/>)
        }

        <div className="flex items-center h-14 justify-center dark:bg-gray-600">
            <button className="bg-gray-400 m-2 p-2 rounded-lg text-white flex items-center hover:bg-gray-600"
                onClick={() => {
                    setpage(page - 1);
                    if (page === 0) setpage(page);
                }}>
                <FaArrowLeft className="mr-1" />
            </button>
            <span className="bg-gray-400 my-3 px-2 py-1 rounded-lg text-white font-medium" > {page + 1} </span>
            <button className="bg-gray-400 m-2 p-2 rounded-lg text-white flex items-center hover:bg-gray-600"
                onClick={(e) => {
                    setpage(page + 1);
                    if (page > pages) {
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

export default DisplayOwned;