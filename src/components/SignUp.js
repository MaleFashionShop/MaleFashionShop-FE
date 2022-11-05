import React, { useState } from "react";
import { useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import SetCookie from "../token/setCookie";
import GetCookie from "../token/getCookie";
import RemoveCookie from "../token/removeCookie";
import {
    BiLockAlt
} from "react-icons/bi";
import axios from "axios";

function Login() {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {

            console.log(user,pwd );
            const response = await axios.post('http://localhost:8080/api/auth/signin', 
                { username: user, password: pwd, role: "user"}
                // { withCredentials: true}
            );
            RemoveCookie('usrin');
            SetCookie('usrin', JSON.stringify(response.data));
            console.log("---------2222222222222-------------");
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));

            const accessToken = response?.data?.accessToken;
            console.log(accessToken);
            const roles = response?.data?.roles;
            console.log(roles);
            setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('')
            setSuccess(true);

        } catch (error) {
            if(!error?.response){
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400){
                setErrMsg('Missing Username of Password')
            } else if (error.response?.status === 401){
                setErrMsg('Unauthorized');
            } else{
                setErrMsg(error)
            }
            errRef.current.focus();
        }
        
    }

  return (
    <>
      <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name" />

                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />

                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    </>
  );
}

export default Login;
