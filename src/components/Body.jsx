import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import Footer from './Footer'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
/**
 * 
 * @returns Outlet is a conatiner which help to render the children of Body component
 */

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));

    } catch (error) {
      if (error.response?.status === 401) {
        return navigate("/login");
      }
      console.error("Error occurred while fetching user data:", error.response?.status || error.message);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, [userData]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body