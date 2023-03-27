import React, { useEffect, useRef, useState } from "react"
import '../styles/RMA.css'

import { useNavigate, useParams } from 'react-router-dom'
import { addDoc, collection, getDocs, query } from "firebase/firestore"
import { db } from "../App"

function RMA() {
    const date = useRef()

    const [docList, setDocList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [appTaken, setAppTaken] = useState(false)

    const params = useParams()

    const navigate = useNavigate()

    const fetchData = async () => {
        const c = collection(db, 'doctors')
        const records = await getDocs(c)
        return records
    }

    async function createAppoitment(idDoctor) {
        console.log('idPatient : ' + params.idPatient)
        console.log('idDoctor : ' + idDoctor)
        console.log('date : ' + date.current.value)
        if (date.current.value != '') {
            await addDoc(collection(db, 'appointments'), {
                idPatient: params.idPatient || null,
                date: date.current.value || null,
                idDoctor: idDoctor || null,
            })
            setAppTaken(true)
            setTimeout(() => {
                navigate(`/myappointments/${params.idPatient}`)
            }, 3000)
        } else {
            alert('merci de renseigner une date de rendez-vous et un horaire')
        }
    }

    useEffect(() => {
        fetchData().then((response) => {
            let tmpList = []
            response.forEach((res) => {
                console.log(JSON.stringify(res.data()))
                tmpList.push(res.data())
            })
            console.log(tmpList)
            setDocList(tmpList)
            console.log('doc list : ' + docList)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="App">
            <h1>COME DOCTOR</h1>
            <br />
            <br />
            <br />
            <br />
            {!appTaken ? <label>
                Choisissez votre jour :
                <br />
                <input type='datetime-local' ref={date} />
            </label> : <div></div>}
            <br />
            <br />
            <label>Choisissez votre practitien :</label>
            <br />
            {!isLoading ? !appTaken ? docList.map((elem, index) => {
                return (
                    <div key={elem.id} name={elem.id} className="doctorCard" style={{ backgroundColor: 'black' }} onClick={() => createAppoitment(elem.id)} >
                        <p className="doctorName" >{elem.name}</p>
                        <p>{elem.speciality} - {elem.address}</p>
                    </div>
                )
            }) : <div><p>Votre rendez-vous a été pris !</p><br /><p>Vous allez être redirigé...</p></div> : <div></div>}
        </div>
    )
}

export default RMA  