import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { authHeader } from './auth'
import { Header } from './Header'

export function UpdatePolicyForm() {
  const history = useHistory()

  const params = useParams()
  const id = params.id

  const [policy, setPolicy] = useState({
    location: '',
    type: '',
    premium: 0.0,
  })

  useEffect(() => {
    const fetchPolicy = async () => {
      const response = await fetch(`/api/policies/${id}`, {
        headers: { 'content-type': 'application/json', ...authHeader() },
      })
      const apiData = await response.json()
      setPolicy(apiData)
    }
    fetchPolicy()
  }, [id])

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedPolicy = { ...policy, [fieldName]: value }
    setPolicy(updatedPolicy)
  }

  function handlePremium(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedPolicy = {
      ...policy,
      [fieldName]: Number(value),
    }
    setPolicy(updatedPolicy)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    if (policy.premium <= 100000) {
      window.alert('Please enter a value greater than 100000')
      return
    }

    const response = await fetch(`/api/Policies/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(policy),
    })
    console.log(policy)
    console.log(response)
    history.push('/home')
  }

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Update Policy Form</h5>
              <form onSubmit={handleFormSubmit}>
                <div className="form-label-group">
                  <input
                    type="location"
                    id="inputLocation"
                    placeholder="Location"
                    className="form-control"
                    required
                    autoFocus
                    name="location"
                    value={policy.location}
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
                    type="premium"
                    name="premium"
                    placeholder="Estimated Home Value $"
                    className="form-control"
                    required
                    autoFocus
                    value={policy.premium}
                    onChange={handlePremium}
                  />
                </div>
                <p>
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    Update
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
