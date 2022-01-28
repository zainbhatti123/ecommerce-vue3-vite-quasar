<template>
  <q-page-container class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="text-h4 text-weight-bold">Products</h4>
      </div>
    </div>
    <div class="q-pa-md row items-start">
      <div
        class="col-3 q-px-sm q-mb-lg"
        v-for="(item, index) in items"
        :id="'item-' + item.id"
        :key="item.id"
      >
        <q-card class="my-card">
          <img :src="item.img" :alt="item.title" />
          <q-card-section>
            <div class="text-h6 text-primary q-mb-sm">{{ item.title }}</div>
            <div class="text-subtitle2">{{ item.description }}</div>
            <div class="pricing-section q-mt-md">
              <span
                class="text-subtitle1 text-grey-6"
                style="text-decoration: line-through"
                >{{ item.less_price }} {{ item.currency }}</span
              >
              <span class="text-h6 q-ml-sm text-blue"
                >{{ item.fixed_price }} {{ item.currency }}</span
              >
            </div>
            <div
              class="text-subtitle2"
              :class="item.quantity < 10 ? 'text-red' : 'text-green'"
            >
              <span class="text-subtitle1 text-weight-bold">{{
                item.quantity - item.init_quantity
              }}</span>
              (Pieces)
            </div>
            <q-btn
              @click="additemToCart(item)"
              :color="item.quantity == 0 ? 'red' : 'blue'"
              class="q-mt-md full-width"
              :disable="item.quantity == 0"
              v-if="item.init_quantity === 0"
            >
              {{ item.quantity == 0 ? "Out of Stock" : "Add to Cart" }}
            </q-btn>

            <div class="row no-wrap q-mt-md" v-else>
              <q-btn
                color="red"
                class="q-pa-xs"
                icon="remove"
                @click="
                  item.init_quantity > 1
                    ? item.init_quantity--
                    : removeItem(index, item)
                "
              />
              <div class="bg-blue text-white full-width text-center q-py-sm">
                {{ item.init_quantity }}
              </div>
              <q-btn
                color="red"
                class="q-pa-xs"
                icon="add"
                :disable="item.quantity == item.init_quantity"
                @click="item.init_quantity++"
              />
            </div>
          </q-card-section>
          <q-badge
            floating
            color="red"
            class="q-pa-sm text-subtitle1"
            rounded
            >{{ item.discount }}</q-badge
          >
        </q-card>
      </div>
    </div>
  </q-page-container>

  <LoginModal :login_modal="login_dialog" @modal_close="loginModelClose" />
</template>


<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import data from "../../response/items.json";
import LoginModal from "../modals/LoginModal.vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const items = ref([]);
const login_dialog = ref(false);
const route = useRoute();
const router = useRouter();

// Set items in vuex store
onMounted(() => {
  if (!store.getters.getOrderSuccess) {
    var myData = data.items.map((item) => ({ ...item, init_quantity: 0 }));
    store.commit("setAllItems", myData);
  }
  items.value = store.state.items[0];
  items.value.filter((item) => {
    item.init_quantity = 0;
  });
});

// get items from store getters
const getItem = computed(() => {
  return store.getters.getItems;
});

const loginModelClose = () => {
  login_dialog.value = !login_dialog.value;
};

// Item add in cart
const additemToCart = (item) => {
  if (store.getters.isAuthenticate) {
    store.commit("setItems", item);
    var incre = item.init_quantity + 1;
    item.init_quantity = incre;
  } else {
    login_dialog.value = !login_dialog.value;
  }
};

// Item remove from cart
const removeItem = (index, item) => {
  store.commit("removeItems", { index, item });
  item.init_quantity--;
};
</script>