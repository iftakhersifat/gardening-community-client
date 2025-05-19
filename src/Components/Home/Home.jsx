import React from 'react';
import BannerSlider from './BannerSlider';
import FeaturedGardeners from './FeaturedGardeners';

const Home = () => {
    return (
        <div className='container mx-auto mt-10 mb-10'>
            <BannerSlider></BannerSlider>
            <FeaturedGardeners></FeaturedGardeners>
        </div>
    );
};

export default Home;