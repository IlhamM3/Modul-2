<script setup>
import SideBar from '@/components/sidebar.vue'
import PzemVue from '@/components/Pzem.vue'
</script>

<template>
    <main>
        <SideBar :isactivepzem="isSidebarActive" />
        <pzemVue />
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