import axios from 'axios'

export const orderDelete = async (_id, authtoken) =>
    axios.delete(`${process.env.REACT_APP_API}/order/delete/${_id}`,
        {
            headers: {
                authtoken
            }
        }
    )