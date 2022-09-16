import {ADD_TO_CART} from "../constants/cartConstants";


export const userReducer = (state = { cartItems: [] }, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const item =action.payload;

            const isItemExist =state
            
            break;
    
        default:
            state;
    }
}
