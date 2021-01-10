import React, { useState, useEffect } from 'react'
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


const HomePageSlider = ({ slides }) => {

    const [current, setCurrent] = useState(0);
    const length = slides.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current => current + 1)
        }, 2000);

        return () => clearInterval(interval)
    }, [])

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null
    }

    return (
        <>
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
            <section className="slider1" >

                {SliderData.map((s, i) => (
                    <div className={i === current ? 'slide active' : 'slide'} key={i}>
                        {i === current && (
                            <img src={s.image} alt='info' className="image" />)}

                    </div>

                ))}
            </section>
        </>
    )
}

export default HomePageSlider
