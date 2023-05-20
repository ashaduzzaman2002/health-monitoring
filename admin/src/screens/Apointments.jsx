import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Apointments = () => {
  const { allApointments, userToken } = useContext(AppContext);

  const sendReminder = async (email, time) => {
    console.log(email, time);

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/alert/send-reminder',
        { token: userToken, email, time }
      );
      toast.success('Add doctor successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4 text-light">All Apointments</h2>

      {allApointments?.map((item, i) => (
        <div
          key={i}
          className="card mt-4"
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 100,
            alignItems: 'center',
          }}
        >
          <div className="ms-4">
            <h3 style={{ margin: 0 }} className="text-light">
              {item.patientName}
            </h3>
            <p style={{ margin: 0 }}>{item.patientEmail}</p>
          </div>

          <div className="ms-5">
            <p className="text-light" style={{ margin: 0 }}>
              Doctor: {item.doctorName}
            </p>
            <p style={{ margin: 0 }}>Time: {item.time}</p>
          </div>

          <div className="ms-auto me-4">
            <button
              onClick={() => sendReminder(item.patientEmail, item.time)}
              className="btn btn-primary"
            >
              Reminder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Apointments;
