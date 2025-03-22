import React, { useState } from 'react';
import axios from 'axios';

const AddMemberForm = ({ onMemberAdded }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [contact, setContact] = useState('');
  const [membershipType, setMembershipType] = useState('Monthly');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const member = { name, age, gender, contact, membershipType };
    try {
      await axios.post('http://localhost:5000/api/members', member);
      onMemberAdded();
    } catch (err) {
      console.error('Error adding member:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Member</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
      <select value={membershipType} onChange={(e) => setMembershipType(e.target.value)}>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <button type="submit">Add Member</button>
    </form>
  );
};

export default AddMemberForm;