import { Field, useField, FieldAttributes } from "formik";
import PropTypes from 'prop-types';

interface RadioButtonProps extends FieldAttributes<any> {
    label: string,
    name: string,
    value: string
}

const RadioButton = ({ label, ...props }: RadioButtonProps) => {
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