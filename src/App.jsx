import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route,Navigate}from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Admit_Eligibility from './pages/Admit_Eligibility';
import Sharexperiences from './pages/Sharexperiences'
import Admitprocess from './pages/Admitprocess';
import Login from './pages/Login';
import {Logout} from './pages/Logout';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Navbar from  './pages/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLayout from './components/layouts/Admin-Layout';
import { AdminUsers } from './pages/Admin-Users';
import { AdminContacts } from './pages/Admin-Contacts';
import { AdminUpdate } from './pages/Admin-Update';
import AdminPosts from './pages/Admin-Posts';
import {Visapost} from './pages/Visapost';
import Myposts from './pages/Myposts';
import Admission from './pages/Admission';
import Scholarships from './pages/Scholarships';
import CreateNewPost from './pages/CreateNewPost';
import Footer from './pages/Footer';
import {useAuth} from "./store/auth";
function App() {
  const {isLoggedIn}=useAuth();
  return (
    <>
     <BrowserRouter>
     <Navbar/>
      <Routes>
      <Route path="/" element={[<Home/>,<About/>,<Contact/>,<Footer/>]} />
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/login" element={[<Login />,<Footer/>]}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="/signup" element={[<Signup />,<Footer/>]}/>
      <Route path="/admiteligibility" element={<Admit_Eligibility/>}/>
      <Route path="/admitprocess" element={<Admitprocess />}/>
      <Route path="/sharexperiences" element={[<Sharexperiences/>]}>
      <Route path="visapost" element={<Visapost/>}/>
         <Route path="scholarships" element={<Scholarships/>}/>
         <Route path="admission" element={<Admission/>}/>
         <Route path="/sharexperiences/createnewpost" element={isLoggedIn ? <CreateNewPost /> : <Navigate to="/login" />} />
         <Route path="/sharexperiences/myposts" element={isLoggedIn ? <Myposts /> : <Navigate to="/login" />}/>
      </Route>
     
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="contacts" element={<AdminContacts/>}/>
        <Route path='users/:id/edit' element={<AdminUpdate/>}/>
        <Route path='posts' element={<AdminPosts/>}/>
      </Route>
     </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;