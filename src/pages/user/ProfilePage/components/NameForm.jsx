import { Formik, Form, Field } from "formik"
import userService from '../../../../services/user'
import { useAuth } from "../../../../hooks/useAuth"
import PropTypes from 'prop-types'

const NameForm = ({ userData, setUserData, editUser, setEditUser }) => {
    const { user } = useAuth()

    let initialNameValues = {
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
    };

    const onSubmit = async (values) => {
        await userService.changeUsername(values, user.token)
        const data = await userService.getUser(user.token)
        setUserData(data)
        setEditUser(false)
    }

    return (
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
                            {editUser ?
                                <Field
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="mb-1 px-2 py-1 rounded-md border"
                                />
                                :
                                <>
                                    <div className="flex items-center gap-8">
                                        <p className="text-xl">{userData?.firstName || '-'}</p>
                                    </div>
                                </>
                            }
                            <div className="mb-2">
                                <p>Lastname</p>
                                {editUser ?
                                    <Field
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className="mb-1 px-2 py-1 rounded-md border"
                                    />
                                    :
                                    <div className="flex items-center gap-8">
                                        <p className="text-xl">{userData?.lastName || '-'}</p>
                                    </div>}
                            </div>

                        </div>

                        {editUser ?
                            <div className="flex gap-4">
                                <button
                                    className="px-2 py-1 text-xs text-center bg-lighter-accent hover:bg-main-accent text-light-bg rounded-md block"
                                    type="submit">Save</button>
                                <button
                                    className="px-2 py-1 text-xs text-center bg-danger hover:bg-danger-hover text-light-bg rounded-md block"
                                    onClick={() => setEditUser(false)}>Cancel</button>
                            </div>
                            :

                            <button className="px-2 py-1 text-xs text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md block"
                                onClick={() => setEditUser(true)}
                            >Edit</button>
                        }

                    </Form>)
            }
            }
        </Formik>
    )
}
export default NameForm

NameForm.propTypes = {
    userData: PropTypes.object,
    setUserData: PropTypes.func,
    editUser: PropTypes.bool,
    setEditUser: PropTypes.func
}