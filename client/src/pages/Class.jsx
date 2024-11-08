import Nav from "../components/Nav"
import NavT from "../components/NavT"
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext"

const Class = () => {
  const {user, ready} = useContext(UserContext);
  const [classData, setClassData] = useState([])

  const {classId} = useParams();
  useEffect(() => {
    const fetchClassInfo = async () => {
      try {
        if (user && ready) {
          const response = await axios.get(`/class/${classId}`, { params: { userId: user._id } });
          if (response){
            setClassData(response.data.map(student => ({
              ...student,
              scoress: student.scoress.map(score => ({
                subject: score.subject,  // Assuming the subject field is available in the response
                values: score.values,
              })),
              totalScoress: student.totalScoress.map(totalS => ({
                subject: totalS.subject,
                value: totalS.value,
              })),
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching class information:", error);
      }
    };

    fetchClassInfo();
  }, [user, ready, classId]);

  const handleScoreChange = async (studentId, examNumber, score) => {
    try {
      if (score.trim() === '' || !/^-?\d+(?:\.\d{1,2})?$/.test(score) || score>21 || score<0) {
        score = 0;
      }else{
          await axios.post('/update-scores', {
          studentId,
          examNumber,
          score,
          userId: user._id 
        });
        setClassData(prevClassData =>
          prevClassData.map(student =>
            student._id === studentId
              ? {
                  ...student,
                  scoress: student.scoress.map(
                    (s, index) => (index === examNumber - 1 ? { subject: s.subject, values: [score] } : s || { subject: s.subject, values: [0] })
                  ),
                }
              : student
          )
        );
      }


    } catch (error) {
      console.error('Error updating scores:', error);
    }
  };

  return (
    <main className=' w-full h-screen flex bg-light'>
        <div className=' w-[20%]'>
          <Nav />
        </div>

        <div className=' flex-shrink-0 w-[80%] h-screen flex flex-col items-center justify-between '>
          <div className='w-full h-24 flex items-center justify-around'>
            <NavT />
          </div>
          <div className=' h-[85%] w-full flex items-center justify-start flex-col gap-3'>
            <div className="relative rounded-3xl shadow w-[98%] overflow-x-auto">
                <table className="w-full text-dark  ">
                    <thead className="text-xl text-white uppercase bg-como ">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-center">
                              #
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                              Student Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                              Exam 1
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                              Exam 2
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                              Exam 3
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(classData) && (
                        classData.map((stu, index) => (
                          <tr key={stu._id} className="bg-white text-xl border-b text-dark ">
                            <td scope="row" className="px-6 py-4 text-center">
                                {index+1}
                            </td>
                            <td scope="row" className="px-6 py-4 text-center">
                                {stu.studentName}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <input type="text"  className=" border rounded-lg border-como w-14 h-11 text-xl text-center" defaultValue={stu.scoress[user && user.num].values[0]} onChange={(e) =>handleScoreChange(stu._id, 1, parseFloat(e.target.value, 10).toFixed(2))} />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <input type="text"  className=" border rounded-lg border-como w-14 h-11 text-xl text-center" defaultValue={stu.scoress[user && user.num].values[1]} onChange={(e) =>handleScoreChange(stu._id, 2, parseFloat(e.target.value, 10).toFixed(2))} />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <input type="text"  className=" border rounded-lg border-como w-14 h-11 text-xl text-center" defaultValue={stu.scoress[user && user.num].values[2]} onChange={(e) =>handleScoreChange(stu._id, 3, parseFloat(e.target.value, 10).toFixed(2))} />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    </main>
  )
}

export default Class