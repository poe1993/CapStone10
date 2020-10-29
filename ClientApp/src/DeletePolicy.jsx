import React, { useEffect, useState } from 'react'
import { getUser, getUserId } from './auth'
import { Header } from './Header'

export function DeletePolicy() {
  const [policies, setPolicies] = useState([])
  const user = getUserId()

  useEffect(function () {
    const user = getUser()
    async function loadPolicies() {
      const response = await fetch('/api/policies')
      const json = await response.json()
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
                <h5 className="card-title text-center">
                  Which Policy would you like to delete?
                  <hr className="my-4" />
                  <form>
                    <ul>
                      {policies.map((policy) => (
                        <li>
                          <label className="container" key={policy}>
                            Policy {policy.location}
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </li>
                      ))}
                      <hr className="my-4" />
                      <button
                        className="btn btn-lg btn-google btn-block text-uppercase"
                        type="submit"
                      >
                        Delete
                      </button>
                    </ul>
                  </form>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
