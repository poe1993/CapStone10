import React from 'react'
import { getUser, logout } from './auth'
import { Header } from './Header'

export function Home() {
  const user = getUser()
  function handleLogOut() {
    logout()

    window.location.assign('/')
  }

  function NewPolicyForm() {
    window.location.assign('/new')
  }

  function YourPolicies() {
    window.location.assign('/view')
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                {user.photoURL && (
                  <img
                    className="user"
                    alt=""
                    width={200}
                    src={user.photoURL}
                  />
                )}
                <h5 className="card-title text-center">
                  Welcome, {user.name}!
                </h5>
                <hr className="my-4" />
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  onClick={YourPolicies}
                >
                  Your Policies
                </button>

                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  onClick={NewPolicyForm}
                >
                  New Policy
                </button>
                <hr className="my-4" />
                <button
                  className="btn btn-lg btn-google btn-block text-uppercase"
                  onClick={handleLogOut}
                >
                  <i className="fab fa-google mr-2"></i> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
