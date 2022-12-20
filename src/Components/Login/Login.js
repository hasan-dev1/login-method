import { getAdditionalUserInfo } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaKey } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../UserContext/UserContext';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { UserLogin, setEmail, setIsnew } = useContext(AuthContext);
  const [logerr, setLogerr] = useState('')
  const [modalerr, setModalerr] = useState()
  const navigate = useNavigate()
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const {email, password} = errors;
  const location = useLocation()

  const handlelogin = (e)=>{
    //login
    setLoading(true)
    UserLogin(e.email, e.password)
    .then(result => {
      const user = result.user;
      toast.success('Logein Successful')
      setLogerr('')
      setLoading(false)
      reset()
      navigate('/home')
    })
    .catch(err =>{
      setLogerr(err.message)
      setLoading(false)
    })
  }

  const handleforgetpass = (e) => {
    e.preventDefault()
    const form = e.target;

    const email = form.emailforchangepass.value;
    setLoading(true)
    setEmail(email)
    .then(result =>{
      setModalerr({border:false, message:''})
      setLoading(false)
      toast.success(
        "Check your email to reset your password Please don't forget to check your spam",
        {
          duration: 4000,
        }
      );
    })
    .catch(err => {
      setModalerr({border:true, message:err.message})
      setLoading(false)
      console.log(err.message)
    })
  };
    return (
      <div className="h-[75vh]  w-4/5 mx-auto">
        <div className="w-1/2 mx-auto mt-12 rounded bg-[#FFFFFF] rounded-0 shadow-xl py-8 px-12">
          <p className="mb-6 mt-4 text-[#7FD222] text-2xl text-center">Login</p>
          <form onSubmit={handleSubmit(handlelogin)}>
            <div className="relative">
              <input
                id="email"
                placeholder="Email ID"
                className={`pl-12 pr-4 py-2 mt-2 w-full ${
                  errors.email ? "border-red-600" : "border-slate-300"
                } border-2 rounded focus:outline-none bg-[#F9F9F9]`}
                type="email"
                {...register("email", {
                  required: "Please Input a Valid Email",
                })}
              />
              <span className="absolute top-[22px] left-1 px-2 border-r-2">
                <FaEnvelope></FaEnvelope>
              </span>
              <p className="text-sm text-red-500">{email?.message}</p>
            </div>
            <div className="relative">
              <input
                placeholder="Password"
                className={`pl-12 pr-4 py-2 mt-2 w-full ${
                  errors.password ? "border-red-600" : "border-slate-300"
                } border-2 rounded focus:outline-none bg-[#F9F9F9]`}
                type="password"
                {...register("password", { required: "Input Your Password" })}
              />
              <span className="absolute top-[22px] left-1 px-2 border-r-2">
                <FaKey></FaKey>
              </span>
              <p className="text-sm text-red-500">{password?.message}</p>
            </div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="my-modal-3"
                className="cursor-pointer hover:text-lime-500"
              >
                forget Password?
              </label>
            </div>
            <p className="text-sm text-red-500">{logerr}</p>

            <div className="text-center mt-4">
              <button className="bg-primary w-full px-4 py-2 rounded text-white font-bold text-center">
                {loading ? (
                  <div className="flex justify-center items-center h-full mx-2 mt-1">
                    <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white"></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>

          {/* modal */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal bg-slate-50">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>

              <form onSubmit={handleforgetpass} className="p-12">
                <h3 className="text-lg font-bold mb-3">
                  Input Your Email to Change Password
                </h3>
                <input
                  type="email"
                  name='emailforchangepass'
                  className=" p-2 rounded input-bordered w-full my-3 bg-slate-400 text-black focus:outline-none"
                />
                <button className="bg-primary w-full px-4 py-2 rounded text-white font-bold text-center">
                  {loading ? (
                    <div className="flex justify-center items-center h-full mx-2 mt-1">
                      <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white"></div>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;