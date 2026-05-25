import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';


const Feed = () => {
    const dispatch = useDispatch();

    const feed = useSelector((store) => store.feed);
    console.log(feed);
    const getFeed = async () => {
        try {
            if (feed) return;
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true
            });
            dispatch(addFeed(res?.data))

        } catch (error) {
            console.error("Error occurred while fetching feed:", error);
        }
    };

    useEffect(() => {
        getFeed()
    }, [])



    return (
        feed &&
        <div className='flex justify-center my-10'>
            <UserCard user={feed?.data[0]} />
        </div>


    )
}

export default Feed;
