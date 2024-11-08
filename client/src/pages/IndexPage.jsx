import React, { useContext } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineClass } from 'react-icons/md';
import { PiNotebookDuotone, PiMathOperationsBold } from 'react-icons/pi';
import { BsPencil } from 'react-icons/bs';
import { LiaSchoolSolid } from 'react-icons/lia';
import Nav from '../components/Nav'
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import NavT from '../components/NavT';

const IndexPage = () => {
  const {user, ready} = useContext(UserContext);
  const navigate = useNavigate()

  if (!ready){
    return <div role="status" className=" flex items-center justify-center h-screen w-full">
    <svg aria-hidden="true" class="flex items-center justify-center w-12 h-12 text-gray-200 animate-spin fill-como" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
  }

  if (!user){
    navigate('/')
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
        <div className=' h-[85%] w-full flex items-center justify-center flex-col gap-3'>
          <div className=' w-[98%] h-[50vh] bg-white shadow shadow-gray-300 mt-2 rounded-3xl flex items-center justify-around flex-col'>
            <div className=' flex items-center justify-around mt-8 w-full'>

              <div className=' flex justify-center items-center gap-2'>
                <div className=" rounded-full w-16 h-16 bg-slate-50 ring-2 ring-como flex justify-center items-center">
                  <AiOutlineUser className=" text-5xl text-como"/>
                </div>
                <div className=' flex flex-col justify-center items-start ml-2 gap-2'>
                  <h1 className=' text-xl text-dark font-semibold'>Students</h1>
                  <p className=' text-xl text-dark font-bold'>{user.classes.map(cls => cls.students[0].length + 1)}</p>
                </div>
              </div>
              <div className=' flex justify-center items-center gap-2'>
                <div className=" rounded-full w-16 h-16 bg-slate-50 ring-2 ring-como flex justify-center items-center">
                  <MdOutlineClass className=" text-5xl text-como"/>
                </div>
                <div className=' flex flex-col justify-center items-start ml-2 gap-2'>
                  <h1 className=' text-xl text-dark font-semibold'>Classes</h1>
                  <p className=' text-xl text-dark font-bold'>{user.classes.length}</p>
                </div>
              </div>
              <div className=' flex justify-center items-center gap-2'>
                <div className=" rounded-full w-16 h-16 bg-slate-50 ring-2 ring-como flex justify-center items-center">
                  <BsPencil className=" text-5xl text-como"/>
                </div>
                <div className=' flex flex-col justify-center items-start ml-2 gap-2'>
                  <h1 className=' text-xl text-dark font-semibold'>Exams</h1>
                  <p className=' text-xl text-dark font-bold'>{(user.subject.subjectName === "Math" || "Physics" || "Science") && (
                    <span>3</span>
                  )}</p>
                </div>
              </div>
            </div>

            <div className=' flex items-center justify-around mb-8 w-full'>
              <div className=' flex justify-center items-center gap-2'>
                <div className=" rounded-full w-16 h-16 bg-slate-50 ring-2 ring-como flex justify-center items-center">
                  <LiaSchoolSolid className=" text-5xl text-como"/>
                </div>
                <div className=' flex flex-col justify-center items-start ml-2 gap-2'>
                  <h1 className=' text-xl text-dark font-semibold'>Subject</h1>
                  <p className=' text-xl text-dark font-bold'>{user.subject.subjectName}</p>
                </div>
              </div>
              <div className=' flex justify-center items-center gap-2 '>
                <div className=" rounded-full w-16 h-16 bg-slate-50 ring-2 ring-como flex justify-center items-center">
                  <PiNotebookDuotone className=" text-5xl text-como"/>
                </div>
                <div className=' flex flex-col justify-center items-start ml-2 gap-2'>
                  <h1 className=' text-xl text-dark font-semibold'>Modules</h1>
                  <p className=' text-xl text-dark font-bold'>{(user.subject.subjectName === "Math" || "Physics" || "Science") && (
                    <span>3</span>
                  )}</p>
                </div>
              </div>
              <div className=' flex justify-center items-center gap-2'>
                <div className=" rounded-full w-16 h-16 bg-slate-50 ring-2 ring-como flex justify-center items-center">
                  <PiMathOperationsBold className=" text-5xl text-como"/>
                </div>
                <div className=' flex flex-col justify-center items-start ml-2 gap-2'>
                  <h1 className=' text-xl text-dark font-semibold'>coefficient</h1>
                  <p className=' text-xl text-dark font-bold'>{(user.subject.subjectName === "Math" || "Physics" || "Science") && (
                    <span>7</span>
                  )}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=' w-[98%] h-[50vh] bg-white shadow shadow-gray-300 mb-8 rounded-xl flex flex-col overflow-scroll'>
          {user && (
            user.classes.map((classItem, index) => (
              <div key={classItem._id} className='w-full h-1/3 border-b flex items-center justify-between'>
                <h1 className='text-3xl font-semibold text-dark ml-12'>Class {index+1}</h1>
                <Link to={`/class/${classItem._id}`} className='bg-como text-white text-2xl py-3 px-8 rounded-3xl mr-12'>View</Link>
              </div>
            ))
          )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default IndexPage