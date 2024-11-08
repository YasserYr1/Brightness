import { BiLogOut } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { FaClipboardList } from "react-icons/fa";
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


//bg-[#fafafa44]
const Nav = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout(){
    await axios.post('/logout');
    navigate('/');
    setUser(null);

}

  return (
    <header className="fixed box-border flex items-center justify-center top-0 left-0 w-[20%] h-screen shadow bg-como ">
        <nav className="w-full h-full flex flex-col lg:items-start items-center justify-between lg:pl-8 pl-0">
            <h1 className="text-3xl font-bold font-roboto text-titleColor pt-16"><span className=' lg:flex hidden'>BRIGHTNESS</span> <span className=' lg:hidden flex'>BRS</span></h1>

            <ul className=" flex flex-col lg:items-start items-center justify-start gap-10 w-full">
                <li><Link to={'/home'} className=" font-montserrat text-2xl font-semibold text-white flex items-center justify-center gap-3 hover:opacity-80 duration-300 transition-opacity ease-linear"><AiFillHome className=' text-4xl'/><span className=' pt-2 lg:flex hidden'>Home</span></Link></li>
                <li><Link to={'/profile'} className=" font-montserrat text-2xl font-semibold text-white flex items-center justify-center gap-3 hover:opacity-80 duration-300 transition-opacity ease-linear"><FaUser className=' text-4xl'/><span className=' pt-2 lg:flex hidden'>Profile</span></Link></li>
                <li><Link to={'/results'} className=" font-montserrat text-2xl font-semibold text-white flex items-center justify-center gap-3 hover:opacity-80 duration-300 transition-opacity ease-linear"><FaClipboardList className=' text-4xl'/><span className=' pt-2 lg:flex hidden'>Results</span></Link></li>
            </ul>
            
            <button onClick={logout} className="flex items-center justify-center gap-2 font-montserrat text-2xl font-semibold text-red-400 pb-16"><BiLogOut className=' text-4xl' /><span className=' lg:flex hidden'>Logout</span></button>
        </nav>
    </header>
  )
}

export default Nav