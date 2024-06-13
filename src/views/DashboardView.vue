<script setup>
import Sidebar from '@/components/sidebar.vue'
import Dashboard from '@/components/Dashboard.vue'
</script>

<template>
    <main>
        <Sidebar :isactive="isSidebarActive" />
        <Dashboard />
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
