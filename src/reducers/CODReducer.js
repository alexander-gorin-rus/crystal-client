import renderEmpty from "antd/lib/config-provider/renderEmpty"

export const CODReducer = (state = false, action) => {
    switch (action.type) {
        case "COD":
            return action.payload;
        default:
            return state
    }
};