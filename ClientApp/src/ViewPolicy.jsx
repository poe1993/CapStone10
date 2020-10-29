import React, { useEffect, useState } from 'react'
import { authHeader, getUser } from './auth'
import { Header } from './Header'
import format from 'date-fns/format'
import { Link } from 'react-router-dom'

export function ViewPolicy() {
  const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`
  const user = getUser()

  const [policies, setPolicies] = useState([])

  function HomeButton() {
    window.location.assign('/home')
  }

  function handleUpdate() {
    window.location.assign('/update')
  }

  async function loadPolicies() {
    const response = await fetch('/api/policies', {
      headers: { 'content-type': 'application/json', ...authHeader() },
    })
    const json = await response.json()
    setPolicies(json)
  }

  async function handleDeletePolicy(event, policyId) {
    event.preventDefault()
    await fetch(`/api/policies/${policyId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })
    loadPolicies()
  }

  function fixer(x) {
    return Number.parseFloat(x).toFixed(2)
  }

  useEffect(function () {
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
                <h5 className="card-title text-center">Your Policies</h5>
                <hr className="my-4" />
                <div>
                  <ul>
                    {policies.map((policy) => (
                      <li className="btn-policy" key={policy.location}>
                        Policy {policy.location}:
                        <ul key={policy.type}>Type: {policy.type}</ul>
                        <ul key={policy.premium}>
                          Premium: ${fixer((policy.premium / 100000) * 50)}
                        </ul>
                        <ul key={policy.coverage}>
                          Coverage Start(12 Months):
                          <ul>
                            {format(new Date(policy.coverage), dateFormat)}
                          </ul>
                        </ul>
                        {policy.userId === user.id && (
                          <div>
                            <button
                              className="small"
                              onClick={(event) =>
                                handleDeletePolicy(event, policy.id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        {policy.userId === user.id && (
                          <div>
                            <Link to={`/editpolicy/${policy.id}`}>
                              <button className="small">Update</button>
                            </Link>
                          </div>
                        )}
                        <hr className="my-4" />
                      </li>
                    ))}
                  </ul>
                  <hr className="my-4" />
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    onClick={HomeButton}
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
