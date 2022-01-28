<template>
    <q-drawer
        v-model="props.drawer_option"
        :width="550"
        side="right"
        overlay
        bordered
        class="bg-white"
      >
        <q-scroll-area class="fit">
          <q-list v-if="items.length > 0">
            <template v-for="(item, index) in items" :key="index">
              <div class="q-mb-sm border-bottom q-py-md q-px-md">
                <div class="row items-center">
                  <div class="col-2">
                    <q-img fit :src="item.img" />
                  </div>
                  <div class="col-4 q-pl-md flex items-center">
                    <div class="text-subtitle1 text-weight-medium text-dark">{{item.title}}</div>
                  </div>
                  <div class="col-3">
                    <div class="row no-wrap full-width">
                      <q-btn color="primary" icon="remove" @click="item.init_quantity > 1 ? item.init_quantity -- : removeItem(index, item)" class="q-py-none q-px-xs no-border-radius" :round="false" size="sm" />
                      <div class="bg-blue text-white q-py-xs text-center full-width">{{item.init_quantity}}</div>
                      <q-btn color="primary" icon="add" :disable="item.quantity == item.init_quantity" @click="item.init_quantity ++" class="q-py-none q-px-xs no-border-radius" size="sm" />
                    </div>
                  </div>
                  <div class="col-3 text-right text-dark">
                    {{(item.init_quantity * item.fixed_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}} {{item.currency}}
                    <q-btn color="red" round icon="close" padding="xs" size="xs" class="q-ml-xs" @click="removeFromCart(index, item)">
                      <q-tooltip class="bg-red" anchor="top middle" self="bottom middle" :offset="[10, 10]">Remove</q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </div>
              <q-separator />
            </template>
            <div class="text-right q-mb-xl q-mt-md q-mx-lg">
              <div class="text-subtitle1">
                Total Price: <strong class="q-ml-sm">{{total_price}}</strong>
              </div>
              <q-btn color="primary" rounded label="Go to Checkout" class="full-width q-mt-lg q-py-sm text-weight-bold text-subtitle1" icon="check" to="checkout" @click="closeDrawer" />
            </div>
          </q-list>
          <q-list class="flex items-center justify-center fullscreen" v-else>
            <div class="text-h4 text-red text-weight-bold">
              Cart is empty
            </div>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <div class="page-overlay" v-if="drawer_option" @click="emit('drawer_close');"></div>
</template>


<script setup>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from 'vuex';

const store = useStore();
const items = ref([]);


const props = defineProps({
    drawer_option:Boolean
})

const emit = defineEmits(['drawer_close']);

const closeDrawer = () => {
  emit('drawer_close');
  items.value = [];
}

onMounted(() => {
  items.value = store.state.carted_items;
});

const removeItem = ((index, item) => {
  store.commit('removeItems', {index , item});
  item.init_quantity -- ;
});

const removeFromCart = ((index, item) => {
  item.init_quantity = 0;
  store.commit('removeItems', {index , item});
});

const total_price = computed(() => {
  return items.value.reduce((total, item) => {
    var price = total+(item.fixed_price * item.init_quantity);
    return price;
  }, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
})

</script>