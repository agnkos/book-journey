import { useFormikContext } from "formik"
import { useEffect } from "react"

const ScrollToTop = () => {
    const formik = useFormikContext()
    const submitting = formik?.isSubmitting;

    useEffect(() => {
        const el = document.querySelector('h1')
        setTimeout(() => {
            el?.scrollIntoView({ behavior: 'smooth' })
        }, 1000);
    }, [submitting])

    return null
}
export default ScrollToTop