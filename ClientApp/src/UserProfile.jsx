import React from 'react'
import { getUser } from './auth'
import { Header } from './Header'

export function UserProfile() {
  const user = getUser()

  function handleProfileEdit() {
    window.location.assign('/edit')
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
                <h5 className="card-title text-center">Your Profile</h5>
                <hr className="my-4" />
                <ul>
                  <li>Name: {user.name}</li>
                  <li>Email: {user.email}</li>
                  <li>Telephone: {user.telephone}</li>
                </ul>
                <hr className="my-4" />
                <button
                  className="btn btn-lg btn-google btn-block text-uppercase"
                  type="submit"
                  onClick={handleProfileEdit}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
