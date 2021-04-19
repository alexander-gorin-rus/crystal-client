import React, { useState, useEffect } from 'react'
import { getHomePage, homeBackgroundGet } from '../../functions/homePage';
import { getSlides } from '../../functions/homePageSlider';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Jumbotron from '../components/cards/Jumbotron';


export const Home = () => {

    const [homePage, setHomePage] = useState([]);
    const [backImage, setBackImage] = useState([]);

    const [slidesList, setSlidesList] = useState([]);

    useEffect(() => {
        getSlides().then(res => {
            setSlidesList(res.data)
        }).catch(err =>
            console.log(err))
    }, []);



    useEffect(() => {
        getHomePage().then((res) => setHomePage(res.data))
    }, []);

    useEffect(() => {
        homeBackgroundGet().then(res => {
            setBackImage(res.data)
        }).catch(err =>
            console.log(err))
    }, []);


    return (
        <div className="custom-home-page">
            {backImage.map((b) => (
                <div key={b._id}>
                    <div
                        className="backImageFonts home-page-optional-text">
                        {b.text && b.text.length ? b.text : ""}
                    </div>
                    <img className="custom-background-image" src={b.url} alt="home-page-background" />
                </div>
            ))}
            {homePage.map((h) => (
                <>
                    <p className=" h4 pt-4 mb-4 company-title" key={h._id}>{h.title}</p>

                    <ul className="mt-4 homePageFonts company-contacts" >
                        <li >{h.address}</li>
                        <li>{h.email}</li>
                        <li>{h.phone}</li>
                    </ul>

                    <div className=" h2 font-weight-bold text-center textInfo" style={{ zIndex: "20" }}>
                        <Jumbotron text={h.info} />
                    </div>

                    <div className="main-container-adsolute">
                        <div className="main-container-relative" >

                            <div className="custom-carousel" >
                                <Carousel autoPlay infiniteLoop >
                                    {slidesList.map((s) => (

                                        <img style={{ borderRadius: "10px" }} key={s._id} src={s.url} alt='info' />
                                    ))}
                                </Carousel>
                            </div>

                            <p className='company-full-info' >{h.fullInfo}</p>


                        </div>
                    </div>

                </>
            ))}
        </div>

    )
}

export default Home;