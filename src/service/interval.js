import { dataliststore } from '@/stores/data';
import { mapActions } from 'pinia';

export default function createIntervalActions(context) {
    const actions = mapActions(dataliststore, ['a$baterai', 'a$pzemr', 'a$pzems', 'a$pzemt', 'a$mesin', 'a$proxi']);

    return {
        async intervalSetting() {
            try {
                await Promise.all([
                    context.a$pzemr(),
                    context.a$pzems(),
                    context.a$pzemt(),
                    context.a$baterai(),
                    context.a$mesin(),
                    context.a$proxi()
                ]);
            } catch (error) {
                console.error('Error during API calls:', error);
            }
        },
        actions
    };
}
