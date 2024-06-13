import { defineStore } from 'pinia'

import * as s$data from '@/service/data'

export const dataliststore = defineStore({
    id: 'data',
    state: () => ({
        dataproxi: [],

        datapzemr: [],

        datapzems: [],

        datapzemt: [],

        databaterai: [],

        //History Data
        dataHistoriproxi: [],
        dataHistoripzem: [],

        //message delete
        delmessageprox: [],
        delmessagepzem: [],

    }),
    actions: {
        async a$proxi() {
            try {
                const { data } = await s$data.proximity()
                this.setProxi(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        async a$pzemr() {
            try {
                const { data } = await s$data.pzemr()
                this.setPzemR(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$pzems() {
            try {
                const { data } = await s$data.pzems()
                this.setPzemS(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$pzemt() {
            try {
                const { data } = await s$data.pzemt()
                this.setPzemT(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        async a$baterai() {
            try {
                const { data } = await s$data.baterai()
                this.setBaterai(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$mesin() {
            try {
                const { data } = await s$data.mesin()
                this.setmesin(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$qtyproduct(body) {
            try {
                await s$data.qtyproduct(body);
            } catch ({ error, message }) {
                throw message ?? error
            }
        },


        //del API
        async a$delprox(date) {
            try {
                const { data } = await s$data.delproximity(date);
                this.setdelProxi(data.data);
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$delpzem(date) {
            try {
                const { data } = await s$data.delpzem(date);
                this.setdelPzem(data.data);
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        // History API
        async a$historiprox(date) {
            try {
                const { data } = await s$data.historiprox(date)
                this.sethistoriprox(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$historipzem(date) {
            try {
                const { data } = await s$data.historipzem(date)
                this.sethistoripzem(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        sethistoriprox(data) {
            this.dataHistoriproxi = data
        },
        sethistoripzem(data) {
            this.dataHistoripzem = data
        },

        setPzemR(data) {
            this.datapzemr = data
        },

        setPzemS(data) {
            this.datapzems = data
        },

        setPzemT(data) {
            this.datapzemt = data
        },

        // Mutations untuk memperbarui state
        setProxi(data) {
            this.dataproxi = data
        },
        setdelProxi(data) {
            this.delmessageprox = data
        },
        setdelPzem(data) {
            this.delmessagepzem = data
        },
        setBaterai(data) {
            this.databaterai = data
        },
        setmesin(data) {
            this.datamesin = data
        }
    },
    getters: {
        // Getter yang sesuai dengan state
        getproxi: (state) => state.dataproxi,

        getpzemr: (state) => state.datapzemr,
        getpzems: (state) => state.datapzems,
        getpzemt: (state) => state.datapzemt,

        getbaterai: (state) => state.databaterai,
        getmesin: (state) => state.datamesin,

        // Getter history APi
        gethistoriprox: (state) => state.dataHistoriproxi,
        gethistoripzem: (state) => state.dataHistoripzem,

        //get response message
        getdelmessageprox: (state) => state.delmessageprox,
        getdelmessagepzem: (state) => state.delmessagepzem,

    }
});