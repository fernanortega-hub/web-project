import PostCard from '../DisplayPosts/PostCard/PostCard';
import Loading from '../Loading/Loading';
import { useState } from 'react';

const DisplayPosts = () =>{

    const [Post, setPost] = useState({
        status: 'Loading', 
        data: null,
    });


    return(
        <div className="w-4/5 min-h-screen bg-gray-100 border rounded-lg shadow-lg my-4 tablet:w-2/3">
            {/* <Loading/> */}
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            
        </div>
    );
}
export default DisplayPosts;