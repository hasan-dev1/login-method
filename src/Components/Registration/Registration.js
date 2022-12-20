import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  FaEnvelope,
  FaKey,
  FaMapMarkerAlt,
  FaPhone,
  FaUserAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserContext/UserContext";

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [autherr, setAutherr] = useState('')
  const {name, number, email, password} = errors;
  const [loading, setLoading] = useState(false);
  const {UserCreate , user} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleform = (e)=>{
    const registrationInfo = e;
    //userinfo
    setLoading(true)
    UserCreate(e.email, e.password)
    .then(result => {
      const user = result.user;
      setAutherr('')
      toast.success('Acount Created Successfully')
      setLoading(false)
      navigate('/login')
    })
    .catch(err => {
      setLoading(false)
      setAutherr(err.message);
    })

  }
  return (
    <div className="h-[75vh] w-4/5 mx-auto ">
      <div className="w-1/2 mx-auto mt-12 rounded bg-[#FFFFFF] rounded-0 shadow-xl py-8 px-12">
        <form onSubmit={handleSubmit(handleform)}>
          <p className="mb-6 mt-4 text-[#7FD222] text-2xl text-center">
            Registration Form
          </p>
          <div className="relative">
            {/* ${
                border ? "border-[#EFEFEF]" : "border-red-500"
              }  */}
            <input
              placeholder="Name"
              className={`pl-12 pr-4 py-2 mt-3 w-full border-2 ${
                errors.name ? "border-red-600" : "border-slate-300"
              } rounded focus:outline-none bg-[#F9F9F9]`}
              type="text"
              {...register("name", { required: "Your Name is required" })}
            />
            <span className="absolute top-[26px] left-1 px-2 border-r-2">
              <FaUserAlt></FaUserAlt>
            </span>
            <p className="text-sm text-red-500">{name?.message}</p>
          </div>
          <div className="relative">
            <input
              placeholder="Phone Number"
              className={`pl-12 pr-4 py-2 mt-3 w-full ${
                errors.number ? "border-red-600" : "border-slate-300"
              }  border-2 rounded focus:outline-none bg-[#F9F9F9]`}
              type="number"
              {...register("number", { required: "Number is required" })}
            />
            <span className="absolute top-[26px] left-1 px-2 border-r-2">
              <FaPhone></FaPhone>
            </span>
            <p className="text-sm text-red-500">{number?.message}</p>
          </div>
          <div className="relative">
            <input
              placeholder="Email ID"
              className={`pl-12 pr-4 py-2 mt-3 w-full ${
                errors.email ? "border-red-600" : "border-slate-300"
              } border-2 rounded focus:outline-none bg-[#F9F9F9]`}
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            <span className="absolute top-[26px] left-1 px-2 border-r-2">
              <FaEnvelope></FaEnvelope>
            </span>
            <p className="text-sm text-red-500">{email?.message}</p>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              className={`pl-12 pr-4 py-2 mt-3 w-full ${
                errors.password ? "border-red-600" : "border-slate-300"
              } border-2 rounded focus:outline-none bg-[#F9F9F9]`}
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            <span className="absolute top-[26px] left-1 px-2 border-r-2">
              <FaKey></FaKey>
            </span>
            <p className="text-sm text-red-500">{password?.message}</p>
          </div>
          <div className="relative">
            <input
              placeholder="Address"
              className=" pl-12 pr-4 py-2 mt-3 w-full border-slate-300 border-2 rounded focus:outline-none bg-[#F9F9F9]"
              type="text"
              name="address"
            />
            <span className="absolute top-[26px] left-1 px-2 border-r-2">
              <FaMapMarkerAlt></FaMapMarkerAlt>
            </span>
          </div>
          <p className="text-sm text-red-500">{autherr}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              type="reset"
              className="bg-primary w-full mx-1 px-4 py-2 rounded text-white font-bold text-center"
            >
              Clear Form
            </button>
            <button className="bg-primary w-full mx-1 px-4 py-2 rounded text-white font-bold text-center">
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
      </div>
    </div>
  );
};

export default Registration;
