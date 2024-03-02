import BooksImg from '../img/books2.jpg';
import AuthButton from "../components/AuthButton";

const Home = () => {
  return (
    // gap ? jeśli jest miejsce żeby trochę rozsunąć
    <div className="h-screen max-h-full grid grid-rows-[1fr_40px] px-8 py-6 text-center items-center justify-items-center bg-home-bg">
      <div className='flex flex-col items-center justify-around text-center'>

        <h1 className="text-4xl max-[320px]:text-3xl leading-10 mb-4 font-extrabold text-text">
          Welcome to <span className="text-main-accent">BookJourney</span>
        </h1>
        <p className='max-[320px]:text-sm'>cursus risus at ultrices mi tempus imperdiet nulla malesuada</p>
        {/*img: ' max-w-sm w-full' or 'max-h-[45svh]'*/}
        <img src={BooksImg} alt="a stack of books illustration" className="mx-auto my-4 max-h-[45svh]" />
        <div className="w-full flex flex-col items-center gap-4 max-w-xs">
          <AuthButton text="Log In" link='/login' />
          <AuthButton text="Sign Up" link='/signup' />
        </div>
      </div>
      <p className="text-xs text-main-accent self-end">Image by<a href="https://pl.freepik.com/darmowe-wektory/recznie-rysowane-plaski-stos-ksiazek-ilustracji_24307396.htm#query=book&position=4&from_view=search&track=sph&uuid=b4d24fca-f528-4726-aa10-74d391a4ced2">Freepik</a></p>
    </div>
  )
}

export default Home
