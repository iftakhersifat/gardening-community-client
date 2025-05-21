import React from 'react';
import BannerSlider from './BannerSlider';
import FeaturedGardeners from './FeaturedGardeners';
import Testimonials from './Testimonials';
import GardeningEvents from './GardeningEvents';
import TopTrendingTips from './TopTrendingTips';

const Home = () => {
    return (
        <div className='container mx-auto mt-10 mb-10'>
            <BannerSlider></BannerSlider>
            <FeaturedGardeners></FeaturedGardeners>

            <TopTrendingTips></TopTrendingTips>

            <GardeningEvents></GardeningEvents>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;