<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

// Reactive state
const showForm = ref(false);
import { StarIcon } from "@heroicons/vue/24/solid";
import { items } from "./movies.json";
const movies = ref(items);

const formDataSelection = ref([])
const formData = reactive({
  name: "",
  description: "",
  image: "",
  genres: [
    {text:"action", value:1},
    {text:"crime", value:2},
    {text:"drama", value:3}
  ],
  inTheaters: false,
});

function updateRating(movieIndex, rating) {
  movies.value[movieIndex].rating = rating;
}

function addMovie(event) {
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName);
  }
}
// Methods
const closeForm = () => {
  showForm.value = false;
};

const submitForm = () => {
  // Process form data here
  console.log("Form submitted:", formData);

  // Add movie to items
  items.push({
    "id": items.length + 1,
    "name": formData.name,
    "description": formData.description,
    "image": formData.image,
    "genres": formDataSelection.value,
    "inTheaters": formData.inTheaters,
  });
    

  // Reset form and close overlay
  formData.name = "";
  formData.description = "";
  formData.image = "";
  formData.inTheaters = false;

  formDataSelection.value = [];

  closeForm();
};

// Handle ESC key press
const handleKeydown = (e) => {
  if (e.key === "Escape" && showForm.value) {
    closeForm();
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="app">
    <div class="header-area">
      <button @click="showForm = true" class="add-movie-button">
        Add Movie
      </button>
    </div>
    <div class="movie-list">
      <div
        class="movie-item"
        v-for="(movie, movieIndex) in movies"
        :key="movie.id"
      >
        <div class="movie-item-image-wrapper">
          <div class="movie-item-star-wrapper">
            <StarIcon
              class="movie-item-star-rating-icon"
              :class="[movie.rating ? 'text-yellow-500' : 'text-gray-500']"
            />
            <div class="movie-item-star-content-wrapper">
              <span
                v-if="movie.rating"
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
                >{{ genre }}</span
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
                @click="updateRating(movieIndex, star)"
              >
                <StarIcon class="movie-item-star-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Form overlay container with Teleport -->
  <Teleport to="body">
    <div v-if="showForm" class="overlay-container">
      <!-- Backdrop with blur effect -->
      <div class="backdrop" @click="closeForm"></div>

      <!-- Actual form -->
      <div class="form-container">
        <h2>Contact Form</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="formData.description" />
          </div>

          <div class="form-group">
            <label for="image">Image</label>
            <input type="text" id="image" v-model="formData.image"></input>
          </div>

          <div class="form-group">
          <label for="genres">Genres</label>
          <select v-model="formDataSelection" multiple>
              <option v-for="genre in formData.genres" :value="genre.value" :key="genre.value" required>
                {{ genre.text}}
              </option>

            </select>
          </div>
          <div class="form-group">
            <label for="inTheaters">In Theaters</label>
            <input type="checkbox" id="inTheaters" v-model="formData.inTheaters">
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeForm">
              Cancel
            </button>
            <button type="submit" class="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
