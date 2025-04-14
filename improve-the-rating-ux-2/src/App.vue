<script setup>
import { ref } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import { items } from "./movies.json";
const movies = ref(items);
let toggle = ref("no");
let message = ref("this is a placeholder");
let checked = ref(false);
const checkedNames = ref([]);
const picked = ref(null);
const selected = ref("A");
const dynamicTrueValue = ref("green");
const dynamicFalseValue = ref("red");

const options = ref([
  { text: "One", value: "A" },
  { text: "Two", value: "B" },
  { text: "Three", value: "C" },
]);

function updateRating(movieIndex, rating) {
  movies.value[movieIndex].rating = rating;
}
</script>

<template>
  <div class="app">
    <!-- <div class="input-test"> -->
    <!--   <!-- <input -->
    <!--   <!--   type="checkbox" -->
    <!--   <!--   v-model="toggle" -->
    <!--   <!--   true-value="yes" -->
    <!--   <!--   false-value="no" -->
    <!--   <!-- /> -->
    <!--   <!-- {{ toggle }} -->
    <!--   <p>Message is: {{ message }}</p> -->
    <!--   <input v-model="message" placeholder="edit me" /> -->
    <!--   <br /> -->
    <!--   <span>Multiline message is:</span> -->
    <!--   <p style="white-space: pre-line">{{ message }}</p> -->
    <!--   <textarea v-model="message" placeholder="add multiple lines"></textarea> -->
    <!--   <input type="checkbox" id="checkbox" v-model="checked" /> -->
    <!--   <label for="checkbox">{{ checked }}</label> -->
    <!---->
    <!--   <div>Checked names: {{ checkedNames }}</div> -->
    <!---->
    <!--   <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" /> -->
    <!--   <label for="jack">Jack</label> -->
    <!---->
    <!--   <input type="checkbox" id="john" value="John" v-model="checkedNames" /> -->
    <!--   <label for="john">John</label> -->
    <!---->
    <!--   <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" /> -->
    <!--   <label for="mike">Mike</label> -->
    <!---->
    <!--   <div>Picked: {{ picked }}</div> -->
    <!---->
    <!--   <input type="radio" id="one" value="One" v-model="picked" /> -->
    <!--   <label for="one">One</label> -->
    <!---->
    <!--   <input type="radio" id="two" value="Two" v-model="picked" /> -->
    <!--   <label for="two">Two</label> -->
    <!---->
    <!--   <div>Selected: {{ selected }}</div> -->
    <!---->
    <!--   <select v-model="selected" multiple> -->
    <!--     <option disabled value="">Please select one</option> -->
    <!--     <option>A</option> -->
    <!--     <option>B</option> -->
    <!--     <option>C</option> -->
    <!--   </select> -->
    <!--   <input -->
    <!--     type="checkbox" -->
    <!--     v-model="toggle" -->
    <!--     true-value="yes" -->
    <!--     false-value="no" -->
    <!--   /> -->
    <!--   <div>{{ toggle }}</div> -->
    <!--   <input -->
    <!--     type="checkbox" -->
    <!--     v-model="toggle" -->
    <!--     :true-value="dynamicTrueValue" -->
    <!--     :false-value="dynamicFalseValue" -->
    <!--   /> -->
    <!-- </div> -->
    <div class="header-area">
      <button @click="checked = !checked" class="add-movie-button">
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
</template>
