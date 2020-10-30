import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { authHeader, getUser, updateUserAuth } from './auth'
import { Header } from './Header'
import { useDropzone } from 'react-dropzone'

export function EditUserProfile() {
  const history = useHistory()

  const user = getUser()
  const [errorMessage, setErrorMessage] = useState('')
  const [updatedUser, setUpdatedUser] = useState({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    telephone: user?.telephone,
    password: '',
    photoURL: user?.photoURL,
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
        setUpdatedUser({ ...updatedUser, photoURL: url })
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
    const newUpdatedUser = { ...updatedUser, [fieldName]: value }
    setUpdatedUser(newUpdatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch(`/api/Users/${user.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(updatedUser),
    })

    const apiResponse = await response.json()

    console.log(apiResponse)

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      console.log(updatedUser)
      updateUserAuth(updatedUser)
      history.push('/home')
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Edit Profile</h5>
                <hr className="my-4" />
                <form onSubmit={handleFormSubmit}>
                  {errorMessage && <p>{errorMessage}</p>}
                  <div className="form-label-group">
                    {updatedUser.photoURL ? (
                      <p>
                        <img
                          alt=""
                          className="user"
                          width={200}
                          src={updatedUser.photoURL}
                        />
                      </p>
                    ) : (
                      <div className="file-drop-zone">
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {dropZoneMessage}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-label-group">
                    <input
                      type="name"
                      id="inputName"
                      className="form-control"
                      name="name"
                      placeholder="Full Name"
                      required
                      autoFocus
                      value={updatedUser.name}
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
                      value={updatedUser.password}
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
                      value={updatedUser.email}
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
                      value={updatedUser.telephone}
                      onChange={handleStringFieldChange}
                    />
                  </div>
                  <hr className="my-4" />
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    Edit Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
