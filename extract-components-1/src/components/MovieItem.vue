<script setup>
// Start your logic here
import { computed, reactive, ref, defineProps } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import { TrashIcon, PencilIcon } from "@heroicons/vue/24/outline";
// declare props
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
defineEmits(["update-rating", "edit-movie", "remove-movie"]);
</script>

<template>
  <!-- Start your template here -->
  <div class="movie-item group">
    <div class="movie-item-image-wrapper">
      <div class="movie-item-star-wrapper">
        <StarIcon
          id="rating"
          class="movie-item-star-rating-icon"
          :class="[movie.rating ? 'text-yellow-500' : 'text-gray-500']"
        />
        <div class="movie-item-star-content-wrapper">
          <span
            v-if="movie.rating"
            id="rating-stars"
            class="movie-item-star-content-rating-rated"
          >
            {{ movie.rating }}
          </span>
          <span v-else class="movie-item-star-content-rating-not-rated">
            -
          </span>
        </div>
      </div>
      <img :src="movie.image" class="movie-item-image" alt="" />
    </div>

    <div class="movie-item-content-wrapper">
      <div class="movie-item-title-wrapper">
        <h3 class="movie-item-title">{{ movie.name }}</h3>
        <div class="movie-item-genres-wrapper">
          <span
            v-for="genre in movie.genres"
            :key="`${movie.id}-${genre}`"
            class="movie-item-genre-tag"
            >{{ movie.genre }}</span
          >
        </div>
      </div>
      <div class="movie-item-description-wrapper">
        <p class="movie-item-description">{{ movie.description }}</p>
      </div>
      <div class="movie-item-rating-wrapper">
        <span class="movie-item-rating-text">
          Rating: ({{ movie.rating }}/5)
        </span>
        <div class="movie-item-star-icon-wrapper">
          <button
            v-for="star in 5"
            :key="star"
            class="movie-item-star-icon-button"
            :class="[
              star <= movie.rating ? 'text-yellow-500' : 'text-gray-500',
            ]"
            :disabled="star === movie.rating"
            @click="$emit('update-rating', movie.id, star)"
          >
            <StarIcon class="movie-item-star-icon" />
          </button>
        </div>

        <div class="movie-item-actions-list-wrapper">
          <button
            class="movie-item-action-edit-button"
            @click="$emit('edit-movie', movie.id)"
          >
            <PencilIcon class="w-4 h-4" />
          </button>
          <button
            class="movie-item-action-remove-button"
            @click="$emit('remove-movie', movie.id)"
          >
            <TrashIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
