import { Field, useField } from "formik";
import PropTypes from 'prop-types';

const CheckboxField = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <label className="mr-1">
            <Field type="checkbox" {...field} {...props} className="mr-2" />
            {label}
        </label>
    )
}
export default CheckboxField

CheckboxField.propTypes = {
    label: PropTypes.string.isRequired,
}