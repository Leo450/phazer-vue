<script setup>
import { ref } from 'vue'
import { EventBus } from '@/game/EventBus.js'

const spellQueue = ref(null)

EventBus.on('scene:created', (scene) => {
    spellQueue.value = scene.actors.get('player').ability.queue.queue
})
</script>

<template>
    <div
        v-if="spellQueue"
        class="SpellQueueDebug"
    >
        <p>Spell Queue ({{ spellQueue.length }})</p>
        <ul>
            <li v-for="spell in spellQueue" :key="spell.id">
                {{ spell.name }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    .SpellQueueDebug {
        position: absolute;
        top: 0;
        left: 0;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>