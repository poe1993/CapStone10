import React, { useEffect, useState } from 'react'
import { getUser, getUserId, isLoggedIn, logout } from './auth'
import { Header } from './Header'

export function ViewPolicy() {
  const user = getUser()
  return (
    <body>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Your Policies</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
