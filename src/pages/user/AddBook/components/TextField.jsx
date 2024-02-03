import { Field } from "formik";
import PropTypes from 'prop-types'

const TextField = ({ name, label }) => {
    return (
        <div className="flex flex-col mb-3 max-w-[400px] min-[500px]:flex-row min-[500px]:items-center min-[500px]:max-w-[500px]">
            <label htmlFor={name} className="font-semibold min-[500px]:w-20">{label}</label>
            <Field
                type="text"
                name={name}
                className="px-3 py-1 rounded-md border grow max-[400px]:w-11/12" />
        </div>
    )
}
export default TextField

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
