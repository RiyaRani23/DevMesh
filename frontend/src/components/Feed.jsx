import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import ShimmerCard from "./ShimmerCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  const searchTerm = useSelector((store) => store.search);

  

  const getFeed = async () => {
  if (feed && feed.length > 0) return; // Prevent unnecessary refetching

  try {
    const res = await axios.get(`${BASE_URL}/feed`, {
      withCredentials: true,
    });

    // Ensure we always have an array, even if the API fails or is empty
    const feedData = res?.data?.data || (Array.isArray(res?.data) ? res.data : []);

    dispatch(addFeed(feedData));
  } catch (err) {
    console.error("Error while fetching feed:", err);
    // Dispatch an empty array so the UI doesn't stay in "Shimmer" mode forever
    dispatch(addFeed([])); 
  }
};

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => <ShimmerCard key={n} />)}
        </div>
      </div>
    );
  }

if (feed.length === 0) {
    return <p className="text-center opacity-60 my-16">No New Users Found</p>;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredFeed.slice(0, 6).map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;