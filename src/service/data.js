import { baseApi } from '@/plugins/axios'

const sideApi = '/api/NewFeature'

const proximity = () => baseApi.get(`${sideApi}/cycle`)
const delproximity = (date) => baseApi.delete(`${sideApi}/cycle?date=${date}`)

const pzemr = () => baseApi.get(`${sideApi}/pzem/r`)
const pzems = () => baseApi.get(`${sideApi}/pzem/s`)
const pzemt = () => baseApi.get(`${sideApi}/pzem/t`)
const delpzem = (date) => baseApi.delete(`${sideApi}/pzem?date=${date}`)

const baterai = () => baseApi.get(`${sideApi}/battery`)

const mesin = () => baseApi.get(`${sideApi}/modul/qty`)

const qtyproduct = (body) => baseApi.put(`${sideApi}/modul/qty`, body)

// Fungsi untuk memanggil API dengan tanggal yang dipilih
const historipzem = (selectDate) => baseApi.get(`${sideApi}/history/pzem?date=${selectDate}`);
const historiprox = (selectDate) => baseApi.get(`${sideApi}/history/cycle?date=${selectDate}`);


export {
    proximity, pzemr, pzems, pzemt, baterai, mesin, qtyproduct, historipzem, historiprox, delproximity, delpzem
}