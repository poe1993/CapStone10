import React, { useEffect, useState } from 'react'
import { getUser, getUserId, isLoggedIn, logout } from './auth'
import { Header } from './Header'
import format from 'date-fns/format'

export function ViewPolicy() {
  const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`
  const user = getUserId()
  const [policies, setPolicies] = useState([])

  useEffect(function () {
    async function loadPolicies() {
      const response = await fetch('/api/policies')
      const json = await response.json()
      console.log(json)
      setPolicies(json)
    }
    loadPolicies()
  }, [])
  return (
    <body>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Your Policies</h5>
                <ul>
                  {policies.map((policy) => (
                    <li>
                      Policy {policy.location}
                      <ul>Type: {policy.type}</ul>
                      <ul>Premium: {policy.premium}</ul>
                      <ul>
                        Coverage:
                        {format(new Date(policy.coverage), dateFormat)}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
