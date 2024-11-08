import { useContext, useEffect, useState } from "react"
import Nav from "../components/Nav"
import NavT from "../components/NavT"
import { UserContext } from "../context/UserContext"
import { Link } from "react-router-dom"
import axios from "axios"

const ResultsPage = () => {
    const {user, ready} = useContext(UserContext);
    const [students, setStudents] = useState([])
    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (user && ready) {
            const response = await axios.get('/students', { params: { userId: user._id } });
            setStudents(response.data);
          }
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
  
      fetchData();
    }, [user, ready]);

    if(!ready || user === null){
      return <span class="sr-only">Loading...</span>
    }

  
  return (
    <main className=' w-full h-screen flex bg-light'>
      <div className=' w-[20%]'>
        <Nav />
      </div>
      
      <div className=' flex-shrink-0 w-[80%] h-screen flex flex-col items-center justify-between '>
        <div className='w-full h-24 flex items-center justify-around'>
          <NavT />
        </div>
        <div className='h-[85%] w-full flex items-center justify-center flex-col gap-3 '>
          <div className=' w-[98%] h-full bg-white shadow shadow-gray-300 mt-2 rounded-3xl flex items-center justify-start flex-col overflow-x-auto'>
            {user && (
              students.map((student, index) => (
                <div key={student._id} className='w-full h-[18%] border-b flex items-center justify-between'>
                  <div className=" flex items-center justify-center gap-3">
                    <h1 className='text-3xl font-semibold text-dark ml-12'>{index +1}</h1>
                    <h1 className='text-2xl font-semibold font-montserrat text-dark ml-12'>{student.studentName}</h1>
                  </div>
                  <Link to={`/student/${student._id}`} className='bg-como text-white text-2xl py-3 px-8 rounded-3xl mr-12 my-4'>results</Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResultsPage