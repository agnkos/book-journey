import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import userService from '../../../../services/user'
import { toast } from 'react-toastify'

type PasswordFormValuesType = {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword?: string
}

type CustomError = {
    response: {
        data: {
            message?: string;
            title?: string;
        };
    };
}

type FormSubmitPropsType = {
    resetForm: () => void,
    setStatus: (response: CustomError) => void,
    // setValues: (values: PasswordFormValuesType) => void
}

const PasswordForm = () => {

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

    const submitNewPassword = async (values: PasswordFormValuesType, { setStatus, resetForm }: FormSubmitPropsType) => {
        const valuesToSend = { ...values }
        delete valuesToSend.confirmNewPassword
        try {
            await userService.changePassword(valuesToSend)
            resetForm()
            toast.success('Password changed')
        } catch (error: any) {
            console.log(error)
            toast.error('Failed to change password')
            setStatus({ response: error.response.data.message })
        }
    }

    return (
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
    )
}
export default PasswordForm