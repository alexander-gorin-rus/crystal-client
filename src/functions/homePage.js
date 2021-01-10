import axios from 'axios'

export const createHomePage = async (homePage, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/home-create`, homePage,
        {
            headers: {
                authtoken
            }
        });

export const getHomePage = async () =>
    await axios.get(`${process.env.REACT_APP_API}/home`);

export const getOneForUpdate = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/home/${slug}`);

export const updateHomePage = async (slug, homeP, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/home-update/${slug}`, homeP, {
        headers: {
            authtoken
        }
    });

export const removeHomePage = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/home-delete/${slug}`, {
        headers: {
            authtoken
        }
    });


export const homeBackgroundCreate = async (background, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/home-background`, background, {
        headers: {
            authtoken
        }
    });

export const homeBackgroundGet = async () =>
    await axios.get(`${process.env.REACT_APP_API}/home-background`);

export const homeBackgroundReadOne = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/home-background/${slug}`)

export const homeBackgroundUpdate = async (slug, values, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/home-background/${slug}`, values, {
        headers: {
            authtoken
        }
    });

export const homeBackgroundDelete = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/home-background/${slug}`, {
        headers: {
            authtoken
        }
    });