import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export function SignUp() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    telephone: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })

    const apiResponse = await response.json()

    console.log(apiResponse)

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  }

  return (
    <body>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
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
                      value={newUser.name}
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
                      value={newUser.password}
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
                      value={newUser.email}
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
                      value={newUser.telephone}
                      onChange={handleStringFieldChange}
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    Sign Up!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
