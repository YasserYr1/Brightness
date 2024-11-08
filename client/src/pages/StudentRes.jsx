import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Nav from "../components/Nav";
import NavT from "../components/NavT";

const StudentRes = () => {
    const {user, ready} = useContext(UserContext);
    const [studentData, setStudentData] = useState(null)
    const {studentId} = useParams();



    useEffect(() => {
        const fetchStudentInfo = async () => {
          try {
            if (user && ready) {
              const { data } = await axios.get(`/student/${studentId}`);
              if (data) {
                setStudentData(data);
              } else {
                console.log('no data in here');
              }
            }
          } catch (error) {
            console.error("Error fetching student information:", error);
          }
        };
        fetchStudentInfo();
      }, [studentId, user, ready]);


      
    if (!ready || user === null || studentData === null) {
        return <div role="status" className=" flex items-center justify-center h-screen w-full">
        <svg aria-hidden="true" class="flex items-center justify-center w-12 h-12 text-gray-200 animate-spin fill-como" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
    }

    const coefficient = 37;
    const math = studentData.totalScoress[0].value * 7;
    const physics = studentData.totalScoress[1].value * 7;
    const science = studentData.totalScoress[2].value * 7;
    const arab = studentData.totalScoress[3].value * 2;
    const french = studentData.totalScoress[4].value * 4;
    const english = studentData.totalScoress[5].value * 2;
    const history = studentData.totalScoress[6].value * 2;
    const islamic = studentData.totalScoress[7].value * 2;
    const sport = studentData.totalScoress[8].value * 4;
    const results = (math + physics + science + arab + french + english + history + islamic + sport)/ coefficient

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
          <div className=" w-[98%] h-16 flex items-center justify-between">
            <h1 className="pl-10 font-semibold text-2xl font-montserrat">{studentData.studentName}</h1>
            <h1 className="pr-10 text-2xl font-medium font-montserrat"><span className=" font-semibold">Results: </span>{results.toFixed(2)}</h1>
          </div>  
          <div className=' w-[98%] h-auto bg-white shadow shadow-gray-300 mt-2 rounded-3xl flex items-center justify-start flex-col overflow-x-auto'>
            {user && (
                <div class="relative overflow-x-auto w-full">
                    {studentData && (
                    <table class="w-full font-roboto">
                        <thead class=" text-white uppercase bg-como text-xl">
                            <tr className=" text-center">
                                <th scope="col" class="px-6 py-5">
                                    Subject
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Exam 1
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Exam 2
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Exam 3
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Final Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    Math
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[0].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[0].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[0].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[0].value.toFixed(2)}
                                </td>
                            </tr>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    Physics
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[1].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[1].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[1].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[1].value.toFixed(2)}
                                </td>
                            </tr>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    Science
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[2].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[2].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[2].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[2].value.toFixed(2)}
                                </td>
                            </tr>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    Arab
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[3].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[3].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[3].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[3].value.toFixed(2)}
                                </td>
                            </tr>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    French
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[4].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[4].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[4].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[4].value.toFixed(2)}
                                </td>
                            </tr>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    English
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[5].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[5].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[5].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[5].value.toFixed(2)}
                                </td>
                            </tr>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    History
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[6].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[6].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[6].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[6].value.toFixed(2)}
                                </td>
                            </tr>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    islamic
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[7].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[7].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[7].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[7].value.toFixed(2)}
                                </td>
                            </tr>
                            <tr class="bg-white border-b text-xl text-center">
                                <th scope="row" class="px-6 py-4 whitespace-nowrap font-semibold">
                                    Sport
                                </th>
                                <td class="px-6 py-4">
                                    {studentData.scoress[8].values[0]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[8].values[1]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.scoress[8].values[2]}
                                </td>
                                <td class="px-6 py-4">
                                    {studentData.totalScoress[8].value.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>)}
                </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default StudentRes