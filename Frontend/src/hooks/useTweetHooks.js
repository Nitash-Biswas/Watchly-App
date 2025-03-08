import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, TWEETS_URL } from "../constants";
import Cookies from "js-cookie";
/*
What is a custom hook?
A custom hook is a JavaScript function that allows
you to reuse logic in your React components.
 */


// Custom hook to fetch all tweets
export const useFetchAllTweets = () => {
  // State to store videos, loading and error
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tweets from the server using axios
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}${TWEETS_URL}/get_all_tweets`
        );
        setTweets(response.data?.data.allTweets);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  return { tweets, loading, error };
};

// Custom hook to fetch all videos of the logged in user
export const useFetchUserTweets = (username) => {
  // State to store tweets, loading and error
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tweets from the server using axios
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // Get tokens from cookies
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        // Set up headers with tokens
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        };

        const response = await axios.get(
          `${BASE_URL}${TWEETS_URL}/get_user_tweets/${username}`,
          { headers, withCredentials: true }
        );
        setTweets(response.data?.data.allTweets);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("You are not logged in");
        } else {
          setError(err.response?.data?.message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  return { tweets, loading, error };
};
