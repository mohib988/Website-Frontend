import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import CustomInput from "../components/CustomInput";
import "./Signup.css";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { signup } from "../actions/action";


function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const [myError, setMyError] = useState("");

  const [passwordVisible, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //add a User
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setForm((prevForm) => ({
        ...prevForm,
        username: value.split("@")[0],
        [name]: value,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const onSubmitHandler = async (event) => {
    // setIsLoading(true);
    event.preventDefault();

  
    try{
      const a=await dispatch(signup(form) )
      if(a.status===204 || a.status===201 || a.status===200){
        setMyError("")
navigate("/signin")
}
else if (a.status===400){
  if(a.body.non_field_errors[0]!=null){
    navigate("/signin")
    setMyError("")
    
        }
      }
    } catch (err) {
      setMyError("fill form correctly");
    }

    // localStorage.setItem("user", JSON.stringify(form));
    // navigate("/");
  };

  return (
    <div className="SignupBackground relative min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <Link to="/">
          <img
            src={logo}
            className="w-40 h-auto mt-5 hover:cursor-pointer border-none"
            alt="logo"
          />
        </Link>
        {/* <div className="App">{isLoading ? <LoadingSpinner /> : ""}</div> */}
        <div className="col-lg-4 col-md-6 mt-10 col-sm-8 mx-auto ">
          <div className="p-6 shadow-lg mb-5 rounded-xl SignupForm">
            <form class="form-group" onSubmit={onSubmitHandler}>
              <CustomInput
                label="First Name"
                placeholder="first name"
                type="text"
                name="first_name"
                icon={<FaUser />}
                className="border rounded"
                onChange={onChangeHandler}
                // errors={errors.name}
              />
              <CustomInput
                label="Last Name"
                placeholder="last name"
                type="text"
                name="last_name"
                icon={<FaUser />}
                className="border rounded"
                onChange={onChangeHandler}
                // errors={errors.name}
              />
              <CustomInput
                label="Email"
                placeholder="name@exemple.com"
                type="text"
                name="email"
                icon={<FaEnvelope />}
                onChange={onChangeHandler}
                errors={errors.email}
              />
               <CustomInput
      label="Password1"
      placeholder="password"
      type={passwordVisible ? "text" : "password"}
      name="password1"
      icon={<FaLock />}
      onChange={onChangeHandler}
      errors={errors.password}
    />
    <button
      className="password-toggle-button text-center w-80 m-auto"
      type="button"
      onClick={togglePasswordVisibility}
    >
      {passwordVisible ? "Hide" : "Show"} Password
    </button>

    <CustomInput
      label="Confirm Password"
      placeholder="confirm password"
      type={passwordVisible ? "text" : "password"}
      name="password2"
      icon={<FaLock />}
      onChange={onChangeHandler}
      errors={errors.password}
    />
    <button
      className="password-toggle-button"
      type="button"
      onClick={togglePasswordVisibility}
    ></button>
              <p className="text-red-700 text-center font-semibold">
                {myError}
              </p>
              <button
                className=" bg-[#F90105] text-white hover:bg-gray-600 w-full relative inline-flex items-center justify-center px-2 md:px-4 py-2 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group hover:ring-4 hover:ring-purple-500"
                type="submit"
                disabled={isLoading}
              >
                Register
              </button>
              <div className="text-sm text-center mt-2">
                Already have an account? {FaEnvelope}{" "}
                <Link to="/signin">
                  <span className="font-bold no-underline">Sign in</span>
                </Link>{" "}
                here
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
