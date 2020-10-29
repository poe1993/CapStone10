import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUser } from './auth'
import { Header } from './Header'

export function EditUserProfile() {
  const history = useHistory()

  const user = getUser()
  const [errorMessage, setErrorMessage] = useState('')
  const [updatedUser, setUpdatedUser] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    telephone: user.telephone,
    password: user.password,
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const newUpdatedUser = { ...updatedUser, [fieldName]: value }
    setUpdatedUser(newUpdatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch(`/api/Users/${user.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updatedUser),
    })

    const apiResponse = await response.json()

    console.log(apiResponse)

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/profile')
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
                <h5 className="card-title text-center">Edit Profile</h5>
                <form onSubmit={handleFormSubmit}>
                  {errorMessage && <p>{errorMessage}</p>}
                  <div className="form-label-group">
                    <input
                      type="name"
                      id="inputName"
                      className="form-control"
                      name="name"
                      placeholder="Full Name"
                      required
                      autoFocus
                      value={updatedUser.name}
                      onChange={handleStringFieldChange}
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required
                      autoFocus
                      value={updatedUser.password}
                      onChange={handleStringFieldChange}
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      required
                      autoFocus
                      value={updatedUser.email}
                      onChange={handleStringFieldChange}
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="telephone"
                      id="inputTelephone"
                      className="form-control"
                      name="telephone"
                      placeholder="Telephone #"
                      required
                      autoFocus
                      value={updatedUser.telephone}
                      onChange={handleStringFieldChange}
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    Edit Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
