import { Route, Routes } from "react-router-dom"
import axios from "axios"
import Login from "./pages/Login.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import Class from "./pages/Class.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import StudentRes from "./pages/StudentRes.jsx";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
    <Routes>
      <Route path={'/'} element={<Login />} />
      <Route path={'/home'} element={<IndexPage />} />
      <Route path={'/class/:classId'} element={<Class />} />
      <Route path={'/profile'} element={<ProfilePage />} /> 
      <Route path={'/results'} element={<ResultsPage />} />
      <Route path={'/student/:studentId'} element={<StudentRes />} />
    </Routes>
  )
}

export default App
