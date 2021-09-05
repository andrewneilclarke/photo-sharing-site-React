import React from 'react';

const Title = ( { user, handleLogout } ) => {
  return (
    <>
    <div className="title">
      <h1>AndrewGram</h1>
      { user && 
      <>
      <p>Welcome <span className="username">{user.email}</span></p>
                <button onClick={handleLogout}>Logout</button>
      </> }
    </div>
    
      <h2>Your Best Pictures</h2>
      <p>Share your most beautiful and inspirational photos with everyone.</p>
    </>
  )
}

export default Title;