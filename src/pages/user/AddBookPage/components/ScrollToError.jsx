import { useFormikContext } from "formik"
import { useEffect } from "react"

const ScrollToError = () => {
    const formik = useFormikContext()
    const submitting = formik?.isSubmitting;

    useEffect(() => {
        // console.log(formik.errors)
        // console.log('values error', Object.values(formik.errors)[0])
        // const el = document.querySelector('.text-red-500')
        const el = document.querySelector('h1')

        el.scrollIntoView({ behavior: 'smooth' })
    }, [submitting])

    return null
}
export default ScrollToError