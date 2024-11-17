<script setup>
    import { computed } from 'vue'

    const props = defineProps({
        health: Number,
        maxHealth: Number
    })
    
    const progress = computed(() => props.health.value * 100 / props.maxHealth.value)
</script>

<template>
    <div class="Nameplate">
        <div class="Nameplate__HealthBar">
            <div
                class="Nameplate__HealthBar__Progress"
                :style="{ width: `${progress}%` }"
            ></div>
        </div>
    </div>
</template>

<style lang="scss">
    .Nameplate__HealthBar {
        position: relative;
        width: 64px;
        height: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        border: 1px solid black;
        color: white;
        
        &__Progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: green;
        }
    }
</style>