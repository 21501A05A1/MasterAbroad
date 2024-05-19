import {createContext,useContext} from "react";
import React,{useState,useEffect} from 'react';
export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [userId,setId]=useState(localStorage.getItem("userId"));
    const [user,setUser]=useState('');
    const [username,setUsername]=useState([]);
    const [isLoading,setIsLoading]=useState(true)
    const [posts,setPosts]=useState([]);
    const [myposts,setMyPosts]=useState([]);
    const authorizationToken=`Bearer ${token}`;

     const URL=process.env.REACT_APP_URL;

    const storetokenInLS=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem('token',serverToken);
    };
    const storeidInLS=(serverid)=>{
      setId(serverid);
      return localStorage.setItem('userId',serverid);
  };
   let isLoggedIn=!!token;
   console.log('isLoggedIn',isLoggedIn);
  const LogoutUser=()=>{
         setToken("");
         setId("");
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          return;
         
    };

  const userAuthentication=async()=>{
     try{
      setIsLoading(true);
        const response=await fetch(`${URL}/api/auth/user`,
        {
          method:"GET",
          headers:{
            Authorization:authorizationToken,
          },
        })
      if(response.ok)
      {
        const data=await response.json();
        console.log("userdata ",data.userData);
        storeidInLS(data.userData.userId);
        setUser(data.userData);
        setIsLoading(false)
      }
      else{
        console.error("error fetching user data")
        setIsLoading(false)
      }
     }catch(error)
     {
      console.error("error fetching user data");
     }
  }

 
const getPosts = async () => {
  try {
    const response = await fetch(`${URL}/api/post/sharexperiences/visapost`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Posts:", data.msg); // Log fetched posts
      setPosts(data.msg);
    } else {
      console.error("Failed to fetch posts:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};


const getMyPosts = async () => {
  try {
    const id = localStorage.getItem('userId');
   
    const response = await fetch(`${URL}/api/post/sharexperiences/getblog/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type":"application/json",
        
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("posts",data);
      if(data && data.username){
        console.log(data.username);
        setUsername(data.username);
      }
      if (Array.isArray(data.blogs)) {
        
        setMyPosts(data.blogs);
      } else {
        console.error('Data format error: msg is not an array');
      }
    } else {
      console.error('Failed to fetch posts:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
useEffect(()=>{
  getPosts();
  userAuthentication();
},[])

useEffect(()=>{
  if(userId){
    getMyPosts();
  }
},[userId])
return (
<AuthContext.Provider value={{isLoggedIn,storetokenInLS,storeidInLS,username,LogoutUser,user,setPosts,getPosts,posts,myposts,authorizationToken,isLoading,getMyPosts,URL}}>
{children}
</AuthContext.Provider>
);
};
export const useAuth=()=>{
  const AuthContextValue=useContext(AuthContext);
  if(!AuthContextValue){
      throw new Error("useAuth used outside of the provider");
  }
  return AuthContextValue;
}


