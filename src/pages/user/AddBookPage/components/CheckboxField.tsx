import { Field, useField, FieldAttributes } from "formik"
import PropTypes from 'prop-types'

interface CheckboxFieldProps extends FieldAttributes<any> {
    label: string,
    name: string,
    value: string
}

const CheckboxField = ({ label, ...props }: CheckboxFieldProps) => {
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