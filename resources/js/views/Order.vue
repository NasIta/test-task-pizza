<template>
    <div class="container">
        <div class="row">
            <div class="col-md-7">
                <form action="/cart/order" method="post" class="order_form">
                    <input type="hidden" name="_token" v-bind:value="this.csrfToken">
                    <label for="name">*Имя:</label>
                    <input required type="text" name="name" id="name" class="order_form-item" v-model="formData.name">
                    <label for="phone">*Телефон:</label>
                    <input required type="tel" placeholder="+7 (XXX) XXX-XX-XX" name="phone" id="phone" class="order_form-item" v-model="formData.phone">
                    <label for="address">*Адрес:</label>
                    <input required type="text" name="address" id="address" class="order_form-item" v-model="formData.address">
                    <label for="comment">Комментарий:</label>
                    <input type="text" name="comment" id="comment" class="order_form-item" v-model="formData.comment">
                    <a href="javascript:void(0)" @click="submitForm">Заказать</a>
                </form>
                <alert v-if="successModal" :type="'success'" :message="'Заказ успешно оформлен, ожидайте обратной связи от оператора'"></alert>
            </div>
            <div class="col-md-5">
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
                    <span class="">Итого: {{store.getters.totalPrice}}₽</span>
<!--                    <message-box v-if="successModal" title="Успех!" message="Заказ успешно оформлен, ожидайте обратной связи от оператора!"></message-box>-->
                </div>
                <div v-if="store.getters.inCart.length === 0">
                    Корзина пуста.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import SimpleModal from "../components/SimpleModal.vue";
    import Product from "../components/Product.vue";
    import Carousel from "../components/Carousel.vue";
    import store from "../store";
    import MessageBox from "../components/MessageBox.vue";
    import Alert from "../components/Alert.vue";

    export default {
        components: {Alert, MessageBox, SimpleModal, Product, Carousel},
        data() {
            return {
                successModal: false,
                csrfToken: '',
                formData: {
                    name: '',
                    phone: '',
                    address: '',
                    comment: '',
                }
            }
        },
        mounted() {
            this.updateCart();
            this.csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        },
        computed: {
            store() {
                return store
            }
        },
        methods: {
            removeFromCart(product) {
                store.dispatch('removeFromCart', product.id);
            },
            updateCart() {
                store.dispatch("loadCartFromLocalStorage");
            },
            submitForm() {
                if(this.formData.name !== '' && this.formData.address !== '' && this.formData.phone !== '' && store.getters.totalProducts > 0) {
                    axios.post('/cart/order', {formData: this.formData, cart: store.getters.inCart})
                        .then(response => {
                            this.successModal = true;
                            this.clearCart();
                        })
                        .catch(error => {
                            console.error(error)
                        });
                }

            },
            clearCart() {
                store.dispatch("clearCart");
            }
        }
	}
</script>
