import { useContext } from "react"
import BookContext from "../../../../context/BookContext"
import BookElement from "./BookElement"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import SliderPrevArrow from "./SliderPrevArrow"


const ReadingNow = () => {
    const { books } = useContext(BookContext)

    const booksReading = books?.READING.map(book =>
        <BookElement key={book.id} book={book} />
    )

    console.log(books?.READING)

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SliderPrevArrow />
    };

    return (
        <div>
            <h2 className="text-xl font-semibold">Reading Now</h2>
            <Slider {...settings}>


                {booksReading}

            </Slider>
        </div>
    )
}
export default ReadingNow