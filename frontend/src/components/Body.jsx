import { Outlet, useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";


const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((store) => store.user);

const fetchUser = async () => {
        if(userData) return;
        try{
            const res = await axios.get(`${BASE_URL}/profile/view`, {
                withCredentials: true
            });
            dispatch(addUser(res.data));
        }catch(err){
            if(err.response?.status === 401){
                // Only redirect to login if not on public routes
                if(!['/login', '/', '/signup'].includes(location.pathname)){
                    navigate("/login");
                }
            }
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [])

    // Redirect logged-in users from "/" to "/feed"
    useEffect(() => {
        if(userData && location.pathname === '/'){
            navigate("/feed", { replace: true });
        }
    }, [userData, location.pathname, navigate]);

  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body