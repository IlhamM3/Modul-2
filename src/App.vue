<script>
import { RouterView } from 'vue-router';
import intervaalConfig from '@/service/interval.js';
import { getCookies } from './plugins/cookies';

export default {
  data() {
    return {
      token: '',
      tokenCheckIntervalId: null
    };
  },
  components: {
    RouterView,
  },
  methods: {
    ...intervaalConfig(this).actions,
    async intervalSetting() {
      await intervaalConfig(this).intervalSetting();
    },
  },
  async mounted() {
    // Set an interval to check for the token every 2 seconds
    this.tokenCheckIntervalId = setInterval(() => {
      const datatoken = getCookies('CERT');
      if (datatoken) {
        this.token = datatoken;

        clearInterval(this.tokenCheckIntervalId);
        setInterval(() => {
          this.intervalSetting();
        }, 1000);
      }
    }, 2000);
  },
  beforeDestroy() {
    // Clear both intervals when the component is destroyed
    if (this.tokenCheckIntervalId) {
      clearInterval(this.tokenCheckIntervalId);
    }
  },
};
</script>

<template>
  <RouterView />
</template>
