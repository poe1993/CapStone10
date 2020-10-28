import React, { useEffect, useState } from 'react'

export function DeletePolicy() {
  const [policies, setPolicies] = useState([])

  useEffect(function () {
    async function loadPolicies() {
      const response = await fetch('/api/policies')
      const json = await response.json()
      setPolicies(json)
    }
    loadPolicies()
  }, [])

  return (
    <body>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Which Policy would you like to delete?
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
