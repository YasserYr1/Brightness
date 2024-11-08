import { useContext, useState } from 'react';
import background from '../assets/images/background.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setUser} = useContext(UserContext)

  const navigate = useNavigate();

  const login = async() => {
    try{
      const {data} = await axios.post('/login', { email, password })
      setUser(data);
      alert('Logged in successfully');
      navigate('/home');
    }catch(err){
      console.error(err)
      alert('Verify your informations!');
    }
    
  }


  return (
    <div className=' lg:h-screen h-[200%] w-full flex lg:flex-row flex-col-reverse lg:gap-0 gap-8'>
      <div className=' lg:w-[40%] w-full lg:h-full h-screen flex flex-col justify-between items-center bg-como'>
        <h1 className=' text-5xl font-bold font-roboto text-titleColor pt-24'>BRIGHTNESS</h1>
        <img src={background} alt="background" />
        <p className=' text-2xl text-titleColor font-montserrat pb-24'>Easy life for teachers and students</p>
      </div>
      <div className=' lg:w-[60%] w-full lg:h-full h-screen flex flex-col justify-center items-center gap-8'>
        <h1 className=' text-4xl font-semibold text-black font-montserrat'>Login</h1>
        <div className=' flex flex-col gap-3 mt-8'>
          <label htmlFor="email" className=' text-2xl font-montserrat'>Email: </label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className=' w-[500px] h-12 border border-black rounded-3xl px-9 text-2xl text-slate-700' />
        </div>
        <div className='flex flex-col gap-3 mt-4'>
          <label htmlFor="password" className=' text-2xl font-montserrat'>Password: </label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className=' w-[500px] h-12 border border-black rounded-3xl px-9 text-2xl text-slate-700' />
        </div>
        <button onClick={login} className=' w-[500px] h-14 flex items-center justify-center bg-como rounded-3xl text-2xl font-bold text-white mt-8'>Continue</button>
      </div>  
    </div>
  )
}

export default Login