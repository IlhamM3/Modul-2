import { defineStore } from 'pinia'

import { setCookies, certCookies, delCookies } from '@/plugins/cookies'

import * as s$auth from '@/service/auth'

export const d$auth = defineStore({
  id: 'auth',
  state: () => ({
    username: undefined
  }),
  actions: {
    async a$setUser() {
      try {
        const { n } = certCookies()
        this.username = n
        return 'User Authenticated!'
      } catch ({ message }) {
        this.username = undefined
        throw message
      }
    },
    async a$login(body) {
      try {
        const response = await s$auth.login(body);
        const { data } = response;
        const token = data.data.token;
        console.log(token)
        setCookies('CERT', token)
        return true
      } catch ({ error, message }) {
        throw message ?? error
      }
    },
    async a$logout() {
      try {
        delCookies('CERT')
      } catch ({ error, message }) {
        throw message ?? error
      }
    }
  },
  getters: {
    g$user: ({ username }) => ({ username }),
    // determine if user is logged in
    isLoggedIn: ({ username }) => !!username
  }
})
