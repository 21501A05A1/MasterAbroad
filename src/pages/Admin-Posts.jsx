import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

function AdminPosts() {
    const [postData, setPostData] = useState([])
    const { authorizationToken, URL ,username} = useAuth();

    const getPostsData = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/posts`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const data = await response.json();
            console.log("post data", data);
            if (response.ok) {
                setPostData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (id) => {
        try {
            const response = await fetch(`${URL}/api/admin/posts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`posts after deleted ${data}`);
            if (response.ok) {
                getPostsData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostsData();
    }, []);

    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Post Data</h1>
                </div>
                <div className="container admin-users">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ObjectId</th>
                                <th>User</th>
                                <th>CreatedTime</th>
                                <th>About</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postData.map((curPostData, index) => (
                                <tr key={index}>
                                    <td>{curPostData._id}</td>
                                    <td>{curPostData.user ? curPostData.user : "Unknown"}</td>
                                    <td>{curPostData.createdAt}</td>
                                    <td>{curPostData.about}</td>
                                    <td><button onClick={() => deletePost(curPostData._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <style jsx>{`
                .admin-users-section {
                    padding: 20px;
                }
                .container {
                    width: 100%;
                    margin: 0 auto;
                }
                .table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 8px;
                    border-bottom: 1px solid #ddd;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                @media (max-width: 768px) {
                    /* Adjust table layout for smaller screens */
                    th, td {
                        padding: 6px;
                    }
                    button {
                        padding: 5px 10px;
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </>
    );
}

export default AdminPosts;
