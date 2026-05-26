import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';


const DUMMY_IMAGE = "data:image/png;base64,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"
const Request = () => {
    const dispatch = useDispatch();
    const request = useSelector((store) => store.request);

    console.log("request in request component", request);

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", {
                withCredentials: true
            });
            dispatch(addRequest(res.data.data));

            console.log("request", res);
        } catch (error) {
            console.error("Error occurred while fetching request:", error);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, [])
    if (!request) return null;
    if (request?.data?.length === 0) {
        {
            return (
                <h1>No requests found</h1>
            )
        }

    }
    return (
        <div className='my-10 text-center'>
            <h1 className='text-bold text-3xl text-black-300'>Requests</h1>
            {request?.map((req) => {
                const { firstName, lastName, photoUrl, age, gender, about, _id } = req.fromUserId || {};
                return (
                    <div
                        className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto text-center'
                        key={_id}>
                        <div>
                            <img
                                alt='photo'
                                className='w-20 h-20 rounded-full'
                                src={photoUrl || DUMMY_IMAGE}
                            />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>{firstName} {lastName}</h2>
                            <p>{age ?? ""} {gender ?? ""}</p>
                            <p>{about}</p>
                        </div>
                        <div className="flex gap-2 justify-center">
                            <button className="btn btn-primary bg-[oklch(45%_.24_277.023)] text-white px-4 py-2 rounded mx-2"
                            >
                                Reject
                            </button>
                            <button className="btn btn-secondary"
                                className="btn btn-primary bg-[oklch(65%_.241_354.308)] text-white px-4 py-2 rounded mx-2"
                            >
                                Accept
                            </button>
                        </div>

                    </div>
                )
            }

            )}
        </div>
    )
}

export default Request