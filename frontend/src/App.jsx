import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connection";
import Requests from "./components/Requests";

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
       <Route path="/" element={<Body />}>
       <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/profile/edit" element={<EditProfile />} />
         <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
       </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;