import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserId } from './auth'

export function NewPolicy() {
  const history = useHistory()
  const id = getUserId()
  const [errorMessage, setErrorMessage] = useState()
  const [newPolicy, setNewPolicy] = useState({
    location: '',
    type: '',
    coverage: new Date(),
    premium: 0.0,
    userId: id,
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedPolicy = { ...newPolicy, [fieldName]: value }
    setNewPolicy(updatedPolicy)
  }

  function handlePremium(event) {
    const value = '1200'
    const fieldName = event.target.name
    const updatedPolicy = {
      ...newPolicy,
      [fieldName]: parseInt(value),
    }
    setNewPolicy(updatedPolicy)
  }

  function fixer(x) {
    return Number.parseFloat(x).toFixed(2)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Users/Policies', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newPolicy),
    })

    const apiResponse = await response.json()

    console.log(apiResponse)

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/home')
    }
  }

  return (
    <body>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">New Policy Form</h5>
                <form onSubmit={handleFormSubmit}>
                  {errorMessage && <p>{errorMessage}</p>}
                  <p className="form-input">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={newPolicy.location}
                      onChange={handleStringFieldChange}
                    />
                  </p>
                  <select
                    onChange={handleStringFieldChange}
                    name="HO-type"
                    id="type"
                  >
                    <optgroup label="Pick your policy">
                      <option value="HO-3">HO-3(Basic)</option>
                      <option value="HO-5">HO-5(Advanced)</option>
                      <option value="HO-8">HO-7(Premium)</option>
                    </optgroup>
                  </select>
                  <p className="form-input">
                    <label htmlFor="premium">Estimated Home Value $:</label>
                    <input
                      type="text"
                      name="premium"
                      value={newPolicy.premium}
                      onSubmit={handlePremium}
                    />
                  </p>
                  <p>
                    <input type="submit" value="Submit" />
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
