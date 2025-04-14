<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { XMarkIcon } from "@heroicons/vue/20/solid";
const props = defineProps({
  title: { type: String, default: null },
  show: { type: Boolean, default: false },
});

// emits:
// close-modal as we have a X button to inform parent to close
// transitions-completed to inform parent that modal has completed
// Transition and form component added to slot can be updated to close
defineEmits([
  "close-modal-begin",
  "modal-transitions-started",
  "modal-transitions-completed",
]);

const isTransitioning = ref(false);

function handleClose() {
  if (isTransitioning) {
    // Already in transition, defer the actual close
    console.log(`handleClose already transitioning`);
    return;
  }
  console.log(`new transition`);
  // Start transition locally first
  isTransitioning = true;

  // Only emit close to parent after inner transition completes
}

// Watch show prop changes but break the reactivity chain
watch(
  () => props.show,
  async (newVal, oldVal) => {
    console.log(`props.show change from : ${oldVal} to ${newVal}`);
  },
);
</script>

<template>
  <Transition
    name="blur-background"
    @before-leave="$emit(`modal-transitions-started`)"
    @after-leave="$emit(`modal-transitions-completed`)"
  >
    <div class="modal-wrapper" v-show="show">
      <Transition name="slide-in-form" appear>
        <div class="modal-wrapper-inner">
          <button class="modal-close-button" @click="handleClose">
            <XMarkIcon class="w-8 h-8" />
          </button>
          <h3 class="modal-title" v-if="title">{{ title }}</h3>
          <div class="modal-inner">
            <slot />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* Provide your transition styles here */

.blur-background-enter-active,
.blur-background-leave-active {
  transition: backdrop-filter 1s ease;
}

.blur-background-enter-from,
.blur-background-leave-to {
  backdrop-filter: blur(0);
}
.slide-in-form-enter-active,
.slide-in-form-leave-active {
  transition: transform 1s ease;
}
.slide-in-form-enter-from {
  transform: translateY(-180px);
}
.slide-in-form-leave-to {
  transform: translateY(-180px);
}
</style>
