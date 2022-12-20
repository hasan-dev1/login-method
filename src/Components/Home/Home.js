import React, { useContext } from 'react';
import { AuthContext } from '../UserContext/UserContext';

const Home = () => {
  const {isnew} = useContext(AuthContext)
  console.log(isnew)
    return (
      <div className="w-4/5 mx-auto">
        <div className="h-[80vh] flex flex-col justify-center items-center">
          <p>If You Create New Account please Reload Your page On Time</p>
          <h3 className="text-4xl my-3">
            Follow Navbar to change your password
          </h3>
        </div>
      </div>
    );
};

export default Home;