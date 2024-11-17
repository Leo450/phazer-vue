<script setup>
    import { computed, ref } from 'vue'
    import { EventBus } from '@/game/EventBus.js'
    import Aura from '@/lib/ui/Aura.vue'
    
    const playerDebuffsComponent = ref(null)

    EventBus.on('scene:created', (scene) => {
        playerDebuffsComponent.value = scene.actors.get('player').debuffs
    })

    const playerDebuffs = computed(() => playerDebuffsComponent.value?.auras)
</script>

<template>
    <div class="PlayerDebuffs">
        <div
            v-for="debuff in playerDebuffs"
            :key="debuff.id"
            class="PlayerDebuffs__Debuff"
        >
            <Aura
                :icon="debuff.icon"
                :duration="debuff.duration ? debuff.durationState.remaining() : undefined"
                :stacks="debuff.stacks"
            />
        </div>
    </div>
</template>

<style lang="scss">
    .PlayerDebuffs {
        position: absolute;
        top: 8px;
        right: 8px;
    }
</style>