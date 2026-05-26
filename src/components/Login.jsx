import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("ShahrukhKHAN@gmail.com");
  const [password, setPassword] = useState("Saharukh@98080");
  const [error, setError] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`,
        {
          emailId,
          password
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error.response?.data);
      console.error("Error occurred while logging in:", error);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input my-2"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          {error && <p className="text-error">{error}</p>}
          <div className="card-actions justify-center">
            <button
              className="btn bg-sky-600 border-sky-800 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-400 px-5"
              onClick={handleLogin}
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login