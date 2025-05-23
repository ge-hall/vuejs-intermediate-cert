<script setup>
import MovieItem from "@/MovieItem.vue";
import AppModal from "./AppModal.vue";
import { items } from "./movies.json";
import { computed, ref, watch, defineAsyncComponent } from "vue";

// async components
const MovieForm = defineAsyncComponent(() => import("@/MovieForm.vue"));

const movies = ref(items);
const currentMovie = ref(null);
function updateRating(id, rating) {
  movies.value = movies.value.map((movie) => {
    if (movie.id === id) {
      movie.rating = rating;
    }
    return movie;
  });
}
function removeMovie(id) {
  movies.value = movies.value.filter((movie) => movie.id !== id);
}
function editMovie(id) {
  currentMovie.value = movies.value.find((movie) => movie.id === id);
  console.log(`currentMovie to edit is ${JSON.stringify(currentMovie.value)})`);
  showForm();
}
function saveMovie(data) {
  const isNew = !!movies.value.find((movie) => movie.id === data.id);
  if (!isNew) {
    addMovie(data);
  } else {
    updateMovie(data);
  }
}
function updateMovie(data) {
  console.log(`updateMovie ${JSON.stringify(data)}`);
  movies.value = movies.value.map((m) => {
    if (m.id === data.id) {
      data.rating = m.rating;
      return data;
    }
    return m;
  });
  hideForm();
}
function addMovie(data) {
  movies.value.push(data);
  hideForm();
}

// movie form
const showMovieForm = ref(false);
const showFormModal = ref(false);
const isMovieFormTransitioning = ref(false);

function hideForm() {
  // need to manage interaction with AppModal
  // only set showMovieForm false on transitions-completed
  console.log(`hideForm`);
  if (isMovieFormTransitioning.value) return;
  console.log("isMovieTransitioning ended");
  showMovieForm.value = false;
  showFormModal.value = false;
}
function cancelForm() {
  console.log(`Cancel Form`);
  showMovieForm.value = false;
  showFormModal.value = false;
}
function showForm() {
  showMovieForm.value = true;
  showFormModal.value = true;
}
const averageRating = computed(() => {
  const avg = movies.value
    .map((movie) => parseInt(movie.rating || 0))
    .reduce((a, b) => a + b, 0);
  return Number(avg / movies.value.length).toFixed(1);
});
const totalMovies = computed(() => {
  return movies.value.length;
});
function removeRatings() {
  movies.value = movies.value.map((movie) => {
    movie.rating = null;
    return movie;
  });
}
watch(currentMovie, (oldValue, newValue) =>
  console.log(
    `currentMovie changed from ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`,
  ),
);
</script>

<template>
  <div class="app">
    <AppModal
      :show="showFormModal"
      :title="currentMovie?.id ? 'Edit Movie' : 'Add Movie'"
      @close-modal-begin="hideForm()"
      @modal-transitions-started="isMovieFormTransitioning = true"
      @transitions-completed="isMovieFormTransitioning = false"
    >
      <MovieForm
        v-if="showMovieForm"
        @update:modelValue="saveMovie"
        :modelValue="currentMovie"
        @cancel="cancelForm"
      />
    </AppModal>
    <div class="movie-actions-list-wrapper">
      <div class="movie-actions-list-info">
        <span>Total Movies: {{ totalMovies }}</span>
        <span> / </span>
        <span>Average Rating: {{ averageRating }}</span>
      </div>
      <div class="flex-spacer"></div>
      <div class="movie-actions-list-actions">
        <button
          class="self-end movie-actions-list-action-button button-primary justify-self-end"
          @click="removeRatings"
        >
          Remove Ratings
        </button>
        <button
          class="movie-actions-list-action-button"
          :class="{
            'button-primary': !showMovieForm,
            'button-disabled': showMovieForm,
          }"
          @click="showForm"
          :disabled="showMovieForm"
        >
          Add Movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @edit="editMovie"
        @remove="removeMovie"
        @update:rating="updateRating"
      />
    </div>
  </div>
</template>
