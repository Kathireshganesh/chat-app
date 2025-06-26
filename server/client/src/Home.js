import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

function Home() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container mt-4 text-center">
      <h1 className="mb-4">💬 Welcome to Chat App</h1>
      {showLogin ? <Login /> : <Register />}

      <div className="mt-3">
        {showLogin ? (
          <>
            <span>Don't have an account? </span>
            <button className="btn btn-link" onClick={() => setShowLogin(false)}>Register here</button>
          </>
        ) : (
          <>
            <span>Already have an account? </span>
            <button className="btn btn-link" onClick={() => setShowLogin(true)}>Login here</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
