import React from "react"
import '../styles/RMA.css'

function RMA() {
    return (
        <div className="App">
            <form>
                <h1>COME DOCTOR</h1>
                <br />
                <br />
                <br />
                <br />
                <label>
                    Choisissez votre practitien :
                    <br />
                    <select>
                        <option value='' >-</option>
                        <option value='' >Dr. DUMONT Jean-Paul</option>
                        <option value='' >Dr. ALAIN Françoise</option>
                        <option value='' >Dr. FUSSILI Jeanne</option>
                    </select>
                </label>
                <br />
                <br />
                <br />
                <br />
                <label>
                    Choisissez votre jour :
                    <br />
                    <input type='datetime-local' name="AppointmentDate" />
                </label>
                <br />
                <br />
                <br />
                <br />
                <input type='submit' value='Envoyer' style={{ backgroundColor: '#D89D0E' }} />
            </form>
        </div>
    )
}

export default RMA  