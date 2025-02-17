import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCards from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log(res)
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;
  
  if(feed.length === 0) return <h1 className="text-xl font-semibold text-center">Feed is Empty</h1>

  return (
    feed && (
      <div className="flex columns-1 justify-center my-7">
        <UserCards user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
