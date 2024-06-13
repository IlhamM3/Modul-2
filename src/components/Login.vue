<script>
import { d$auth } from '@/stores/auth'
import { mapActions, mapState } from 'pinia'

const initialInput = {
    username: '',
    password: '',
    mod: 'true'
}

export default {
    data: () => ({
        input: { ...initialInput }
    }),
    computed: {
        ...mapState(d$auth, ['g$user', 'isLoggedIn'])
    },
    methods: {
        ...mapActions(d$auth, ['a$login', 'a$setUser']),
        resetForm() {
            Object.assign(this.input, initialInput)
        },
        async submitForm() {
            try {
                await this.a$login(this.input)

                // set user based on cookie
                this.a$setUser()
                this.resetForm()

                this.$router.replace({
                    name: 'dashboard'
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>


<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <img class="w-64 mb-10 " src="./icons/logocomplate.png" alt="logo">
            <div
                class="items-center w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-10 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" v-if="!isLoggedIn" method="post"
                        @submit.prevent="() => submitForm()" @reset="() => resetForm()">
                        <div>
                            <label for="username"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="username" name="username" id="username" v-model="input.username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="username" required>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="input.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                        </div>
                        <div class="flex justify-center w-full">
                            <button type="submit"
                                class=" w-36 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>