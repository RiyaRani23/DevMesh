import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReceivedRequests,
  addSentRequests,
  removeRequest,
} from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestsData = useSelector((store) => store.requests);
  const received = requestsData?.received || [];
  const sent = requestsData?.sent || [];

  const fetchReceivedRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addReceivedRequests(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchSentRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/sent", {
        withCredentials: true,
      });
      dispatch(addSentRequests(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
    fetchSentRequests();
  }, []);

  return (
    <div className="flex justify-center min-h-screen py-10 bg-base-100">
      <div className="w-full max-w-2xl px-4">
        <div className="bg-base-300 shadow-2xl rounded-3xl overflow-hidden border border-base-content/5">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
            <h1 className="text-4xl font-bold text-center text-base-content tracking-tight">
              Connection Network
            </h1>
            <p className="text-center text-sm text-lg opacity-60 text-pink-300">Manage your social interactions</p>
          </div>

          <div className="tabs tabs-lifted w-full">
            {/* --- RECEIVED TAB --- */}
            <input
              type="radio"
              name="request_tabs"
              className="tab [--tab-bg:var(--fallback-b2,oklch(var(--b2)))] text-xl text-purple-400
               hover:text-white "
              aria-label="📥 Received"
              defaultChecked
            />
            <div className="tab-content bg-base-200 border-base-300 p-6 min-h-[400px]">
              {received.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 opacity-40">
                  <span className="text-5xl mb-2">∅</span>
                  <p>No new requests today 🌸</p>
                </div>
              ) : (
                received.map((request) => (
                  <div key={request._id} className="card card-side bg-base-100 shadow-sm mb-4 border border-base-300 hover:shadow-md transition-all">
                    <figure className="pl-4">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={request.fromUserId?.photoUrl} alt="profile" />
                        </div>
                      </div>
                    </figure>
                    <div className="card-body p-4 hover:pt-2 transition-all">
                      <h2 className="card-title text-md font-bold leading-tight  hover:text-pink-400 hover:font-extrabold">
                        {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                      </h2>
                      <p className="text-xs opacity-70 line-clamp-1">{request.fromUserId?.about}</p>
                      <div className="card-actions justify-end mt-2">
                        <button 
                          className="btn btn-primary btn-sm rounded-lg"
                          onClick={() => reviewRequest("accepted", request._id)}
                        >
                          Accept
                        </button>
                        <button 
                          className="btn btn-outline btn-error btn-sm rounded-lg"
                          onClick={() => reviewRequest("rejected", request._id)}
                        >
                          Ignore
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* --- SENT TAB --- */}
            <input
              type="radio"
              name="request_tabs"
              className="tab [--tab-bg:var(--fallback-b2,oklch(var(--b2)))] text-xl text-purple-400 hover:text-white"
              aria-label="📤 Sent"
            />
            <div className="tab-content bg-base-200 border-base-300 p-6 min-h-[400px]">
              {sent.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 opacity-40">
                  <span className="text-5xl mb-2">✉️</span>
                  <p>Your outbox is empty</p>
                </div>
              ) : (
                sent.map((request) => (
                  <div key={request._id} className="flex items-center gap-4 bg-base-100 p-4 rounded-2xl shadow-sm mb-3 
                  border border-base-300">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={request.toUserId?.photoUrl} alt="profile" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold hover:text-pink-400 hover:font-bold">{request.toUserId?.firstName} {request.toUserId?.lastName}</h3>
                      <p className="text-xs opacity-50 italic">Waiting for response...</p>
                    </div>
                    <button className="btn btn-secondary btn-outline btn-sm rounded-full no-animation 
                    pointer-events-none ">
                      Pending
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;