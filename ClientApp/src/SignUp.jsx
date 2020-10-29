import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

export function SignUp() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState('')

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    telephone: '',
    password: '',
    photoURL: '',
  })

  const [isUploading, setIsUploading] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  async function onDropFile(acceptedFiles) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)
    // Create a formData object so we can send this
    // to the API that is expecting som form data.
    const formData = new FormData()
    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)
    try {
      setIsUploading(true)
      // Use fetch to send an authorization header and
      // a body containing the form data with the file
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        body: formData,
      })
      setIsUploading(false)
      // If we receive a 200 OK response, set the
      // URL of the photo in our state so that it is
      // sent along when creating the user,
      // otherwise show an error
      if (response.status === 200) {
        const apiResponse = await response.json()
        const url = apiResponse.url
        setNewUser({ ...newUser, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image')
      }
    } catch (error) {
      // Catch any network errors and show the user we could not process their upload
      console.debug(error)
      setErrorMessage('Unable to upload image')
      setIsUploading(false)
    }
  }

  let dropZoneMessage = 'Drag a picture of the user here to upload!'
  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }
  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })

    const apiResponse = await response.json()

    console.log(apiResponse)

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <form onSubmit={handleFormSubmit}>
                {errorMessage && <p>{errorMessage}</p>}
                <div className="form-label-group">
                  {newUser.photoURL && (
                    <p>
                      <img
                        alt="User Photo"
                        className="user"
                        width={200}
                        src={newUser.photoURL}
                      />
                    </p>
                  )}
                  <div className="file-drop-zone">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {dropZoneMessage}
                    </div>
                  </div>
                  <input
                    type="name"
                    id="inputName"
                    className="form-control"
                    name="name"
                    placeholder="Full Name"
                    required
                    autoFocus
                    value={newUser.name}
                    onChange={handleStringFieldChange}
                  />
                </div>
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    required
                    autoFocus
                    value={newUser.password}
                    onChange={handleStringFieldChange}
                  />
                </div>
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    required
                    autoFocus
                    value={newUser.email}
                    onChange={handleStringFieldChange}
                  />
                </div>
                <div className="form-label-group">
                  <input
                    type="telephone"
                    id="inputTelephone"
                    className="form-control"
                    name="telephone"
                    placeholder="Telephone #"
                    required
                    autoFocus
                    value={newUser.telephone}
                    onChange={handleStringFieldChange}
                  />
                </div>
                <button
                  className="btn btn-lg btn-google btn-block text-uppercase"
                  type="submit"
                >
                  Sign Up!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
