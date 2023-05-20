import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { allDoctors } = useContext(AppContext);
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-light">All Doctors</h2>

      {allDoctors?.map((item, i) => (
        <div key={i} className="card mt-4" style={{display: 'flex', flexDirection: 'row', height: 100, alignItems: 'center'}}>
          <img src={item.avtar} style={{width: 80, height: 80, marginLeft: 10, borderRadius: 999}} alt="..." />
          <div  className='ms-4'>
           <h3 style={{margin: 0}} className='text-light'>{item.name}</h3>
           <p style={{margin: 0}}>{item.degree}</p>
           <p style={{margin: 0}}>{item.college}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
