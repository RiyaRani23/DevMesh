import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  const searchTerm = useSelector((store) => store.search);

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      const feedData = Array.isArray(res.data)
        ? res.data
        : res.data.data;

      dispatch(addFeed(feedData));
    } catch (err) {
      console.error("Error while fetching feed", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!Array.isArray(feed) || feed.length === 0) {
    return (
      <p className="text-center opacity-60 my-16">
        No New Users Found
      </p>
    );
  }

  // 🔍 PREFIX-BASED SEARCH FILTER
  const filteredFeed = feed.filter((user) => {
    if (!searchTerm) return true;

    const search = searchTerm.toLowerCase().trim();

    const firstName = user.firstName?.toLowerCase() || "";
    const lastName = user.lastName?.toLowerCase() || "";
    const fullName = `${firstName} ${lastName}`.trim();

    return (
      firstName.startsWith(search) ||
      lastName.startsWith(search) ||
      fullName.startsWith(search)
    );
  });

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {filteredFeed.length === 0 ? (
        <p className="text-center opacity-60">
          No matching users found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeed.slice(0, 6).map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;