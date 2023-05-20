import React from 'react';

const Home = () => {
  return (
    <div className="pb-5 mt-5 container text-light">
      <div className="row g-3">
        <Card number={60} text={'Active User'} />
        <Card number={100} text={'Total User'} />
        <Card number={20} text={'Active Doctor'} />
        <Card number={30} text={'Total Doctor'} />
        
      </div>
    </div>
  );
};

const Card = ({text, number}) => {
  return (
    <div className="col-12 col-md-6 col-xxl-3">
      <div className="card" style={{height: 280}}>
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <h2 className='text-light text-lg'>{number}</h2>
          <p style={{marginTop: '-10px'}}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
