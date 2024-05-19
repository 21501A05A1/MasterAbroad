import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts=()=>{
    const [contactData,setContactData]=useState([])
    const { authorizationToken,URL } = useAuth();
    const getContactsData=async()=>{
        try{
          const response=await fetch(`${URL}/api/admin/contacts`,{
            method:"GET",
            headers:{
                Authorization:authorizationToken
            }
          })
          const data=await response.json()
          console.log("contact data",data);
          if(response.ok)
          {
            setContactData(data)
          }
        }catch(error){
            console.log(error)
        }
    }
    const deleteContactById=async(id)=>{
        try {
            const response = await fetch(`${URL}/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: authorizationToken,
                },
              });
            //   const data = await response.json();
            //   console.log(`users after deleted ${data}`)
              if(response.ok)
            {
                getContactsData();
            }
          } catch (error) {
            console.log(error);
          }
    
      }
    

    useEffect(()=>{getContactsData()},[])
    return(
        <>
        <section className="admin-users-section">
        <div className="container">
          <h1>Admin Contact Data</h1>
        </div>
        <div className="container admin-users">
          <table className="table">
            {/* <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Phone</th> */}
                {/* <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead> */} 
            <tbody>
              {contactData.map((curContactData, index) => {
                const {_id}=curContactData
                return (
                  <tr key={index}>
                    <td>{curContactData.username}</td>
                    <td>{curContactData.email}</td>
                    <td>{curContactData.message}</td>
                  
                    <td><button onClick={()=>deleteContactById(_id)}>delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
        </>
    )
}