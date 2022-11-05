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
                { username: user, password: pwd}
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
      {success ? (
        <section>
          <h1> You are logged in!</h1>
          <br />
          <p>
            <a href="/">Go to Home</a>
          </p>
        </section>
      ) : (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="username"
                  ref={userRef}
                  name="email"
                  type="text"
                  autoComplete="email"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BiLockAlt className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
          <div class="text-grey-dark mt-6">
            Not a member yet?
            <a  class="no-underline border-b border-blue text-blue" href="../login/">
                  Sign Up
            </a>.
        </div>
        </div>
        
      </div>
      
      )}
    </>
  );
}

export default Login;
