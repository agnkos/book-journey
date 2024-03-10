import { useContext } from "react"
import BookContext from "../../../../context/BookContext"
import BookElement from "./BookElement"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import SliderPrevArrow from "./SliderPrevArrow"
import SliderNextArrow from "./SliderNextArrow"


const ReadingNow = () => {
    const { books } = useContext(BookContext)

    const booksReading = books?.READING.map(book =>
        <BookElement key={book.id} book={book} />
    )

    console.log(books?.READING)

    const settings = {
        dots: true,
        // className: 'max-w-full',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />
    };

    return (
        <div>
            <h2 className="text-xl font-semibold">Reading Now</h2>
            <div className="">

                <Slider {...settings} style={{display: "flex", alignItems: "center"}} className="">


                    {booksReading}

                </Slider>
            </div>
        </div>
    )
}
export default ReadingNow