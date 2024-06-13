<script setup>
import SideBar from '@/components/sidebar.vue'
import historyVue from '@/components/History.vue'
</script>

<template>
    <main>
        <SideBar :isactivehis="isSidebarActive" />
        <historyVue />
    </main>
</template>

<script>
export default {
    data() {
        return {
            isSidebarActive: true
        };
    }
}
</script>