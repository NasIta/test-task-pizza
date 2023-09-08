import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        inCart: [],
    },
    getters: {
        inCart: (state) => state.inCart,
        totalPrice: (state) => state.inCart.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0),
        totalProducts: (state) => state.inCart.reduce((accumulator, product) => accumulator + product.quantity, 0),
    },
    mutations: {
        ADD_TO_CART(state, product) {
            const updatedCart = [...state.inCart];
            let productExists = false;

            for (const item of updatedCart) {
                if (item.id === product.id) {
                    item.quantity += 1;
                    productExists = true;
                    break;
                }
            }
            if (!productExists) {
                updatedCart.push({...product, quantity: 1});
            }
            state.inCart = updatedCart;
        },
        CLEAR_CART(state) {
            state.inCart = [];
        },
        REMOVE_FROM_CART(state, productId) {
            state.inCart = state.inCart.map((item) => {
                if (item.id === productId) {
                    let updatedCartItem = {...item, quantity: item.quantity - 1};
                    if (updatedCartItem.quantity <= 0) {
                        return null;
                    }
                    return updatedCartItem;
                }
                return item;
            }).filter((element) => element !== null);
        },
        SAVE_CART_TO_LOCAL_STORAGE(state) {
            try {
                const serializedCart = JSON.stringify(state.inCart);
                localStorage.setItem('cart', serializedCart);
            } catch (error) {
                console.error('Error saving cart to local storage:', error);
            }
        },
        LOAD_CART_FROM_LOCAL_STORAGE(state) {
            try {
                const serializedCart = localStorage.getItem('cart');
                state.inCart = JSON.parse(serializedCart) || [];
            } catch (error) {
                console.error('Error: failed to load cart from local storage:', error);
                return [];
            }
        },
    },
    actions: {
        addToCart(context, product) {
            context.commit('ADD_TO_CART', product);
            context.commit('SAVE_CART_TO_LOCAL_STORAGE');
        },
        removeFromCart(context, productId) {
            context.commit('REMOVE_FROM_CART', productId);
            context.commit('SAVE_CART_TO_LOCAL_STORAGE');
        },
        saveCartToLocalStorage(context) {
            context.commit('SAVE_CART_TO_LOCAL_STORAGE');
        },
        loadCartFromLocalStorage(context) {
            context.commit('LOAD_CART_FROM_LOCAL_STORAGE');
        },
        clearCart(context) {
            context.commit('CLEAR_CART');
            context.commit('SAVE_CART_TO_LOCAL_STORAGE');
        }
    },
});
