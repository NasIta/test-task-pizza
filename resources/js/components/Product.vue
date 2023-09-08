<template>
	<div class="product">
        <div class="product">
            <img class="product_image" :src=product.image :alt=product.name>
            <h2 class="product_name">{{ product.name }}</h2>
            <p class="product_price">{{ product.price }}₽</p>
            <button class="button is-success"
                    @click="addToCart(product)">Add to Cart</button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import store from '../store';
	export default {
        props: {
            product: {
                type: Object,
                default: () => ({id: -1, name: '', price: 0, image: '' }),
            }
        },

        methods: {
            addToCart(product){
                store.dispatch('addToCart', product)
            },
        },
	}
</script>
