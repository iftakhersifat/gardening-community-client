import React from 'react';
import BannerSlider from './BannerSlider';
import FeaturedGardeners from './FeaturedGardeners';
import Testimonials from './Testimonials';
import ToolsResources from './ToolsResources';
import GardeningEvents from './GardeningEvents';

const Home = () => {
    return (
        <div className='container mx-auto mt-10 mb-10'>
            <BannerSlider></BannerSlider>
            <FeaturedGardeners></FeaturedGardeners>
            {/* <GardeningEvents></GardeningEvents> */}
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;