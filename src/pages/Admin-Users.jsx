 import { useEffect, useState } from "react";
 import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken,URL } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${URL}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser=async(id)=>{
    try {
        const response = await fetch(`${URL}/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: authorizationToken,
            },
          });
          const data = await response.json();
          console.log(`users after deleted ${data}`)
          if(response.ok)
        {
            getAllUsersData();
        }
      } catch (error) {
        console.log(error);
      }

  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Phone</th> */}
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                  
                    {/* <td>{curUser.phone}</td> */}
                    <td><Link to={`/admin/users/${curUser._id}/edit`}>edit</Link></td>
                    <td><button onClick={()=>deleteUser(curUser._id)}>delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

// export const AdminUsers = () => {
//   const [users, setUsers] = useState([]);

//   const { authorizationToken } = useAuth();

//   const getAllUsersData = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/admin/users", {
//         method: "GET",
//         headers: {
//           Authorization: authorizationToken,
//         },
//       });
//       const data = await response.json();
//       console.log(data);
//       setUsers(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllUsersData();
//   }, []);

//   return (
//     <div>
//       {users.length > 0 ? (
//         users.map((curUser, index) => {
//           return <h2 key={index}>{curUser.username}</h2>;
//         })
//       ) : (
//         <p>No users found</p>
//       )}
//     </div>
//   );
// };