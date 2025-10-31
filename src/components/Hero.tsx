import Carousel from './Carousel';

const Hero = () => {
  return (
    <section className="main-content">
      <div className="w-full flex flex-col items-center text-center relative z-10" style={{ paddingTop: '80px', paddingBottom: '2rem' }}>
        {/* Title */}
        <h2 className="font-bold mb-12 text-black" style={{
          fontSize: '60px',
          fontFamily: "'Work Sans', system-ui, sans-serif",
          fontWeight: 200,
          letterSpacing: '-0.02em'
        }}>
          For the Love of the Game
        </h2>
        
        {/* Carousel Container */}
        <div className="carousel-container relative w-full h-96 mb-12" style={{ marginTop: '-75px' }}>
          <Carousel />
        </div>
        
        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Welcome to my portfolio, my name is Peter Tran I am a CS student who enjoys learning, photography, art and much more!
        </p>
      </div>
    </section>
  );
};

export default Hero;