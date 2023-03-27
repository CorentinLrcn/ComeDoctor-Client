import React, { useEffect, useRef, useState } from "react"
import '../styles/RMA.css'

import { useParams } from 'react-router-dom'
import { addDoc, collection, getDocs, query } from "firebase/firestore"
import { db } from "../App"

function RMA() {
    const date = useRef()

    const [doctor, setDoctor] = useState('')
    const [docList, setDocList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()

    const fetchData = async () => {
        const c = collection(db, 'doctors')
        const records = await getDocs(c)
        return records
    }

    function highlight(idDoctor) {
        window.document.getElementsByName(idDoctor).style.backgroundColor = "#D89D0E"
    }

    async function createAppoitment(idDoctor) {
        console.log('idPatient : ' + params.idPatient)
        console.log('idDoctor : ' + doctor)
        console.log('date : ' + date.current.value)
        if (doctor != '') {
            if (date.current.value != '') {
                await addDoc(collection(db, 'appointments'), {
                    idPatient: params.idPatient || null,
                    date: date.current.value || null,
                    idDoctor: doctor || null,
                })
            } else {
                alert('merci de renseigner une date de rendez-vous et un horaire')
            }
        } else {
            alert('merci de choisir un practitien')
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
            <label>Choisissez votre practitien :</label>
            <br />
            {!isLoading ? docList.map((elem, index) => {
                return (
                    <div key={elem.id} name={elem.id} className="doctorCard" style={{ backgroundColor: 'black' }} onClick={() => highlight(elem.id)} >
                        <p className="doctorName" >{elem.name}</p>
                        <p>{elem.speciality} - {elem.address}</p>
                    </div>
                )
            }) : <div></div>}
            <br />
            <br />
            <label>
                Choisissez votre jour :
                <br />
                <input type='datetime-local' ref={date} />
            </label>
            <br />
            <br />
            <br />
            <br />
            {/*<input type='submit' value='Envoyer' style={{ backgroundColor: '#D89D0E' }} />*/}
            <button style={{ backgroundColor : '#D89D0E' }} onClick={() => createAppoitment()} >Envoyer</button>
        </div>
    )
}

export default RMA  