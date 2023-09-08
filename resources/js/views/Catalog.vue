<template>
    <div class="container">
        <div class="row catalog">
            <div class="catalog_wrapper">
                <ul class="catalog_products">
                    <li v-for="product in this.products">
                        <product :product=product>
                        </product>
                    </li>
                </ul>
            </div>
            <div class="catalog_cart-wrapper">
                <cart class="catalog_cart">
                </cart>
            </div>
        </div>
    </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import Product from "../components/Product.vue";
import Cart from "../components/Cart.vue";
import store from "../store";

export default {
    components: {Cart, Product, Carousel},
    data() {
        return {
            products: [],
        }
    },
    mounted() {
        // This method will be called when the component is loaded
        this.updateProducts();
        this.updateCart();

    },
    computed: {},
    methods: {
        cancel() {
            this.showmodal = false;
            this.form.reset();
        },
        updateProducts() {
            axios.get('/catalog/products')
                .then(response => {
                    console.log(response.data);
                    this.products = response.data;
                })
                .catch(error => {
                    this.$swal({
                        type: 'error',
                        title: 'Oops...',
                        text: error
                    });
                });
        },
        updateCart() {
            store.dispatch("loadCartFromLocalStorage");
        }
    }
}
</script>
