import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestsSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store=> store.requests)

    const fetchReq = async () => {
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials: true})
            dispatch(addRequests(res.data.data))

        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        fetchReq()
    },[])

    if(!requests) return;
    if(requests.length === 0) return <h1 className='text-center my-4 text-2xl font-bold'>No Requests</h1>

  return (
    <div className='text-center'>
    <h1 className='text-3xl font-bold my-7'>Requests</h1>
    {requests.map((requests)=>{
        const {_id,firstName,lastName,age,gender,skills,photoUrl,about} = requests.fromUserId;

        return (
            <div key={_id} className='flex bg-base-300 m-10 p-6 rounded-lg max-w-2xl mx-auto'>
                <div>
                    <img src={photoUrl} alt="userPhoto" className='w-24 rounded-full' />
                </div>
                <div className='text-left mx-7'>
                    <h2 className='text-xl font-bold'>{firstName +" "+ lastName}</h2>
                    {age && gender && <p>{age + gender}</p>}
                    <p>{skills}</p>
                    <p>{about}</p>
                </div>
            </div>
        );
    })}
    </div>
  )
}


export default Requests