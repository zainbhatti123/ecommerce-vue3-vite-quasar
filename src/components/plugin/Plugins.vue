<template>
    <q-page-container class="q-mt-xl text-center">
        <div class="text-subtitle1 q-mb-md">Ajax Component</div>
        <!-- Ajax bar -->
        <q-ajax-bar
        ref="bar"
        position="top"
        color="white"
        size="4px"
        skip-hijack
        />
        <q-btn color="primary" label="Trigger with api request" @click="trigger" />


        <!-- Modal -->

        <div class="text-subtitle1 q-mt-md">Modals Component</div> 
        <div class="q-pa-md q-gutter-sm">
            <q-btn label="Light" color="primary" @click="lightDialog = true" />
            <q-btn label="Dark" color="grey-8" @click="darkDialog = true" />

            <q-dialog v-model="lightDialog">
            <q-card>
                <q-bar>
                <q-icon name="arrow_forward" />
                <div>Your Next Steps</div>

                <q-space />

                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip>Close</q-tooltip>
                </q-btn>
                </q-bar>

                <q-card-section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
                </q-card-section>

                <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
                </q-card-section>
            </q-card>
            </q-dialog>

            <q-dialog v-model="darkDialog" persistent transition-show="flip-up" transition-hide="flip-up">
            <q-card class="bg-primary text-white">
                <q-bar>
                <q-icon name="warning" />
                <div>Are you certain?</div>

                <q-space />

                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
                </q-bar>

                <q-card-section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
                </q-card-section>
            </q-card>
            </q-dialog>
        </div>
    </q-page-container>
</template>


<script setup>
 import axios from 'axios';
 import { ref } from 'vue';

 const bar = ref(null);
 const lightDialog = ref(false);
 const darkDialog = ref(false);



    const trigger = () => {
      const barRef = bar.value
      barRef.start();
        axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
            barRef.stop();
        })
      
    }

</script>