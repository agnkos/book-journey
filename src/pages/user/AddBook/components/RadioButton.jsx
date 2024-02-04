import { Field, useField } from "formik";
import PropTypes from 'prop-types';

const RadioButton = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <label className="mr-1 ">
            <Field type="radio" {...field} {...props} className="mr-2" />
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