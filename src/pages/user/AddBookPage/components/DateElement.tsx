import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useFormikContext, FieldAttributes } from 'formik';
import PropTypes from 'prop-types';

type FormValuesType = {
    title: string,
    author: string,
    status: string,
    rate: string | number,
    review: string,
    moods: string | string[],
    mood: string,
    moodsrate: {
        in_love: number,
        happy: number,
        relaxed: number,
        intrigued: number,
        scared: number,
        tense: number,
        nostalgic: number,
        sad: number
    },
    startDate: string | number | null,
    endDate: string | number | null,
}

interface DateElementPropsType extends FieldAttributes<any> {
    label: string,
    name: keyof FormValuesType,
    values: FormValuesType
}


const DateElement = ({ values, label, name }: DateElementPropsType) => {
    const { setFieldValue } = useFormikContext();

    const selectedDate = values[name] ? new Date(values[name] as string) : null

    return (
        <div className="flex justify-between items-center max-w-[330px] max-[400px]:flex-col max-[400px]:items-start mb-2">
            <label htmlFor="startDate" className="font-semibold">{label}
            </label>
            <DatePicker
                id={name}
                name={name}
                // selected={values[name]}
                selected={selectedDate}
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