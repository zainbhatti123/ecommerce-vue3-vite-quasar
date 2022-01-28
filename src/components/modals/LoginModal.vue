<template>
     <q-dialog persistent v-model="login_modal">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="text-center flex">
          <div class="text-h3 text-red text-weight-medium text-center">Ooppsss !</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="model_close" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6 q-mb-lg text-center">
              Please sign in for order placement 
          </div>
          <div class="text-center q-mb-md">
            <q-btn color="primary" size="md" label="Login" to="/login" /> 
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script setup>

defineProps({
    login_modal:Boolean,
})

const emit = defineEmits(['modal_close'])

const model_close = () => {
  emit('modal_close');
}

</script>