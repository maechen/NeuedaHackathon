// This file contains the JavaScript logic for handling user authentication. It initializes Firebase, handles form submissions for login and signup, and manages user sessions.

import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signupForm['email'].value;
        const password = signupForm['password'].value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Signup successful:', user);
                // Redirect to login or home page
            })
            .catch((error) => {
                console.error('Error during signup:', error.message);
            });
    });
}

// Handle login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm['email'].value;
        const password = loginForm['password'].value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Login successful:', user);
                // Redirect to home page
            })
            .catch((error) => {
                console.error('Error during login:', error.message);
            });
}

// Monitor authentication state
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user);
        // User is signed in, redirect to home page
    } else {
        console.log('No user is signed in.');
    }
});