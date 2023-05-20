import Navbar from './components/Navbar';
import './app.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Signin from './screens/auth/Signin';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';
import Doctors from './screens/Doctors';
import Patients from './screens/Patients';
import AddDoctor from './screens/AddDoctor';
import Apointments from './screens/Apointments';

function App() {
  const { userToken } = useContext(AppContext);

  return (
    <>
      {userToken ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-doctors" element={<Doctors />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/all-patients" element={<Patients />} />
            <Route path="/all-apointments" element={<Apointments />} />
            <Route path="/signin" element={<Navigate to={'/'} />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Navigate to={'/signin'} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
