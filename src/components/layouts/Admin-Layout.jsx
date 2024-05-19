import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#adminNavbarSupportedContent" // Unique target identifier
              aria-controls="adminNavbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="adminNavbarSupportedContent"> {/* Unique collapse identifier */}
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/contacts">
                    Contacts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/posts">
                    Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/home">
                    Home
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <Outlet />
      
      <style jsx>{`
        header {
          padding: 20px 0;
        }
        .container {
          width: 100%;
          margin: 0 auto;
        }
        .navbar-nav {
          margin-right: auto;
        }
        .nav-item {
          margin-right: 10px;
        }
        @media (max-width: 768px) {
          .nav-link {
            font-size: 14px;
          }
          .navbar-nav {
            flex-direction: column;
          }
          .nav-item {
            margin: 5px 0;
          }
          .navbar-collapse {
            justify-content: flex-start; /* Align items to the start on small screens */
          }
        }
      `}</style>
    </>
  );
};

export default AdminLayout;
