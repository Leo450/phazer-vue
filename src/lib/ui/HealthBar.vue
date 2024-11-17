<script setup>
    import { useSlots } from 'vue'

    defineProps({
        progress: Number,
    })

    const slots = useSlots()
</script>

<template>
    <div class="HealthBar">
        <div v-if="!!slots['text-left']" class="HealthBar__Text HealthBar__Text--Left">
            <slot name="text-left" />
        </div>
        <div v-if="!!slots['text-right']" class="HealthBar__Text HealthBar__Text--Right">
            <slot name="text-right" />
        </div>
        <div class="HealthBar__Progress" :style="{ width: `${progress * 100}%` }"></div>
    </div>
</template>

<style lang="scss">
    .HealthBar {
        position: relative;
        width: 256px;
        height: 32px;
        background-color: rgba(0, 0, 0, 0.5);
        border: 1px solid black;

        &__Text {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            &--Left {
                left: 8px;
            }
            &--Right {
                right: 8px;
            }
        }
    
        &__Progress {
            width: 100%;
            height: 100%;
            background-color: red;
        }
    }
</style>