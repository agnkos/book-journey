import { Field, useField } from 'formik';
import PropTypes from 'prop-types';

const RangeFieldEl = ({ values, ...props }) => {
    const [field] = useField(props)
    const value = field.name.startsWith('moodsrate') ? values.moodsrate[field.name.slice(10)] : values[field.name]

    return (
        <div className="flex gap-8 ml-4">
            <Field
                type="range"
                min="1"
                max="10"
                {...field}
                {...props}
                className="max-w-[160px] max-[390px]:w-24 slider scale-125 accent-lighter-accent"

            />
            <span>{value}</span>
        </div>
    )
}
export default RangeFieldEl

RangeFieldEl.propTypes = {
    values: PropTypes.object
}