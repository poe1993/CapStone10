import React, { useEffect, useState } from 'react'
import { getUser, isLoggedIn } from './auth'
import { Header } from './Header'

export function UpdatePolicy() {
  const [policies, setPolicies] = useState([])

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
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Which policy would you like to update?
                  <hr className="my-4" />
                  {isLoggedIn() && (
                    <form>
                      <ul>
                        {policies.map((policy) => (
                          <ul>
                            <label className="container" key={policy}>
                              Policy {policy.location}
                              <input type="radio" />
                              <span className="checkmark"></span>
                            </label>
                          </ul>
                        ))}
                        <hr className="my-4" />
                        <button
                          className="btn btn-lg btn-google btn-block text-uppercase"
                          type="submit"
                        >
                          Submit
                        </button>
                      </ul>
                    </form>
                  )}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
