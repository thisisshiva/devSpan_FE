import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch , useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connection = () => {

    const connection = useSelector(store=> store.connection)
    const dispatch = useDispatch();

    const fetchConnection = async () =>{
        if(connection) return;
        try{
            const res = await axios.get(BASE_URL+"/user/requests/connections",{withCredentials:true})
            console.log(res);
            
            dispatch(addConnections(res.data.data))
        }
        catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        fetchConnection()
    },[]) 

    if(!connection) return;
    if(connection.length === 0) return <h1 className='text-center my-4 text-2xl font-bold'>No Connections</h1>

  return (
    <div className='text-center'>
    <h1 className='text-3xl font-bold my-7'>Connections</h1>
    {connection.map((connections)=>{
        const {_id,firstName,lastName,age,gender,skills,photoUrl,about} = connections;

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

export default Connection;