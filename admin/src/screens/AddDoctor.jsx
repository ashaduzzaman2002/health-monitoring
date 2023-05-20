import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [degree, setDegree] = useState('');
  const [college, setCollege] = useState('');
  const [password, setPassword] = useState('');

  const { userToken } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDoctor = {
      token: userToken,
      name,
      email,
      degree,
      college,
      password,
    };

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/admin/add-doctor',
        newDoctor
      );
      toast.success('Add doctor successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5" style={{ width: '30%' }}>
      <ToastContainer />
      <h2 className="text-light mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group mb-3">
          <label for="exampleInputName1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div class="form-group mb-3">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group mb-3">
          <label for="exampleInputDegree1">Degree</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputDegree1"
            aria-describedby="emailHelp"
            placeholder="Enter degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>

        <div class="form-group mb-3">
          <label for="exampleInputCollege1">College</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputCollege1"
            aria-describedby="emailHelp"
            placeholder="Enter college"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary mt-4">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
