import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import BookElement from "./BookElement"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import SliderPrevArrow from "./SliderPrevArrow"
import SliderNextArrow from "./SliderNextArrow"
import MoodModal from "./MoodModal"
import useBook from "../../../../hooks/useBook"

const ReadingNow = () => {
    const { books } = useBook()
    const [showMoodModal, setShowMoodModal] = useState(false)
    const [modalData, setModalData] = useState()
    const arrorRef = useRef(null)

    const booksReading = books?.READING?.map(book =>
        <BookElement key={book.id} book={book} setModalData={setModalData} setShowMoodModal={setShowMoodModal} />
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const closeMoodModal = () => setShowMoodModal(false)

    return (
        <>
            <h2 className="text-xl font-semibold">Reading Now</h2>
                {books && Object.hasOwn(books, 'READING') ?
                    (<div className="relative max-w-96 mx-auto">
                        <SliderPrevArrow onClick={() => arrorRef.current.slickPrev()} />
                        <Slider {...settings} style={{}} ref={arrorRef}>
                            {booksReading}
                        </Slider>
                        <SliderNextArrow onClick={() => arrorRef.current.slickNext()} />
                    </div>) :
                    <div className="py-4">
                        <p>You are not reading anything now.</p>
                        <p><Link to='/search' className="text-main-accent hover:text-main-accent-hover">Search</Link> for inspiration.</p>
                    </div>
                }
                {showMoodModal && <MoodModal closeModal={closeMoodModal} book={modalData} />}
        </>
    )
}
export default ReadingNow