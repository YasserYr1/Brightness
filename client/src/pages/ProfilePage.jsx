import Nav from "../components/Nav"
import NavT from "../components/NavT"
import avatar from '../assets/images/avatar.png';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { value: 25, label: 'Total Student' },
  { value: 9, label: 'Total Teachers' },
  { value: 9, label: 'Total Subjects' },
  { value: 42, label: 'Total Exams' },
];

const ProfilePage = () => {
    const {user} = useContext(UserContext)
  return (
    <main className=' w-full h-screen flex bg-light'>
      <div className=' w-[20%]'>
        <Nav />
      </div>
      
      <div className=' flex-shrink-0 w-[80%] h-screen flex flex-col items-center justify-between '>
        <div className='w-full h-24 flex items-center justify-around'>
          <NavT />
        </div>
        <div className=' h-[85%] w-full flex flex-wrap items-start justify-center gap-3 '>
            <div className=" h-[95%] lg:w-[40%] w-full bg-white shadow rounded-3xl md:ml-8 ml-0 flex flex-col items-center justify-center gap-8">
                <div className=" w-[300px] h-[300px] rounded-full bg-white mt-2">
                    <img src={avatar} alt="" className=" w-full h-full rounded-full"/>
                </div>
                {user && (
                    <>
                        <h1 className=" text-3xl font-semibold text-dark font-montserrat mb-4">{user.name}</h1>
                        <p className="text-3xl text-dark font-montserrat mb-4">{user.email}</p>
                        <p className="text-3xl text-dark font-montserrat mb-4">**********</p>
                    </>
                )}
            </div>
            <div className="h-[95%] lg:w-[55%] w-full rounded-3xl flex items-center justify-center flex-col gap-4">
              <div className=" w-full h-full bg-white shadow rounded-3xl flex items-center justify-center">
                <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  },
                ]}
                height={300}
                />
              </div> 
            </div>
        </div>
      </div>
    </main>  
  )
}

export default ProfilePage