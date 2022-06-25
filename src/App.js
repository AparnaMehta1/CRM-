import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import { Suspense } from "react";
import Admin from './Pages/Admin'
import RequireAuth from "./Components/RequireAuth";
import Engineer from './Pages/Engineer'
import Customer from './Pages/Customer'
import NotFound from "./Components/NotFound";
import Unauthorized from "./Components/Unauthorized";
import "bootstrap/dist/css/bootstrap.min.css";
import '@coreui/coreui/dist/css/coreui.min.css';


import './App.css'


const ROLES = {
  "CUSTOMER": "CUSTOMER",
  "ENGINEER": "ENGINEER",
  "ADMIN": "ADMIN",
};

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route path="unauthorized" element={<Unauthorized />} />
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}> */}
            <Route path="/admin" exact element={<Admin />} />
          {/* </Route> */}
          <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
            <Route path="/customer" element={<Customer />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
            <Route path="/engineer" element={<Engineer />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;