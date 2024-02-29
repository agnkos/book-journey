import { useEffect, useState } from "react"
import userService from '../../../services/user'
import { useAuth } from "../../../hooks/useAuth"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const Profile = () => {
  const [userData, setUserData] = useState()
  const [editUsername, setEditUsername] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const getUserData = async () => {
      const data = await userService.getUser(user.token)
      console.log('userdata', data)
      setUserData(data)
    }
    getUserData()
  }, [user.token])

  let initialNameValues = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
  };

  const onSubmit = async (values) => {
    await userService.changeUsername(values, user.token)
    const data = await userService.getUser(user.token)
    setUserData(data)
    setEditUsername(false)
  }

  const initialPasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required('Password is required'),
    newPassword: Yup.string().required('New password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Passwords don't match").required('Confirm password')
  })

  const submitNewPassword = async (values, { setStatus, resetForm }) => {
    const valuesToSend = { ...values }
    delete valuesToSend.confirmNewPassword
    try {
      await userService.changePassword(valuesToSend, user.token)
      resetForm()
    } catch (error) {
      console.log(error)
      setStatus({ response: error.response.data.message })
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Account details</h1>
      <div className="mb-2 max-w-fit pb-2 border-b-2 border-b-light-objects">
        <p>Username</p>
        <div className="flex items-center gap-8">
          <p className="text-xl">{userData?.username}</p>
        </div>
      </div>
      <>
        <Formik
          enableReinitialize={true}
          initialValues={initialNameValues}
          onSubmit={onSubmit}
        >
          {() => {
            return (
              <Form className="max-w-fit mb-2 pb-3 border-b-2 border-b-light-objects">
                <div className="mb-2">
                  <p>Firstname</p>
                  {editUsername ?
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="mb-1 px-2 py-1 rounded-md border"
                    />
                    :
                    <>
                      <div className="flex items-center gap-8">
                        <p className="text-xl">{userData?.firstName}</p>
                      </div>
                    </>
                  }
                  <div className="mb-2">
                    <p>Lastname</p>
                    {editUsername ?
                      <Field
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="mb-1 px-2 py-1 rounded-md border"
                      />
                      :
                      <div className="flex items-center gap-8">
                        <p className="text-xl">{userData?.lastName}</p>
                      </div>}
                  </div>

                </div>

                {editUsername ?
                  <div className="flex gap-4">
                    <button
                      className="px-2 py-1 text-xs text-center bg-lighter-accent hover:bg-main-accent text-light-bg rounded-md block"
                      type="submit">Save</button>
                    <button
                      className="px-2 py-1 text-xs text-center bg-danger hover:bg-danger-hover text-light-bg rounded-md block"
                      onClick={() => setEditUsername(false)}>Cancel</button>
                  </div>
                  :

                  <button className="px-2 py-1 text-xs text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md block"
                    onClick={() => setEditUsername(true)}
                  >Edit</button>
                }

              </Form>)
          }
          }
        </Formik>
      </>

      <div className="mb-2">
        <p>Email</p>
        <p className="text-xl">{userData?.email}</p>
      </div>
      <div className="mb-2">
        <p> Account created</p>
        <p className="text-xl">{userData?.accountCreated}</p>
      </div >
      <h2 className="mt-4 text-xl font-semibold mb-2">Change password</h2>
      <Formik
        initialValues={initialPasswordValues}
        validationSchema={passwordValidationSchema}
        onSubmit={submitNewPassword}
      >
        {({ status }) => (
          <Form>
            <div>
              <label htmlFor="currentPassword" className="block">Current password</label>
              <Field
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="mb-1 px-2 py-1 rounded-md border"
              />
              <ErrorMessage name="currentPassword" component="div" className="text-sm text-red-500" />
              <div className="text-xs font-semibold text-red-500">{status?.response}</div>
            </div>
            <div>
              <label htmlFor="newPassword" className="block">New password</label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                className="mb-1 px-2 py-1 rounded-md border"
              />
              <ErrorMessage name="newPassword" component="div" className="text-sm text-red-500" />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block">Confirm new password</label>
              <Field
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="mb-1 px-2 py-1 rounded-md border"
              />
              <ErrorMessage name="confirmNewPassword" component="div" className="text-sm text-red-500" />
            </div>
            <button className="mt-6 px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md block"
              type="submit"
            >Save new password</button>
          </Form>
        )}
      </Formik>
    </div >
  )
}
export default Profile