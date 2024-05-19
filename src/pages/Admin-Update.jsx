import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: ""
    });
    const params = useParams();
    const { authorizationToken,URL } = useAuth();

    const getSingleUserData = async () => { // No need to pass id here
        try {
            const response = await fetch(`${URL}/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const userData = await response.json();
            setData(userData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData(); // No need to pass id here
    }, [params.id]); // useEffect will re-run when params.id changes

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit=async(e)=>{
       e.preventDefault();
       try{
       const response=await fetch(`${URL}/api/admin/users/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type":"application/json",
          Authorization: authorizationToken,
        },
        body:JSON.stringify(data)
      });
      if(response.ok){
      toast.success("updated successfully")
      }else{
        toast.error("not updated successfully") 
      }
       }catch(error)
       {
        console.log(error)
       }

    }
    return (
        <div>
            <section id="contact">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h3 className="fs-5 text-center mb-0">Update user data</h3>
                            <hr className="w-25 mx-auto" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="username"
                                        value={data.username}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        name="email"
                                        value={data.email}
                                        onChange={handleInput}
                                    />
                                </div>
                                <button type="submit" className="btn btn-outline-primary rounded-pill px-4">Update <i className="fa fa-paper-plane ms-2"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
