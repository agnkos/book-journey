import { Field, useField, FieldAttributes } from 'formik'
import PropTypes from 'prop-types'
// import { FormValuesType } from '../../../../types'

type FormValuesType = {
    // [index: string]: number,
    title: string,
    author: string,
    status: string,
    rate: string | number,
    review: string,
    moods: string | string[],
    mood: string,
    // moodsrate: {
    //     in_love: number,
    //     happy: number,
    //     relaxed: number,
    //     intrigued: number,
    //     scared: number,
    //     tense: number,
    //     nostalgic: number,
    //     sad: number
    // },
    moodsrate: {
        [key: string]: number;
    };
    startDate: string | number | null,
    endDate: string | number | null,
}

interface RangeFieldProps extends FieldAttributes<any> {
    name: string,
    values: FormValuesType
}

const RangeFieldEl = ({ values, ...props }: RangeFieldProps) => {
    const [field] = useField(props)
    const value = field.name.startsWith('moodsrate') ? values.moodsrate[field.name.slice(10)] : values[field.name as keyof FormValuesType]

    return (
        <div className="flex gap-2">
            <Field
                type="range"
                min="1"
                max="10"
                {...field}
                {...props}
                className="max-[390px]:w-24"
            />
            <span>{value?.toString()}</span>
        </div>
    )
}
export default RangeFieldEl

RangeFieldEl.propTypes = {
    values: PropTypes.object
}