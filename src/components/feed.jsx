import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import FeedCards from './userCard'


const Feed = () => {

  const feed = useSelector((store)=> store.feed)

  // const [displayfeed,setFeed] = useState("")
  const dispatch = useDispatch()


  const getFeed = async () =>{
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL+"/feed",{withCredentials: true})
      dispatch(addFeed(res.data))
    }
    catch(err){
      console.log(err.message);
    }

  }
  useEffect(()=>{
    getFeed()
  },[])

  return (
    <>
    {feed && 
    <div className='flex columns-1 justify-center my-7'>
      <FeedCards user={feed[0]}/>
    </div>}
    </>
  )
}

export default Feed;