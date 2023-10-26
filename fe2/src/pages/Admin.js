import React, { useEffect, useState } from 'react';
import AdminPage from '../component/admin/AdminPage';
import Navbar from '../component/Navbar';

function Admin() {
  const [users, setUsers] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/admin/admin', {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'welcome admin') {
          setAdmin(true);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {admin ? (
        <div>
          <AdminPage />
        </div>
      ) : (
        <div>
          <h2>Sorry, user cannot access.</h2>
        </div>
      )}
    </div>
  );
}

export default Admin;