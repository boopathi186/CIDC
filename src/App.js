import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/forms/Login';
import DashBoard from './pages/DashBoard';
import NotFound from './pages/NotFoundPage';
import PrivateRoute, { PrivateRoutes } from './components/private-Router/Private-Router';
import GetUsers from './pages/GetUsers';
import GetAttendance from './pages/GetAttendance';
import LeavePage from './pages/LeavePage';



function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <>
            <Route element={<PrivateRoutes />}>
              <Route path='/login' element={<Login />} />
            </Route>
          </>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/attendance'  element={<GetAttendance/>}/>
            <Route path='/users'  element={<GetUsers/>}/>
            <Route path='/leavechart'  element={<LeavePage/>}/>
            <Route path='*' element={<NotFound />} />
          </Route>

        </Routes>

      </Router>

    </div>
  );
}

export default App;
