<template>
    <nav class="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center">
                <div class="flex items-center justify-start rtl:justify-end">
                    <button id="buttonnavbar" data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                        aria-controls="logo-sidebar" type="button"
                        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span class="sr-only">Open sidebar</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                            </path>
                        </svg>
                    </button>
                    <img class="hidden mr-3 w-44 md:mr-20 sm:block" src="./icons/logocomplate.png" alt="logo">
                </div>
                <div class="flex items-center">
                    <div class="w-full md:block md:w-auto" id="navbar-default">
                        <ul
                            class="grid items-center grid-cols-2 p-4 font-medium bg-gray-100 border border-gray-100 rounded-lg sm:flex gap-x-5 md:p-0 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li class="hidden md:block">
                                <h3>Sistem monitoring sensor di <span class="font-bold uppercase">{{ Merek }}</span>
                                </h3>
                            </li>
                            <li>
                                <h3>{{ tanggal }}</h3>
                            </li>
                            <li>
                                <h3 class="p-1 font-medium text-white bg-blue-600 rounded-md shadow shadow-md">{{ waktu
                                    }}</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 pt-36 sm:pt-24 md:pt-20 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li>
                    <RouterLink to="/dashboard" :class="{ 'active': isactive }"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="ms-3">Dashboard</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/proximity" :class="{ 'active': isactiveprox }"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="flex-1 ms-3 whitespace-nowrap">Proximity</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/pzem" :class="{ 'active': isactivepzem }"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="flex-1 ms-3 whitespace-nowrap">Pzem</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/history" :class="{ 'active': isactivehis }"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="flex-1 ms-3 whitespace-nowrap">Histori</span>
                    </RouterLink>
                </li>
                <li>
                    <button @click="logout"
                        class="flex w-full p-2 text-gray-900 rounded-lg text-start dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</template>
<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { dataliststore } from '@/stores/data';
import { d$auth } from '@/stores/auth';
import { initFlowbite } from 'flowbite';
// import intervaalConfig from '@/service/interval.js'

export default {
    data() {
        return {
            Merek: '',
            tanggal: '',
            waktu: '',
        };
    },
    components: {
        RouterLink,
    },
    computed: {
        ...mapState(dataliststore, ['datamesin']),
    },
    methods: {
        // ...intervaalConfig(this).actions,
        ...mapActions(d$auth, ['a$logout']),
        ...mapActions(dataliststore, ['a$mesin']),
        // async intervalSetting() {
        //     await intervaalConfig(this).intervalSetting();
        // },
        getmerekmesin(data) {
            return data.map(item => ({
                merek: item.machineName,
            }));
        },
        async logout() {
            try {
                await this.a$logout();
                await this.$router.replace({
                    name: 'login',
                });
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        },
        updateTime() {
            const date = new Date();
            const waktu = this.padZero(date.getHours()) + ':' + this.padZero(date.getMinutes()) + ':' + this.padZero(date.getSeconds());
            this.waktu = waktu;
        },
        updateDate() {
            const date = new Date();
            const options = {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            };
            const tanggal = date.toLocaleDateString('id-ID', options);
            this.tanggal = tanggal;
        },
        padZero(number) {
            return (number < 10 ? '0' : '') + number;
        },
    },
    props: {
        isactive: Boolean,
        isactiveprox: Boolean,
        isactivepzem: Boolean,
        isactivehis: Boolean,
    },
    async mounted() {
        await this.a$mesin();
        const data = this.datamesin.data;
        const merekMesinArray = this.getmerekmesin(data);
        if (merekMesinArray.length > 0) {
            this.Merek = merekMesinArray[0].merek;
        }

        this.updateTime();
        this.updateDate();
        setInterval(this.updateTime, 1000);
        setInterval(this.updateDate, 3600000);

        initFlowbite();

        // this.intervalId = setInterval(() => {
        //     this.intervalSetting();
        // }, 1000);
    }
    // beforeDestroy() {
    //     clearInterval(this.intervalId);
    // }
};
</script>