import * as React from "react";
import { Home } from "./components/home/home";
import "bootstrap/dist/css/bootstrap.css";
import { Login } from "./components/login/login";
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

<<<<<<< HEAD
=======
// import EditSociety from "./components/society/edit.component";
// import SocietyList from "./components/society/list.component";
// import CreateSociety from "./components/society/create.component";
// import Index from "./components";
// import DepartmentList from "./components/department/DepartmentList";
// import CreateDepartment from "./components/department/CreateDepartment";
// import EditDepartment from "./components/department/EditDepartment";

>>>>>>> 35d38bbedc4b9362ff4bfe63e05802615b5068c1
function App() {
  return (
 
  <Router>
    <Routes>
<<<<<<< HEAD
=======
     {/* <Route path="/society/create" element={<CreateSociety />} />
     <Route path="/society/edit/:id" element={<EditSociety />} />
    <Route path="/society" element={<SocietyList />} /> */}
>>>>>>> 35d38bbedc4b9362ff4bfe63e05802615b5068c1
    <Route path="/home" element={<Home />} />
    <Route path='/' element={<Login />} />
    </Routes> 
  </Router>
  )
}


export default App; 