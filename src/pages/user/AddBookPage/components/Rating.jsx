import { StarIcon } from '@heroicons/react/16/solid'
import { useFormikContext } from 'formik'
import { useState } from 'react'

const Rating = () => {

    const { values, setFieldValue } = useFormikContext()
    const [hover, setHover] = useState(null)

    const setRating = (e) => {
        console.log(e.currentTarget.id)
        setFieldValue('rate', e.currentTarget.id)
    }

    const starElements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num =>
    (<div key={num} >
        <StarIcon
            className={`w-7 h-7 ${(hover || values.rate) >= num ? 'fill-link-active-hover' : 'fill-light-objects'} 
      \
            `}
            id={num}
            onClick={setRating}
            onMouseEnter={() => setHover(num)}
            onMouseLeave={() => setHover(null)}
        />
    </div>)
    )

    return (
        <div className='flex cursor-pointer'>{starElements}</div>
    )
}
export default Rating
