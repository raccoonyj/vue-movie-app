<template>
  <div class="about">
    <div class="photo">
      <Loader 
      v-if="imageLoading"
      absolute/>
      <img :src="image" alt="name">
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
import { mapState } from 'vuex'
export default {
  data(){
    return {
      imageLoading: true
    }
  },
  components: {
    Loader
  },
  computed: {
    ...mapState('about',[
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading=false
    }
  }
}</script>

<style lang="scss" scoped>
  
  .about {
    text-align: center;
    .photo {
      width: 250px;
      height: 250px;
      margin: 40px auto 20px;
      padding: 30px;
      border-radius: 50%;
      border: 10px solid $gray-300;
      box-sizing: border-box;
      background-color: $gray-200;
      position: relative;
      img {
        width: 100%
      }
    }
    .name {
      font-size: 40px;
      font-family: "Oswald", sans-serif;
      margin-bottom: 20px;
    }
  }
</style>