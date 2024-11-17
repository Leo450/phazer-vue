<script setup>
    import { useDurationFormat } from '../utils/useDurationFormat.js'

    defineProps({
        icon: String,
        duration: Number,
        stacks: Number
    })
</script>

<template>
    <div class="Aura">
        <div class="Aura__Icon">
            <img
                :src="icon"
                alt="aura"
            />
            <p
                v-if="duration"
                class="Aura__Stacks"
            >
                {{ stacks }}
            </p>
        </div>
        <p
            v-if="duration"
            class="Aura__Duration"
        >
            {{ useDurationFormat(duration) }}
        </p>
    </div>
</template>

<style lang="scss">
    .Aura {
        &__Icon {
            position: relative;
            background-color: rgba(0, 0, 0, 0.5);
            border: 1px solid black;
            
            img {
                width: 32px;
                height: 32px;
            }
        }
        
        &__Stacks {
            position: absolute;
            bottom: 4px;
            right: 4px;
        }
        
        &__Duration {
            text-align: center;
        }
    }
</style>