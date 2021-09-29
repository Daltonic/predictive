import './Glass.css'
import { useState } from 'react'
import axios from 'axios'

function Glass() {
  const [gender, setGender] = useState('')
  const [bsc, setBsc] = useState('')
  const [workex, setWorkex] = useState('')
  const [etest_p, setEtest_p] = useState('')
  const [msc, setMsc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = { gender, bsc, workex, etest_p, msc }

    axios
      .post('http://localhost:8080/prediction', params)
      .then((res) => {
        const data = res.data.data
        const parameters = JSON.stringify(params)
        const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`
        alert(msg)
        reset()
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }

  const reset = () => {
    setGender('')
    setBsc('')
    setWorkex('')
    setEtest_p('')
    setMsc('')
  }

  return (
    <div className="glass">
      <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
        <h4>Employment Data</h4>
        <div className="glass__form__group">
          <input
            id="gender"
            className="glass__form__input"
            placeholder="Gender (1 = Male or 0 = Female)"
            required
            autoFocus
            min="0"
            max="1"
            pattern="[0-9]{0,1}"
            title="Gender must either be (1 = Male or 0 = Female)"
            type="number"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="bsc"
            className="glass__form__input"
            placeholder="BSc CGPA (1.00 - 5.00)"
            required
            min="0"
            max="5"
            type="number"
            title="BSc CGPA must be in the range (1.00 - 5.00)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={bsc}
            onChange={(e) => setBsc(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="workex"
            className="glass__form__input"
            placeholder="Work Experience (1 = True or 0 = False)"
            required
            min="0"
            max="1"
            type="number"
            title="Work Experience must either be (1 = True or 0 = False)"
            value={workex}
            onChange={(e) => setWorkex(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="etest_p"
            className="glass__form__input"
            placeholder="E-Test Score (1.00 - 100.00)"
            required
            min="0"
            max="100"
            type="number"
            title="E-Test score must be in the range (1.00 - 100)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={etest_p}
            onChange={(e) => setEtest_p(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="msc"
            className="glass__form__input"
            placeholder="MSc CGPA (1.00 - 5.00)"
            required
            min="0"
            max="5"
            type="number"
            title="MSc CGPA must be in the range (1.00 - 5.00)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={msc}
            onChange={(e) => setMsc(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <button type="submit" className="glass__form__btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Glass
