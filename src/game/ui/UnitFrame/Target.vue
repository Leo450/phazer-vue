<script setup>
    import { computed, ref } from 'vue'
    import { EventBus } from '@/game/EventBus.js'
    import HealthBar from '@/lib/ui/HealthBar.vue'
    import Aura from '@/lib/ui/Aura.vue'
    
    const playerTargetComponent = ref(null)

    EventBus.on('scene:created', (scene) => {
        playerTargetComponent.value = scene.actors.get('player').target
    })
    
    const playerTarget = computed(() => playerTargetComponent.value?.target)
    
    const playerTargetName = computed(() => playerTarget.value?.info.get('name'))
    
    const playerTargetMaxHealth = computed(() => playerTarget.value?.health.maxHealth)
    const playerTargetHealth = computed(() => playerTarget.value?.health.health)
    const playerTargetHealthProgress = computed(() => playerTargetHealth.value / playerTargetMaxHealth.value)
    
    const playerTargetDebuffs = computed(() => playerTarget.value?.debuffs.auras)
</script>

<template>
    <div
        v-if="playerTarget"
        class="UnitFrame UnitFrame--Target"
    >
        <p class="UnitFrame__Name">{{ playerTargetName }}</p>
        <HealthBar
            class="UnitFrame__HealthBar"
            :progress="playerTargetHealthProgress"
        >
            <template #text-right>
                {{ playerTargetHealth / playerTargetMaxHealth * 100 }}%
            </template>
        </HealthBar>
        <div class="UnitFrame__Debuffs">
            <div
                v-for="debuff in playerTargetDebuffs"
                :key="debuff.id"
                class="UnitFrame__Debuff"
            >
                <Aura
                    :icon="debuff.icon"
                    :duration="debuff.duration ? debuff.durationState.remaining() : undefined"
                    :stacks="debuff.stacks"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .UnitFrame {
        position: absolute;
        
        &--Target {
            top: 60%;
            left: 60%;
        }
        
        &__Name {
            color: white;
            font-size: 16px;
        }
    }
</style>