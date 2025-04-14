<script setup>
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { defineProps } from "vue";
// Start your component logic here
const props = defineProps(["title"]);
defineEmits(["close-form"]);
</script>

<template>
  <div class="modal-wrapper">
    <!--  Start your component template here -->

    <div class="modal-wrapper-inner">
      <div class="modal-title">
        <h1>{{ title }}</h1>
        <XMarkIcon class="modal-x-icon" @click="$emit('close-form')" />
      </div>
      <slot>No Modal Defined</slot>
    </div>
  </div>
</template>
