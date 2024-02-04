import { Field } from "formik";
import PropTypes from 'prop-types'

const TextareaField = ({ label, name }) => {
    return (
        <label className="font-semibold flex flex-col">{label}
            <Field
                type="text"
                as="textarea"
                name={name}
                className="max-w-[500px] mb-2 px-4 py-2 rounded-md border resize-none" />
        </label>
    )
}
export default TextareaField

TextareaField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}