import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserContext/UserContext';

const Navbar = () => {
  const { user, logout, updatepass, userverify } = useContext(AuthContext);
  const [errmail, setErrormail] = useState()
  const navigate = useNavigate()
  
  const handlechangepass = (e) => {
    e.preventDefault()
    const form = e.target;
    const newpass = form.newpass.value;

    updatepass(newpass)
      .then(() => {
        toast.success("Update Successful");
      })
      .catch((err) => setErrormail(err.message));
  };
    return (
      <div className="bg-slate-200">
        <div className="navbar w-4/5 mx-auto">
          <div className="">
            <Link
            onClick={()=>{
              user ? navigate('/home') : toast.error('Please Login First',{
                position:'top-left'
              })
            }}
              className="bg-slate-500 px-4 py-2 rounded text-white font-bold"
            >
              AuthCheck
            </Link>
          </div>
          <div className="ml-auto">
            <ul className="menu menu-horizontal px-1">
              {user ? (
                <>
                  <li>
                    <Link
                      to={"/home"}
                      className="px-4 py-2 bg-slate-500 rounded mx-1 text-white"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <label
                      htmlFor="my-modal-4"
                      className="px-4 py-2 bg-slate-500 rounded mx-1 text-white"
                    >
                      Change Password
                    </label>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        userverify()
                        .then(()=>{
                          toast.success(
                            `Check Your Email: ${user?.email} and Verify Your Account`
                          );
                        })
                        .catch(err => setErrormail(err.message))
                      }}
                      className="px-4 py-2 bg-slate-500 rounded mx-1 text-white"
                    >
                      Veryfy Your Email
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => logout()}
                      className="px-4 py-2 bg-slate-500 rounded mx-1 text-white"
                    >
                      LogOut
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/"}
                      className="px-4 py-2 bg-slate-500 rounded mx-1 text-white"
                    >
                      Registration
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/login"}
                      className="px-4 py-2 bg-slate-500 rounded mx-1 text-white"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* modal */}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal bg-slate-50">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-4"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <form onSubmit={handlechangepass} className="p-12">
              <h3 className="text-lg font-bold mb-3">Set New Password</h3>
              <input
                type="text"
                name="newpass"
                className=" p-2 rounded input-bordered w-full my-3 bg-slate-400 text-black focus:outline-none"
              />
              <button>
                <label className="btn" htmlFor="my-modal-4">
                  Submit
                </label>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Navbar;