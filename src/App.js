import React, { useState, useEffect } from 'react';
import ImageGrid from './comps/ImageGrid';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import Modal from './comps/Modal';
import Login from './comps/Login';
import { auth } from './firebase/config'

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPassworError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPassworError('');
  }
  const handleLogin = () => {
    clearErrors();
    auth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          default:
            return;
        }
      })
  }
  const handleSignup = () => {
    clearErrors();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPassworError(err.message);
            break; 
          default:
            return;
        }
      })
  }

  const handleLogout = () => {
    auth.signOut();
  }



  useEffect(() => {
    const authListener = () => {
      auth.onAuthStateChanged(user => {
        if (user){
          clearInputs();
          setUser(user)
        } else {
          setUser('')
        }
      })
    }
    authListener();
  }, [user])

  return (
    <div className="App">
      <Title user={user} handleLogout={handleLogout} />
      {user ? (
        <>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
        </>


        ) : (
        <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} handleSignup={handleSignup} hasAccount={hasAccount} setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError}/>
      )}
    </div>
  );
}

export default App;
