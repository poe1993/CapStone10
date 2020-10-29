import React from 'react'
import { Link } from 'react-router-dom'
import { getUser, isLoggedIn, logout } from './auth'
import { Header } from './Header'

export function Home() {
  const user = getUser()
  function handleLogOut() {
    logout()

    window.location.assign('/')
  }

  function HomeButton() {
    window.location.assign('/home')
  }

  function NewPolicyForm() {
    window.location.assign('/new')
  }

  function UpdateChoice() {
    window.location.assign('/update')
  }

  function YourPolicies() {
    window.location.assign('/view')
  }

  function DeletePolicies() {
    window.location.assign('/delete')
  }

  return (
    <body>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                {isLoggedIn() && (
                  <h5 className="card-title text-center">
                    Welcome, {user.name}!
                  </h5>
                )}
                {isLoggedIn() && (
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={YourPolicies}
                  >
                    Your Policies
                  </button>
                )}
                {isLoggedIn() && (
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={NewPolicyForm}
                  >
                    New Policy
                  </button>
                )}
                {isLoggedIn() && (
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={UpdateChoice}
                  >
                    Update Policy
                  </button>
                )}
                {isLoggedIn() && (
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={DeletePolicies}
                  >
                    Delete Policy
                  </button>
                )}
                <hr className="my-4" />
                {isLoggedIn() && (
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    onClick={handleLogOut}
                  >
                    <i className="fab fa-google mr-2"></i> Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
