<template>
    <div class="p-4 sm:ml-64 mt-28 md:mt-16">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-medium">Proximity</h1>
                <baterai />
            </div>
            <div class="relative overflow-x-hidden shadow-md sm:rounded-md">
                <table class="w-full font-medium text-left text-gray-900 text-md rtl:text-right dark:text-gray-400">
                    <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-3 py-3">Cycle</th>
                            <th scope="col" class="px-3 py-3">Produk</th>
                            <th scope="col" class="px-3 py-3">Jam</th>
                        </tr>
                    </thead>
                    <tbody id="cycledash">
                        <tr v-if="infoprox === 'Proximity is off'">
                            <td colspan="3" class="p-2 font-semibold text-center bg-white">Tidak ada data yang
                                ditemukan.</td>
                        </tr>
                        <tr v-else-if="getproxi.data && getproxi.data.length > 0" class="p-4 font-semibold bg-white">
                            <td class="px-3 py-4">{{ getproxi.data[0].cycle }}</td>
                            <td class="px-3 py-4">{{ getproxi.data[0].cycle * qty_product }}</td>
                            <td class="px-3 py-4">{{ formattime(getproxi.data[0].updatedAt) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form method="post" @submit.prevent="sendqty" @reset="resetForm">
                <div class="my-5">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ubah QTY Per Cycle
                    </label>
                    <div class="flex items-center justify-center w-60">
                        <input type="text" id="base-input" :placeholder="`QTY Per Cycle: ${qty_product}`"
                            v-model="input.newQty" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <button type="submit"
                            class="px-3 py-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Ganti
                        </button>
                    </div>
                </div>
            </form>
            <div class="flex items-center justify-between my-6">
                <h1 class="text-2xl font-medium">Pzem</h1>
                <h3 v-if="selectedMessage === 'Alat: OFF'"
                    class="p-1 px-2 font-medium text-white bg-gray-600 rounded-md shadow shadow-md">
                    {{ selectedMessage }}
                </h3>
                <div v-else class="p-1 px-2 font-medium text-white bg-green-500 rounded-md shadow shadow-md">
                    {{ selectedMessage }}
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-4 mb-4 md:grid md:grid-cols-3">
                <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                    <div class="relative justify-center overflow-x-hidden">
                        <h1 class="text-lg font-bold text-center">R</h1>
                        <hr>
                        <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">V</th>
                                    <th scope="col" class="px-6 py-3">A</th>
                                    <th scope="col" class="px-6 py-3">Energi</th>
                                    <th scope="col" class="px-6 py-3">Hz</th>
                                </tr>
                            </thead>
                            <tbody id="pzemr1">
                                <tr v-if="infoR === 'PzemR is off'"
                                    class="font-semibold text-center text-gray-900 bg-white whitespace-nowrap dark:text-white dark:bg-gray-800">
                                    <td colspan="4" class="px-12 py-4">
                                        Belum ada produksi untuk hari ini
                                    </td>
                                </tr>
                                <tr v-else-if="getpzemr.data && getpzemr.data.length > 0"
                                    class="text-center text-gray-900 bg-white whitespace-nowrap dark:text-white dark:bg-gray-800">
                                    <td class="px-6 py-4">{{ getpzemr.data[0].voltage }}</td>
                                    <td class="px-6 py-4">{{ getpzemr.data[0].current }}</td>
                                    <td class="px-6 py-4 font-bold text-green-600">{{ getpzemr.data[0].energy }}</td>
                                    <td class="px-6 py-4">{{ getpzemr.data[0].frequency }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                    <div class="relative overflow-x-hidden">
                        <h1 class="text-lg font-bold text-center">S</h1>
                        <hr>
                        <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">V</th>
                                    <th scope="col" class="px-6 py-3">A</th>
                                    <th scope="col" class="px-6 py-3">Energi</th>
                                    <th scope="col" class="px-6 py-3">Hz</th>
                                </tr>
                            </thead>
                            <tbody id="pzems1">
                                <tr v-if="infoS === 'PzemS is off'"
                                    class="font-semibold text-center text-gray-900 bg-white whitespace-nowrap dark:text-white dark:bg-gray-800">
                                    <td colspan="4" class="px-12 py-4">
                                        Belum ada produksi untuk hari ini
                                    </td>
                                </tr>
                                <tr v-else-if="getpzems.data && getpzems.data.length > 0"
                                    class="text-center text-gray-900 bg-white whitespace-nowrap dark:text-white dark:bg-gray-800">
                                    <td class="px-6 py-4">{{ getpzems.data[0].voltage }}</td>
                                    <td class="px-6 py-4">{{ getpzems.data[0].current }}</td>
                                    <td class="px-6 py-4 font-bold text-green-600">{{ getpzems.data[0].energy }}</td>
                                    <td class="px-6 py-4">{{ getpzems.data[0].frequency }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                    <div class="relative overflow-x-hidden">
                        <h1 class="text-lg font-bold text-center">T</h1>
                        <hr>
                        <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">V</th>
                                    <th scope="col" class="px-6 py-3">A</th>
                                    <th scope="col" class="px-6 py-3">Energi</th>
                                    <th scope="col" class="px-6 py-3">Hz</th>
                                </tr>
                            </thead>
                            <tbody id="pzemt1">
                                <tr v-if="infoT === 'PzemT is off'"
                                    class="font-semibold text-center text-gray-900 bg-white whitespace-nowrap dark:text-white dark:bg-gray-800">
                                    <td colspan="4" class="px-12 py-4">
                                        Belum ada produksi untuk hari ini
                                    </td>
                                </tr>
                                <tr v-else-if="getpzemt.data && getpzemt.data.length > 0"
                                    class="p-4 font-semibold bg-white">
                                    <td class="px-6 py-4">{{ getpzemt.data[0].voltage }}</td>
                                    <td class="px-6 py-4">{{ getpzemt.data[0].current }}</td>
                                    <td class="px-6 py-4 font-bold text-green-600">{{ getpzemt.data[0].energy }}</td>
                                    <td class="px-6 py-4">{{ getpzemt.data[0].frequency }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dataliststore } from '@/stores/data';
import { mapState, mapActions } from 'pinia';
import baterai from '@/components/baterai-prox-pzem/baterai.vue';

const qtyinput = {
    newQty: ''
}

export default {
    components: { baterai },
    data() {
        return {
            selectedMessage: '',
            infoprox: '',
            infoR: '',
            infoS: '',
            infoT: '',
            qty_product: '',
            input: { ...qtyinput }
        };
    },
    computed: {
        ...mapState(dataliststore, ['getproxi', 'getpzemr', 'getpzems', 'getpzemt', 'datamesin']),
    },
    async mounted() {
        await this.fetchdash();
        await this.fetchqtymesin();
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemr', 'a$pzems', 'a$pzemt', 'a$proxi', 'a$mesin', 'a$qtyproduct']),
        resetForm() {
            Object.assign(this.input, qtyinput);
        },
        async sendqty() {
            try {
                await this.a$qtyproduct(this.input);
                console.log(this.input)
                this.resetForm();
                await this.fetchqtymesin();
            } catch (error) {
                console.error(error);
            }
        },
        getqtymesin(data) {
            return data.map(item => ({
                qty_product: item.qty_product,
            }));
        },
        async fetchqtymesin() {
            await this.a$mesin();
            const data = this.datamesin.data;
            const qtyMesinArray = this.getqtymesin(data);
            if (qtyMesinArray.length > 0) {
                this.qty_product = qtyMesinArray[0].qty_product;
            }
        },
        async fetchdash() {
            try {
                await Promise.all([
                    this.a$pzemr(),
                    this.a$pzems(),
                    this.a$pzemt(),
                    this.a$proxi()
                ]);
                setInterval(() => {
                }, 1000);
                this.logGetdatadash();
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        },
        logGetdatadash() {
            this.infoprox = this.getproxi.data;
            this.infoR = this.getpzemr.data;
            this.infoS = this.getpzems.data;
            this.infoT = this.getpzemt.data;
            const messager = this.getpzemr.message;
            const messages = this.getpzems.message;
            const messaget = this.getpzemt.message;

            if (messager === 'PzemR: ON' || messages === 'PzemS: ON' || messaget === 'PzemT: ON') {
                this.selectedMessage = 'Alat: ON';
            } else if (messager === 'PzemR: OFF' || messages === 'PzemS: OFF' || messaget === 'PzemT: OFF' || this.infoR === "PzemR is off" || this.infoS === "PzemS is off" || this.infoT === "PzemT is off") {
                this.selectedMessage = 'Alat: OFF';
            } else {
                this.selectedMessage = '';
            }
        },
        formattime(datastamp) {
            const dateObj = new Date(datastamp);
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const seconds = dateObj.getSeconds();
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
};
</script>
