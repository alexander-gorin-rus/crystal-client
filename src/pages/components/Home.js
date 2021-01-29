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
        //console.log(JSON.stringify(homePage, null, 4))
    }, []);

    useEffect(() => {
        homeBackgroundGet().then(res => {
            setBackImage(res.data)
        }).catch(err =>
            console.log(err))
    }, []);


    return (
        <div style={{ position: "absolute", top: "10vh", left: "0%", width: "100vw", height: "100vh" }}>
            {backImage.map((b, i) => (
                <div key={i}>
                    <div
                        style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "80%",
                            fontSize: "1rem"
                        }} className="backImageFonts">
                        {b.text && b.text.length ? b.text : ""}
                    </div>
                    <img style={{ width: "100vw", height: "100vh", position: "fixed", top: "0%", left: "0%", zIndex: "-10" }} src={b.url} />
                </div>
            ))}
            {homePage.map((h, i) => (
                <div key={i}>
                    <p style={{ position: "relative", top: "0%", textAlign: "center" }} className=" h4 pt-4 mb-4" key={h._id}>{h.title}</p>

                    <ul style={{ listStyle: "none", background: "white", padding: "10px", width: "25vw", margin: "1vw", borderRadius: "10px" }} className="mt-4 homePageFonts" >
                        <li >{h.address}</li>
                        <li>{h.email}</li>
                        <li>{h.phone}</li>
                    </ul>

                    <div className=" h2 font-weight-bold text-center textInfo" style={{ zIndex: "20" }}>
                        <Jumbotron text={h.info} />
                    </div>

                    <div style={{ position: "relative", top: "10vh", width: "100vw" }}>
                        <div style={{ position: "relative", top: "0%", left: "0%", width: "100vw", height: "100vh", }} >

                            <div style={{ margin: "auto", width: "60%", height: "100%" }} >
                                <Carousel autoPlay infiniteLoop >
                                    {slidesList.map((s, i) => (

                                        <img style={{ borderRadius: "10px" }} key={i} src={s.url} alt='info' />
                                    ))}
                                </Carousel>
                            </div>

                            <p className="full-info" >{h.fullInfo}</p>


                        </div>
                    </div>

                </div>
            ))}
        </div>

    )
}

export default Home;