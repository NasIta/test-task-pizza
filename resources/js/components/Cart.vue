<template>
    <div class="cart_modal-wrapper">
        <simple-modal v-show="cartModal" @close="cartModal = false" title="Корзина" class="cart_modal">
            <div class="" v-if="store.getters.inCart.length > 0" >
                <div class="cart_products__scroll">
                    <div class="cart_products" v-for="product in store.getters.inCart">
                        <div class="cart_product">
                            <div class="cart_product">
                                <img :src="product.image" :alt="product.name" class="cart_product-image">
                                <div class="cart_product-text">
                                    <div class="cart_product-title">{{ product.name }}</div>
                                    <div class="cart_product-price">{{product.price}}₽ * {{product.quantity}} = {{ product.price * product.quantity }}</div>
                                </div>
                            </div>
                            <button class="btn btn-danger cart_remove-button" @click="removeFromCart(product)">
                                <span>X</span>
                            </button>
                        </div>
                    </div>
                </div>
                <a class="btn btn-danger" href="/order">
                    Оформить заказ
                </a>
                <span class="">Итого: {{store.getters.totalPrice}}₽</span>
            </div>
            <div v-if="store.getters.inCart.length === 0">
                Корзина пуста.
            </div>
        </simple-modal>
        <button type="button" class="btn btn-dark cart_modal-button" @click="cartModal = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
            <span class="cart_modal-button-counter" v-if="store.getters.totalProducts > 0" >{{store.getters.totalProducts}}</span>
        </button>
    </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import Product from "../components/Product.vue";
import SimpleModal from "./SimpleModal.vue";
import store from '../store';

export default {
    components: {SimpleModal, Product, Carousel},
    data() {
        return {
            cartModal: false,
        }
    },
    mounted() {

    },
    computed: {
        store() {
            return store
        }
    },
    methods: {
        removeFromCart(product) {
            store.dispatch('removeFromCart', product.id);
        }
    }
}

</script>
