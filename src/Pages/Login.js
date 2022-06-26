import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { userSignup, userSignin } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import videoBg from '../Styles/Video/video.mp4'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import userIcon from '../Styles/user.svg'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import '../Styles/Login.css';

function Login() {
  const [signUp, setshowsignUp] = useState(false);
  const [userType, setuserType] = useState("CUSTOMER");
  const [userSignupData, setUserSignupData] = useState({});
  const [message, setMessage] = useState("");

  const toggleSignUp = () => {
    setshowsignUp(!signUp);
  };

  //here we are changing the state for userTypes on select
  const handleSelect = (e) => {
    setuserType(e);
  };

  const updateSignupData = (e) => {
    userSignupData[e.target.id] = e.target.value;
    console.log(userSignupData);
  };
  //we are grabing the input value with id and storing it an object
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

    //what is the data here
    userSignup(data)
      .then(function (response) {
        if (response === 201) {
          history(0);
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
  const history = useNavigate();

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
          //why we are setting the data in localStorage in login fn??
          //userId, email, userType, userStatis, token
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("userTypes", response.data.userTypes);
          localStorage.setItem("userStatus", response.data.userStatus);
          //what is token??
          localStorage.setItem("token", response.data.accessToken);

          if (response.data.userTypes === "CUSTOMER") {
            history("/customer");
          } else if (response.data.userTypes === "ENGINEER") {
            history("/engineer");
          } else {
            history("/admin");
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

  const gmailLogin=()=>{
    window.location.href('https://accounts.google.com/ServiceLogin/signinchooser?service=mail&passive=1209600&osid=1&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin')
  }
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
                  <input
                    className="form_input m-2 form-control"
                    placeholder="Enter Your User Id"
                    type="text"
                    id="userId"
                    onChange={updateSignupData}
                    required
                  />
                  <input
                    className="m-2 form-control"
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={updateSignupData}
                    required
                  />
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
                <GoogleIcon className="social_icon" onClick={gmailLogin}/>
                <FacebookIcon className="social_icon"/>
                <TwitterIcon className="social_icon"/>
                <GitHubIcon className="social_icon"/>
                </div>
              </div>
            ) : (
              <div className="signup">
                <form onSubmit={signupFn}>
                  <h4 className="text text-center p-3"> Signup</h4>
                  <input
                    className="input-group m-2 form-control"
                    type="text"
                    placeholder="Enter your Name"
                    id="username"
                    onChange={updateSignupData}
                    required
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="text"
                    placeholder="Enter your userId"
                    id="userId"
                    onChange={updateSignupData}
                    required
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    onChange={updateSignupData}
                    required
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={updateSignupData}
                    required
                  />
                  <div className="input-group m-2 form-control bg-dark">
                    <span className="text-light">User Type</span>
                    <DropdownButton
                      align="end"
                      title={userType}
                      variant="dark"
                      className="mx-2"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="ENGINEER">
                        ENGINEER
                      </Dropdown.Item>
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