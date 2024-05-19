import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
import {useAuth} from "../store/auth";
import {toast} from 'react-toastify';

const Signup = () =>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
    });
    const navigate=useNavigate();
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
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(user);
        try{
            const response=await fetch(`${URL}/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(user),
            });
            const res_data=await response.json();
            console.log("res from  server",res_data);
            if(response.ok)
            {
                storetokenInLS(res_data.token);
                // localStorage.setItem('token',res_data);
                setUser({
                    username:"",
                    email:"",
                    password:"",
                });
                toast.success("registration successful");
                navigate("/login");
                console.log(response);
            }           
            else{
                toast.error(res_data.extraDetails);
            }
        }catch(error)
        {
            console.log("register",error);
        }
        
    };

    return(
        <div>
            <div className="container shadow my-5">
                <div className="row justify-content end">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
                        <h1 className="display-4 fw-bolder py-5">Welcome</h1>
                        <p className="lead text-center">Enter Your Details to Register</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to = "/login" className="btn btn-outline-light rounded-pill pb-2 w-50">Login</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">SIGN UP</h1>
                        <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                                <label htmlFor="name" class="form-label">
                                    Username
                                </label>
                                <input type="text" className="form-control" id="name" name="username" value={user.username} onChange={handleInput}/>
                               
                            </div>
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
                                <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={handleInput}/>
                            </div>
                            <button type="submit" class="btn btn-primary rounded-pill w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;