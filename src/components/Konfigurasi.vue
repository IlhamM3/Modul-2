<!-- Tidak Digunakan DI Dashboard INSENS, Ini hanya untuk uji coba dimasukan ke ESP32 -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <section class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img class=" w-64 mb-10" src="./icons/logocomplate.png" alt="logo">
        <div
            class="w-full bg-white items-center rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <nav class="p-10 space-y-4 md:space-y-6 sm:p-8 flex flex-col">
                <RouterLink
                    class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    to="/konfigurasi/wifi">Konfigurasi Wifi</RouterLink>
                <RouterLink
                    class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    to="/konfigurasi/server">Konfigurasi Server</RouterLink>
            </nav>
        </div>
    </section>

    <RouterView />
</template>