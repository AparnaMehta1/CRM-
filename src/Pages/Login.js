import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { userSignup, userSignin } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import videoBg from '../Styles/Video/video.mp4'
import {BsFacebook, BsTwitter, BsGithub, BsGoogle} from 'react-icons/bs';
import userIcon from '../Styles/user.svg'
import '../Styles/Login.css';

function Login() {
  const [signUp, setshowsignUp] = useState(false);
  const [userType, setuserType] = useState("SELECT");
  const [userSignupData] = useState({});
  const [message, setMessage] = useState("");

  const toggleSignUp = () => {
    setshowsignUp(!signUp);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
        const userTypes = localStorage.getItem("userTypes");
        redirectToHomePage(userTypes);
    }
}, []);

  const history = useNavigate();  
  const redirectToHomePage = (userTypes)=>{
    if (userTypes === "CUSTOMER") {
      history("/customer");
    } else if (userTypes === "ENGINEER") {
      history("/engineer");
    } else {
      history("/admin1");
    }
  }

  const updateSignupData = (e) => {
    userSignupData[e.target.id] = e.target.value;
    console.log(userSignupData);
  };
  //we are grabing the input value with id and storing it in an object
  const signupFn = (e) => {
    const username = userSignupData.username;
    const userId = userSignupData.userId;
    const email = userSignupData.email;
    const password = userSignupData.password;

    const data = {
      name: username,
      userId: userId,
      email: email,
      userTypes: userType,
      password: password,
    };
    console.log("DATA", data);
    e.preventDefault();

    userSignup(data)
      .then(function (response) {
        if (response === 201){
          history("/");
        }
      })
      .catch(function (error){
        if (error.response.status === 400){
          setMessage(error.response.data.message);
        }else{
          console.log(error);
        }
      });
  };
  

  const loginFn = (e) => {
    const userId = userSignupData.userId;
    const password = userSignupData.password;

    const data = {
      userId: userId,
      password: password,
    };
    console.log("DATA", data);
    e.preventDefault();

    userSignin(data)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          const {
            accessToken,
            email,
            name,
            userId,
            userStatus,
            userTypes,
            message,
        } = response.data;

        if(message){
          alert(message)
        }else{
          localStorage.setItem("name", name);
          localStorage.setItem("userId", userId);
          localStorage.setItem("email", email);
          localStorage.setItem("userTypes", userTypes);
          localStorage.setItem("userStatus", userStatus);
          localStorage.setItem("token", accessToken);

          redirectToHomePage(userTypes)
          }
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
   <div className="backGround">
      <video src={videoBg} autoPlay loop muted />
    </div>
    <div className="cards d-flex justify-content-center align-items-center vh-100">
      <div className="login m-5 p-5">
        <div className="signin">
          <div className="col">
          <center><img src={userIcon} /></center>
            {!signUp ? (
              <div className="login">
                <form onSubmit={loginFn}>
                  <h4 className="text text-center p-3"> Login</h4>
                  <div><input
                    className="form_input m-2 "
                    placeholder="User Id"
                    type="text"
                    id="userId"
                    onChange={updateSignupData}
                    required
                  /></div>
                  <div><input
                    className="m-2 "
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={updateSignupData}
                    required
                  /></div>
                  <button className="button fw-bolder m-2">
                    Login
                  </button>
                  <div
                    className="toggle text-center fw-bolder"
                    onClick={() => toggleSignUp()}
                  >
                    Not a member? Signup
                  </div>
                  <div className="text-warning text-center">{message}</div>
                </form>
                <div className="container mx-5">
                <BsGoogle className="social_icon" />
                <BsFacebook className="social_icon"/>
                <BsTwitter className="social_icon"/>
                <BsGithub className="social_icon"/>
                </div>
              </div>
            ) : (
              <div className="signup">
                <form onSubmit={signupFn}>
                  <h4 className="text text-center p-3"> Signup</h4>
                  <input
                    className="input-group m-2"
                    type="text"
                    placeholder="Enter your Name"
                    id="username"
                    onChange={updateSignupData}
                    required
                  />
                  <input
                    className="input-group m-2"
                    type="text"
                    placeholder="Enter your userId"
                    id="userId"
                    onChange={updateSignupData}
                    required
                  />
                  <input
                    className="input-group m-2"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    onChange={updateSignupData}
                    required
                  />
                  <input
                    className="input-group m-2"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={updateSignupData}
                    required
                  />
                  <div className="dropdown m-2">
                    <span className="usertype m-1">User Type</span>
                    <DropdownButton
                      align="end"
                      title={userType}
                      variant="transparent"
                      className="mx-2"
                      onSelect={(e)=>setuserType(e)}
                    >
                    <div className="dropdown_item"><Dropdown.Item eventKey="SELECT">
                        SELECT
                      </Dropdown.Item>
                    <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="ENGINEER">
                        ENGINEER
                      </Dropdown.Item></div>
                    </DropdownButton>
                  </div>
                  <button className="button m-2 d-flex justify-content-center align-items-center fw-bolder">
                    Signup
                  </button>
                  <div
                    className="toggle text-center fw-bolder"
                    onClick={() => toggleSignUp()}
                  >
                    Already a member? Login
                  </div>
                  <div className="text-warning text-center">{message}</div>
                </form>
                <div className="container mx-5">
                <BsGoogle className="social_icon" />
                <BsFacebook className="social_icon"/>
                <BsTwitter className="social_icon"/>
                <BsGithub className="social_icon"/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;