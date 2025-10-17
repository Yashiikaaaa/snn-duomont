import React from 'react';
import image from '../assets/overview/overviewsnn.jpg';
import Button from '../components/button/buttonMain';
import { useLeadTracking, LEAD_SOURCES } from '../hooks/useLeadTracking';

// Overview Component
export const Overview = ({ openContactModal }) => {
  const { trackButtonClick } = useLeadTracking();
  return (
    <div className="bg-PrestigeGrey">
      <section
        className="w-full flex flex-wrap items-center justify-center gap-[20px] mx-auto pb-10 md:py-16 px-5 md:px-[7.5rem]"
        id="Overview"
      >
        {/* Overview Text Section */}
        <div className="flex flex-col justify-center items-center text-center gap-8 h-full md:items-start md:text-left">
          <h1 className="font-subheading font-normal text-3xl md:text-5xl text-black uppercase">
            Overview
          </h1>
          <p className="max-w-2xl md:text-base text-sm text-black font-body font-light">
          <span className="font-body font-bold text-xs md:text-lg ">
        
SNN Duomont: Luxury Doubled at Kudlu Junction
         </span>
          <br />
          
            <span>
        <br />    <p> SNN Duomont by SNN Estates brings double-height living, dining, and balcony spaces that redefine modern luxury. Spread across 2 acres and 12 guntas with 4 towers rising 15 floors, it offers 3, 4, 6, and 8 BHK homes sized from 2,810 to 7,110 sq. ft.<p/>
            <br/>
            <p>Located at Kudlu Junction, just off Hosur Road, the project ensures seamless access to IT hubs, schools, and lifestyle destinations. With Sky Deck amenities, a Gold Class Clubhouse, and prices starting from ₹4.25 Cr onwards, SNN Duomont blends timeless design with unmatched comfort—where luxury truly doubles.</p></p>

            

</span>
          </p>

          {/* Enquire Now Button using the reusable Button component */}
          <Button
                text="Enquire Now!"
                className=""
                onClick={() => {
                  trackButtonClick(LEAD_SOURCES.OVERVIEW, 'enquire_now', 'Overview Section CTA');
                  openContactModal(LEAD_SOURCES.OVERVIEW);
                }}
              />
          
        </div>

        {/* Image and Download Button Section */}
        <div className="hidden md:flex flex-col items-center">
          {/* Image Section */}
          <div className="w-full h-auto flex justify-center border-PrestigeDarkGrey">
            <img
              src={image}
              alt="Prestige Autumn Leaves"
              className=" w-[420px] h-[300px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
