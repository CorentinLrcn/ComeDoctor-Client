import React, { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../App';
import { useNavigate } from 'react-router-dom'
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../App';


function Connexion() {
    const email = useRef()
    const password = useRef()

    const navigate = useNavigate()

    function handleSubmit(e) {
        console.log('email : ' + email.current.value + ', password : ' + password.current.value)
        e.preventDefault()
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const q = query(collection(db, 'patients'), where("email", "==", user.email));
                const docSnap = await getDocs(q);
                docSnap.forEach((res) => {
                    navigate(`/mypage/${res.data().id}`)
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                navigator.vibrate([
                    100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100,
                ]);
            });
    }
    return (
        <div className="App">
            <form onSubmit={handleSubmit} >
                <h1>- COME DOCTOR -</h1>
                <h2>- Patient -</h2>
                <br />
                <br />
                <br />
                <br />
                <label>
                    Votre email :
                    <br />
                    <input type='email' name="login" ref={email} />
                </label>
                <br />
                <br />
                <br />
                <br />
                <label>
                    Votre mot de passe :
                    <br />
                    <input type='password' name="password" ref={password} />
                </label>
                <br />
                <br />
                <br />
                <br />
                <input style={{ backgroundColor: '#D89D0E' }} type='submit' value='Connexion' />
            </form>
        </div>
    )
}

export default Connexion