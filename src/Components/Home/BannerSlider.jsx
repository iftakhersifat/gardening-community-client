import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    message: 'Grow Together',
    image: '/assets/g5.webp',
    buttonText: 'Join Now',
  },
  {
    message: 'Urban Gardening Made Simple',
    image: '/assets/g6.jpg',
    buttonText: 'Learn More',
  },
  {
    message: 'Your Green Journey Starts Here',
    image: '/assets/g4.jpg',
    buttonText: 'Get Started',
  },
];

export default function BannerSlider() {
  return (
    <div className="mx-auto h-[400px]">
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
              className="flex flex-col items-center justify-center text-center text-white h-full px-4"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className=" bg-opacity-50 p-6 rounded-lg">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow">
                  {slide.message}
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
