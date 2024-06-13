<script setup>
import SideBar from '@/components/sidebar.vue'
import ProximityVue from '@/components/Proximity.vue';
</script>

<template>
    <main>
        <SideBar :isactiveprox="isSidebarActive" />
        <proximityVue />
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