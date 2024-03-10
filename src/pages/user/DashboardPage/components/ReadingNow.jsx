import { useContext, useRef, useState } from "react"
import BookContext from "../../../../context/BookContext"
import BookElement from "./BookElement"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import SliderPrevArrow from "./SliderPrevArrow"
import SliderNextArrow from "./SliderNextArrow"
import MoodModal from "./MoodModal"

const ReadingNow = () => {
    const { books } = useContext(BookContext)
    const [showMoodModal, setShowMoodModal] = useState(false)
    const [modalData, setModalData] = useState()
    const arrorRef = useRef(null)

    const booksReading = books?.READING.map(book =>
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
        <div >
            <h2 className="text-xl font-semibold">Reading Now</h2>
            <div className="relative max-w-96">
                <SliderPrevArrow onClick={() => arrorRef.current.slickPrev()} />
                <Slider {...settings} style={{}} ref={arrorRef}>
                    {booksReading}
                </Slider>
                <SliderNextArrow onClick={() => arrorRef.current.slickNext()} />
            </div>
            {showMoodModal && <MoodModal closeModal={closeMoodModal} book={modalData} />}
        </div>
    )
}
export default ReadingNow