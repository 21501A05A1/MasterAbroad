import React,{useState} from 'react';
import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../store/auth";
import {toast} from 'react-toastify';

const Login = () =>{
    const [user,setUser]=useState({
                email:"",
                password:"",
            });
     const {storetokenInLS,URL}=useAuth();
    const handleInput=(e)=>{
                console.log(e);
                let name=e.target.name;
                let value=e.target.value;
                setUser({
                    ...user,
                    [name]:value,
                });
                
    };
    const navigate=useNavigate();
        const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${URL}/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(user),
            });
            if(response.ok)
            {
                const res_data=await response.json();
                console.log("res from  server",res_data);
                storetokenInLS(res_data.token);
              
                //  localStorage.setItem('token',res_data.token);
                //   localStorage.setItem('userId',res_data.response._id);
                setUser({
                    email:"",
                    password:"",
                });
                toast.success("login successful");
                navigate("/");
            }
            else{
                toast.error("invalid credentials");
                console.log("invalid credentials");
            }
            console.log(response);
        }catch(error)
        {
            console.log("login",error);
        }
        
    };
    return(
        <div>
            <div className="container shadow my-5">
                <div className="row justify-content end">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                        <h1 className="display-4 fw-bolder py-5">Welcome Back</h1>
                        <p className="lead text-center">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to = "/SignUp" className="btn btn-outline-light rounded-pill pb-2 w-50">Register</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label htmlFor="exampleInputEmail1" class="form-label">
                                    Email address
                                </label>
                                <input type="email" class="form-control" id="exampleInputEmail1" name="email" value={user.email} onChange={handleInput} aria-describedby="emailHelp"/>
                                <div id="emailHelp" class="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">
                                    Password
                                </label>
                                <input type="password" class="form-control" name="password" value={user.password} onChange={handleInput} id="exampleInputPassword1"/>
                            </div>
                           
                            <button type="submit" class="btn btn-primary rounded-pill w-100">
                                login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
