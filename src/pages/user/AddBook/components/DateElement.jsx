import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

const DateElement = ({ values, label, name }) => {
    const { setFieldValue } = useFormikContext();
    return (
        <div className="flex justify-between items-center max-w-[330px] max-[400px]:flex-col max-[400px]:items-start mb-2">
            <label htmlFor="startDate" className="font-semibold">{label}
            </label>
            <DatePicker
                id={name}
                name={name}
                selected={values[name]}
                onChange={(date) => setFieldValue(`${name}`, date)}
                className="px-3 py-1 rounded-md border" />
        </div>
    )
}
export default DateElement

DateElement.propTypes = {
    values: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}