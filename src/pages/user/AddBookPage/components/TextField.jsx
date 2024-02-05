import { Field, ErrorMessage, useField } from "formik";
import PropTypes from 'prop-types'

const TextField = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <div className="mb-3">
            <div className="flex flex-col max-w-[400px] min-[500px]:flex-row min-[500px]:items-center min-[500px]:max-w-[500px]">
                <label htmlFor={field.name} className="font-semibold min-[500px]:w-20">{label}</label>
                <Field
                    type="text"
                    {...field}
                    {...props}
                    className="px-3 py-1 rounded-md border grow " />
            </div>
            <ErrorMessage name={field.name} component="div" className="text-sm text-red-500" />
        </div>
    )
}
export default TextField

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
