import { Field, useField } from 'formik';
import PropTypes from 'prop-types';

const RangeFieldEl = ({ values, ...props }) => {
    const [field] = useField(props)
    const value = field.name.startsWith('moodsrate') ? values.moodsrate[field.name.slice(10)] : values[field.name]

    return (
        <div className="flex gap-2">
            <Field
                type="range"
                min="1"
                max="10"
                {...field}
                {...props}
            />
            <span>{value}</span>
        </div>
    )
}
export default RangeFieldEl

RangeFieldEl.propTypes = {
    values: PropTypes.object
}