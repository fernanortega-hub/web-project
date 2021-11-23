import PostCard from '../DisplayPosts/PostCard/PostCard';
import Loading from '../Loading/Loading';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayPosts = () =>{

    const [Post, setPost] = useState({
        status: 'Loading', 
        data: null,
    });


    useEffect( ()=>{
        const getPost = async () =>{
                const {data: response} = await axios.get('', {
                    headers: {
                        Authorization: `Bearear ${localStorage.getItem('token')}`,
                        },
                });  
            setPost({status: 'DONE', data: response.data});
        }
        getPost();

    }, []);

    if (Post.status === 'Loading') return <Loading/>
        
    return(
        <div className="w-4/5 min-h-screen bg-gray-100 border rounded-lg shadow-lg my-4 tablet:w-2/3">
            {/* <Loading/> */}
            {
                Post.data && Post.data.map((it) => <PostCard key= {it._id} struct={it}/>)
            }
            
        </div>
    );
}
export default DisplayPosts;