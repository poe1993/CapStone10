import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { recordAuthentication } from './auth'

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedUser = { ...user, [fieldName]: value }
    setUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    console.log('ok')
    event.preventDefault()
    const response = await fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })
    const apiResponse = await response.json()
    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      console.log(apiResponse)
      recordAuthentication(apiResponse)
      window.location.assign('/home')
    }
  }

  return (
    <body>
      <body>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  <form onSubmit={handleFormSubmit}>
                    {errorMessage && <p>{errorMessage}</p>}
                    <p>
                      <label htmlFor="name">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleStringFieldChange}
                      />
                    </p>
                    <p className="form-input">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleStringFieldChange}
                      />
                    </p>
                    <p>
                      <input type="submit" value="Log In!" />
                    </p>
                  </form>

                  <Link to="/signup">Sign Up!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </body>
  )
}
