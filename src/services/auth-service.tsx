import React, {useState} from 'react';
import firebase from '../../database/firebase-db';

const AuthService = () => {
  registerUser = (name, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('User registered successfully!');
      })
      .catch(function (error) {
        // An error happened.
        console.log('Error on register!');
      });
  };
};

export default AuthService;
