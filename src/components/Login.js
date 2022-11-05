import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import SetCookie from '../token/setCookie';
import GetCookie from '../token/getCookie';
import RemoveCookie from '../token/removeCookie';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';

import axios from 'axios';
const LOGIN_URL = 'api/auth/signin/';


const Login = () => {
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
            <br/>
            <p>
                <a href='/'>Go to Home</a>
            </p>
        </section>
    ) :(
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' id="username" ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                />

                <label htmlFor='password'>Password:</label>
                <input type='password' id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br/>
                <span className='line'>
                    <a href='#'>Sign Up</a>
                </span>
            </p>
        </section>
        )
        
    }
    </>
  )
}

export default Login