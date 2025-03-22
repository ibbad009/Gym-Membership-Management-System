import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberList = ({ refreshMembers }) => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null); // Track which member is being edited

  useEffect(() => {
    fetchMembers();
  }, [refreshMembers]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/members');
      setMembers(response.data);
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      fetchMembers(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  const handleUpdate = (member) => {
    setEditingMember(member); // Set the member to be edited
  };

  const handleUpdateSubmit = async (updatedMember) => {
    try {
      await axios.put(`http://localhost:5000/api/members/${updatedMember._id}`, updatedMember);
      setEditingMember(null); // Clear the editing state
      fetchMembers(); // Refresh the list after update
    } catch (err) {
      console.error('Error updating member:', err);
    }
  };

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map(member => (
          <li key={member._id}>
            <strong>{member.name}</strong> - {member.membershipType}
            <button onClick={() => handleUpdate(member)}>Update</button>
            <button onClick={() => handleDelete(member._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Update Form */}
      {editingMember && (
        <div className="update-form">
          <h3>Update Member</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateSubmit(editingMember);
          }}>
            <input
              type="text"
              placeholder="Name"
              value={editingMember.name}
              onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={editingMember.age}
              onChange={(e) => setEditingMember({ ...editingMember, age: e.target.value })}
              required
            />
            <select
              value={editingMember.gender}
              onChange={(e) => setEditingMember({ ...editingMember, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Contact"
              value={editingMember.contact}
              onChange={(e) => setEditingMember({ ...editingMember, contact: e.target.value })}
              required
            />
            <select
              value={editingMember.membershipType}
              onChange={(e) => setEditingMember({ ...editingMember, membershipType: e.target.value })}
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingMember(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MemberList;