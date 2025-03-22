import React, { useState } from 'react';
import AddMemberForm from './components/AddMemberForm';
import MemberList from './components/MemberList';
import './App.css';

function App() {
  const [refreshMembers, setRefreshMembers] = useState(false);

  const handleMemberAdded = () => {
    setRefreshMembers(!refreshMembers);
  };

  return (
    <div className="app">
      <h1>Fitness Planet</h1>
      <AddMemberForm onMemberAdded={handleMemberAdded} />
      <MemberList refreshMembers={refreshMembers} />
    </div>
  );
}

export default App;