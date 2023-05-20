import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Patients = () => {
  const { allPatients } = useContext(AppContext);
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-light">All Patients</h2>

      {allPatients?.map((item, i) => (
        <div key={i} className="card mt-4" style={{display: 'flex', flexDirection: 'row', height: 100, alignItems: 'center'}}>
          <img src={item.avtar} style={{width: 80, height: 80, marginLeft: 10, borderRadius: 999}} alt="..." />
          <div  className='ms-4'>
           <h3 style={{margin: 0}} className='text-light'>{item.name}</h3>
           <p style={{margin: 0}}>{item.email}</p>
      
          </div>

          <div  className='ms-auto me-4'>
           <p style={{margin: 0}}>Gender: {item.gender}</p>
           <p style={{margin: 0}}>Age: {item.age}</p>
           <p style={{margin: 0}}>Blood Group: {item.bloodGroup}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Patients;
