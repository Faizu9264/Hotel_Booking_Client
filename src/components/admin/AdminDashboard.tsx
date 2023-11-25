// AdminDashboard.tsx
import React from 'react';
import Sidebar from './components/AdminSidebar';

const AdminDashboard: React.FC = () => {

  return (
    <div className="flex flex-col h-screen">
      <Sidebar />
      </div>
  );
};

export default AdminDashboard;
