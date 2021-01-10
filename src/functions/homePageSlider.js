import axios from 'axios'

export const createSlider = async (slider, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/slide`, slider,
        {
            headers: {
                authtoken
            }
        });

export const getSlides = async () =>
    await axios.get(`${process.env.REACT_APP_API}/slides`);


export const getOneSlide = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/slide/${slug}`);

export const removeSlide = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/slide/${slug}`,
        {
            headers: {
                authtoken
            }
        });

export const updateSlide = async (slug, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/slide/${slug}`,
        {
            headers: {
                authtoken
            }
        })