import BooksImg from '../img/books.jpg';
import AuthButton from "../components/AuthButton";

const Home = () => {
  return (
    <div className="h-screen max-h-full flex flex-col px-8 py-6 text-center items-center justify-center bg-home-bg">
      <h1 className="text-4xl max-[320px]:text-3xl leading-10 mb-4 font-extrabold text-text">
        Welcome to <span className="text-main-accent">BookJourney</span>
      </h1>
      <p className='max-[320px]:text-sm'>cursus risus at ultrices mi tempus imperdiet nulla malesuada</p>
      <img src={BooksImg} alt="a stack of books illustration" className="w-4/5 mx-auto max-w-sm" />
      <div className="w-11/12 flex flex-col items-center gap-4 max-w-sm">
        <AuthButton text="Log In" link='/login' />
        <AuthButton text="Sign Up" link='/signup' />
      </div>
      <p className="text-xs text-main-accent fixed bottom-4 left-2/4 -translate-x-2/4">Image by<a href="https://pl.freepik.com/darmowe-wektory/recznie-rysowane-plaski-stos-ksiazek-ilustracji_24307396.htm#query=book&position=4&from_view=search&track=sph&uuid=b4d24fca-f528-4726-aa10-74d391a4ced2">Freepik</a></p>
    </div>
  )
}

export default Home
