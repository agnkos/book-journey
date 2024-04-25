import { Field, useField } from "formik";
import PropTypes from 'prop-types';

const RadioButton = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <label className="mr-1 flex items-center">
            <Field type="radio" {...field} {...props} className="mr-1 text-lighter-accent outline-none focus:outline-none" />
            {label}
        </label>
    )
}
export default RadioButton

RadioButton.propTypes = {
    // name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // value: PropTypes.string.isRequired,
}