import React from "react";
import TweetCard from "../Card/TweetCard";
import { useFetchUserTweets } from "../../hooks/useTweetHooks";
import { extractDate } from "../../Utils/extractDate";
import { useParams } from "react-router-dom";

// const tweets = [
//   {
//     tweetId: 1,
//     content: "This is a tweet",
//     owner: "John Doe",
//     date: "2021-09-01",
//   },
// ];

function UserTweets() {
  const { username } = useParams();
  // Custom hook to fetch all videos
  const { tweets, loading, error } = useFetchUserTweets(username);

  if (loading) {
    return (
      <div className="bg-darkbg text-2xl text-lighttext min-h-full p-4">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-darkbg text-2xl min-h-full text-highlight p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-darkbg p-4">
      {tweets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              content={tweet.content}
              owner={tweet.owner.ownerName}
              date={extractDate(tweet.createdAt)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center ">
          <h1 className="text-darktext text-2xl">No tweets found</h1>
          <p className="text-darktext">There are no tweets available.</p>
        </div>
      )}
    </div>
  );
}

export default UserTweets;
