<script setup>
import { computed, ref } from 'vue'
import { EventBus } from '@/game/EventBus.js'
import CastBar from '@/lib/ui/CastBar.vue'
import { useDurationFormat } from '@/lib/utils/useDurationFormat.js'

const playerSpellQueueComponent = ref(null)

EventBus.on('scene:created', (scene) => {
    playerSpellQueueComponent.value = scene.actors.get('player').ability.queue
})

const playerCurrentSpell = computed(() => playerSpellQueueComponent.value?.currentSpell)
</script>

<template>
    <CastBar
        v-if="playerCurrentSpell && playerCurrentSpell.castState"
        class="PlayerCastBar"
        :name="playerCurrentSpell.name"
        :progress="playerCurrentSpell.castState.progress()"
    >
        <template #text-left>
            {{ playerCurrentSpell.name }}
        </template>
        <template #text-right>
            {{ useDurationFormat(playerCurrentSpell.castState.remaining()) }}
        </template>
    </CastBar>
</template>

<style lang="scss">
    .PlayerCastBar {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-50%);
    }
</style>