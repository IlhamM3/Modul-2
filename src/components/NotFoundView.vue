<template>
  <div class=" lg:mx-40 mt-5 max-w-5xl flex flex-col justify-center items-center ">
    <img class=" h-auto max-w-full" src="../assets/image/404.png" alt="">
    <button @click="goBack">
      <figcaption class="mt-2 text-lg text-center text-gray-500 dark:text-gray-400"><button type="button"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Back</button>
      </figcaption>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>