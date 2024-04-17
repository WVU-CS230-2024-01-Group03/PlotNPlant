import React from 'react';
import {auth, googleProvider} from "../Config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import './Styles.css';
import { Link } from 'react-router-dom';
import Auth from '../Components/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const RegisterPage = () =>{
const [email,setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const createUser = async (e) => {
  e.preventDefault();
  try {
  {/* Condition to make sure an email and password is entered*/}
    if(!email || !password){
      alert("You need to enter an email and password to create an account.");
      return;
    }
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate('/');
  } catch (err) {
    console.log(err);
  }
}
  return(
    <html className='page'>
        <div class='wrapper'>
        <h1>Plot N' Plant</h1>
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img>
        <form onSubmit={createUser}>
          <div>

            <input type="text" id="emailInput" placeholder='E-Mail' className="text-input" onChange={(e) => setEmail(e.target.value)} required/>
      
          </div>
          <div>

            <input type="password" id="passwordInput" placeholder='Password' className="text-input" onChange={(e) => setPassword(e.target.value)} required />

          </div>
              <button type="submit" className="button">Sign Up</button>
            <div className="register-account">
              <p>Already have an Account?</p><Link to="/">Login</Link>
            </div>

        </form>
      </div>
  </html>
  );
}

export default RegisterPage