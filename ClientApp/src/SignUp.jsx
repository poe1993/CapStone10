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
                <h5 className="card-title text-center">Sign In</h5>
                <form onSubmit={handleFormSubmit}>
                  {errorMessage && <p>{errorMessage}</p>}
                  <p className="form-input">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleStringFieldChange}
                    />
                  </p>
                  <p className="form-input">
                    <label htmlFor="name">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleStringFieldChange}
                    />
                  </p>
                  <p className="form-input">
                    <label htmlFor="name">Telephone</label>
                    <input
                      type="telephone"
                      name="telephone"
                      value={newUser.telephone}
                      onChange={handleStringFieldChange}
                    />
                  </p>
                  <p className="form-input">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleStringFieldChange}
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
