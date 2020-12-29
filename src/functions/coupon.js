import axios from 'axios';

export const getCoupons = async () =>
    await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (authToken, couponId) =>
    await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
        headers: {
            authToken
        }
    });

export const createCoupon = async (authToken, coupon) =>
    await axios.post(`${process.env.REACT_APP_API}/coupon`,
        { coupon },
        {
            headers: {
                authToken
            }
        });
