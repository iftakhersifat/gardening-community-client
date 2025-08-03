import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Typewriter } from 'react-simple-typewriter';

const slides = [
  {
    image: '/assets/gg1.jpg',
    buttonText: 'Join Now',
  },
  {
    image: '/assets/gg3.jpg',
    buttonText: 'Learn More',
  },
  {
    image: '/assets/gg4.jpg',
    buttonText: 'Get Started',
  },
];

// These messages will cycle in the typewriter
const typewriterMessages = [
  'Grow Together',
  'Urban Gardening Made Simple',
  'Your Green Journey Starts Here',
];

export default function BannerSlider() {
  return (
    <div className="mx-auto h-[400px] px-4 py-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col items-center rounded-xl justify-center text-center text-white h-full px-4"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="p-6 rounded-lg">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow h-16">
                  <Typewriter
                    words={typewriterMessages}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </h2>
                <button className="px-6 py-3 bg-green-700 hover:bg-green-800 rounded-full text-white font-semibold transition">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
