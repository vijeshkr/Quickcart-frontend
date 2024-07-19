import React, { useEffect, useState } from 'react'
import img1 from '../assets/banner/img1.jpg';
import img2 from '../assets/banner/img2.jpg';
import img3 from '../assets/banner/img3.jpg';
import img4 from '../assets/banner/img4.jpg';
import img5 from '../assets/banner/img5.jpg';
import img6 from '../assets/banner/img6.jpg';
import img7 from '../assets/banner/img7.jpg';
import img8 from '../assets/banner/img8.jpg';

import mobile1 from '../assets/banner/mobile1.jpg';
import mobile2 from '../assets/banner/mobile2.jpg';
import mobile3 from '../assets/banner/mobile3.jpg';
import mobile4 from '../assets/banner/mobile4.jpg';
import mobile5 from '../assets/banner/mobile5.jpg';
import mobile6 from '../assets/banner/mobile6.jpg';
import mobile7 from '../assets/banner/mobile7.jpg';
import mobile8 from '../assets/banner/mobile8.jpg';

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const Banner = () => {

    const [ currentImage, setCurrentImage ] = useState(0);

    const desktopImages = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
    ];

    const mobileImages = [
        mobile1,
        mobile2,
        mobile3,
        mobile4,
        mobile5,
        mobile6,
        mobile7,
        mobile8,
    ];

     // Function to move to the next image
     const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1)
        }
    };

    // Function to move to the previous image
    const preveImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1)
        }
    };

    // useEffect hook for carouser slide image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if(desktopImages.length -1 > currentImage) {
                nextImage();
            }else {
                setCurrentImage(0);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImage]);
  return (
    <div className='container mx-auto px-4 rounded'>
        <div className='h-full lg:h-[450px] w-full bg-slate-200 relative'>
            {/* Buttons for previous and newt images, visible only desktop and tablet */}
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl'>
                    <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'>
                    <FaAngleLeft/>
                    </button >
                    <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'>
                    <FaAngleRight/>
                    </button>
                </div>

            </div>

            {/* Desktop banner carousel */}
            <div className='hidden lg:flex h-full w-full overflow-hidden'>
                {
                    desktopImages.map((imageUrl, index) => (
                        <div className='w-full h-full min-w-full transition-all' key={index} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                            <img className='w-full h-full object-cover' src={imageUrl} alt="" />
                        </div>
                    ))
                }
            </div>

            {/* Mobile banner */}
            <div className='flex h-full w-full overflow-hidden lg:hidden'>
                {
                    mobileImages.map((imageURl,index)=>{
                        return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={index} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                            <img src={imageURl} className='w-full h-full object-cover'/>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Banner;