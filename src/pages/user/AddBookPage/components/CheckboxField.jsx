import { Field, useField } from "formik";
import PropTypes from 'prop-types';

const CheckboxField = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <label className="flex items-center">
            <Field type="checkbox" {...field} {...props} className="mr-2 text-lighter-accent h-4 w-4 rounded focus:ring-1 focus:ring-lighter-accent" />
            {label}
        </label>
    )
}
export default CheckboxField

CheckboxField.propTypes = {
    label: PropTypes.string.isRequired,
}