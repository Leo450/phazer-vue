<script setup>
    import { computed, ref } from 'vue'
    import { EventBus } from '@/game/EventBus.js'
    import HealthBar from '@/lib/ui/HealthBar.vue'
    
    const player = ref(null)
    
    EventBus.on('scene:created', (scene) => {
        player.value = scene.actors.get('player')
    })
    
    const playerName = computed(() => player.value?.info.get('name'))
    const playerMaxHealth = computed(() => player.value?.health.maxHealth)
    const playerHealth = computed(() => player.value?.health.health)
    const playerHealthProgress = computed(() => playerHealth.value / playerMaxHealth.value)
</script>

<template>
    <div
        v-if="player"
        class="UnitFrame UnitFrame--Player"
    >
        <p class="UnitFrame__Name">{{ playerName }}</p>
        <HealthBar
            class="UnitFrame__HealthBar"
            :progress="playerHealthProgress"
        />
    </div>
</template>

<style lang="scss">
.UnitFrame {
    position: absolute;

    &--Player {
        top: 60%;
        right: 60%;
    }

    &__Name {
        color: white;
        font-size: 16px;
    }
}
</style>