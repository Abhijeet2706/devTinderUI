import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';

const Connections = () => {
    const dispatch = useDispatch();

    const connections = useSelector((store) => store.connections)
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            console.log("Connections data", res);
            dispatch(addConnections(res.data?.data));

        } catch (error) {
            console.error("Error occurred while fetching connections:", error);
        }
    };

    useEffect(() => {
        fetchConnections()
    }, []);


    if (!connections) return;
    if (connections.length === 0) {
        {
            return (
                <h1>No connections found</h1>
            )
        }

    }
    return (
        <div className='my-10 text-center'>
            <h1 className='text-bold text-3xl text-black-300'>Connection</h1>
            {connections?.map((connection) => {
                const { firstName, lastName, photoUrl, age, gender, about, _id } = connection || {};
                return (
                    <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto text-center' key={_id}>
                        <div>
                            <img
                                alt='photo'
                                className='w-20 h-20 rounded-full'
                                src={photoUrl} /></div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>{firstName} {lastName}</h2>
                            <p>{age ?? ""} {gender ?? ""}</p>
                            <p>{about}</p>
                        </div>
                    </div>
                )
            }

            )}
        </div>
    )
}

export default Connections