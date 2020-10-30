import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { authHeader, getUserId } from './auth'
import { Header } from './Header'

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
    const value = event.target.value
    const fieldName = event.target.name
    const updatedPolicy = {
      ...newPolicy,
      [fieldName]: Number(value),
    }
    setNewPolicy(updatedPolicy)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    if (newPolicy.premium <= 100000) {
      window.alert('Please enter a value greater than 100000')
      return
    }

    const response = await fetch('/api/Policies', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
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
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">New Policy Form</h5>
                <hr className="my-4" />
                <form onSubmit={handleFormSubmit}>
                  {errorMessage && <p>{errorMessage}</p>}
                  <div className="form-label-group">
                    <input
                      type="location"
                      id="inputLocation"
                      placeholder="Location"
                      className="form-control"
                      required
                      autoFocus
                      name="location"
                      value={newPolicy.location}
                      onChange={handleStringFieldChange}
                    />
                  </div>
                  <select
                    onInput={handleStringFieldChange}
                    className="select"
                    name="type"
                    id="type"
                  >
                    <optgroup
                      label="Pick your policy"
                      onChange={handleStringFieldChange}
                    >
                      <option value="HO-3">HO-3(Basic)</option>
                      <option value="HO-5">HO-5(Advanced)</option>
                      <option value="HO-8">HO-7(Premium)</option>
                    </optgroup>
                  </select>
                  <div className="form-label-group">
                    <input
                      type="text"
                      name="premium"
                      placeholder="Estimated Home Value"
                      className="form-control"
                      required
                      autoFocus
                      value={newPolicy.premium}
                      onChange={handlePremium}
                    />
                  </div>
                  <hr className="my-4" />
                  <p>
                    <button
                      className="btn btn-lg btn-google btn-block text-uppercase"
                      type="submit"
                    >
                      Create Policy
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
