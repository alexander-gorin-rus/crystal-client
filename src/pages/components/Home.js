import React, { useState, useEffect } from 'react'
//import Molecule1 from '../../images/molecule2.png'
import { getHomePage } from '../../functions/homePage';
import imageDefault from '../../images/image_1.jpg'


export const Home = () => {

    const [homePage, setHomePage] = useState([]);

    useEffect(() => {
        getHomePage().then((res) => setHomePage(res.data))
        //console.log(JSON.stringify(homePage, null, 4))
    }, [])


    return (
        <div>
            {homePage.map((h) => (
                <>
                    <div style={{ position: "absolute", top: "10%", width: "100%", height: "20px" }} >
                        <p style={{ position: "relative", top: "0%", textAlign: "center" }} className=" h4 pt-2" key={h._id}>{h.title}</p>
                    </div>

                    <div style={{ position: "absolute", top: "30%", width: "100%", height: "30%" }} >
                        <p style={{ position: "relative", top: "0%", textAlign: "center" }}>{h.info}</p>
                    </div>

                    <div style={{ position: "absolute", top: "60%", width: "100%", height: "2%" }} >
                        <p style={{ position: "relative", top: "0%", textAlign: "end" }}>{h.address}</p>
                    </div>

                    <div style={{ position: "absolute", top: "80%", width: "100%", height: "2%" }} >
                        <p style={{ position: "relative", top: "0%", textAlign: "end", }}>{h.email}</p>
                    </div>

                    <div style={{ position: "absolute", top: "90%", width: "100%", height: "2%" }} >
                        <p style={{ position: "relative", top: "0%", textAlign: "end" }}>{h.phone}</p>
                    </div>

                    <img src={h.images && h.images.length ? h.images[0].url : imageDefault}
                        style={{ height: '100vh', width: "100vw", objectFit: "cover" }}
                        className="p-1"
                    />
                </>
            ))}
        </div>
    )
}

export default Home;