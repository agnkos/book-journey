import { useEffect, useState } from "react"
import userService from '../../services/user'
import { useAuth } from "../../hooks/useAuth"
import { Formik, Form, Field } from "formik";

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
    firstName: userData?.firstName,
    lastName: userData?.lastName,
  };

  const onSubmit = async (values) => {
    await userService.changeUsername(values)
    const data = await userService.getUser(user.token)
    setUserData(data)
    setEditUsername(false)
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
          {({ values }) => {
            console.log('form values', values)
            return (
              <Form className="max-w-fit mb-2 pb-3 border-b-2 border-b-light-objects">
                <div className="mb-2">
                  <p>Firstname</p>
                  {editUsername ?
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
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
                        value={values.lastName}
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
    </div >
  )
}
export default Profile