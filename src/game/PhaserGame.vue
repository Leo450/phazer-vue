<script setup>
    import { onMounted, onUnmounted, ref } from 'vue'
    import StartGame from './main'
    import Player from '@/game/ui/UnitFrame/Player.vue'
    import Target from '@/game/ui/UnitFrame/Target.vue'
    import SpellQueueDebug from '@/game/ui/SpellQueueDebug.vue'
    import PlayerCastBar from '@/game/ui/PlayerCastBar.vue'
    import PlayerDebuffs from '@/game/ui/PlayerDebuffs.vue'
    
    // Save the current scene instance
    const scene = ref()
    const game = ref()
    
    onMounted(() => {
    
        game.value = StartGame('world-container')
    
    })
    
    onUnmounted(() => {
    
        if (game.value) {
            game.value.destroy(true)
            game.value = null
        }
        
    })
    
    defineExpose({ scene, game })
</script>

<template>
    <div id="game-container">
        <div id="world-container"></div>
        <div id="ui-container">
            <SpellQueueDebug />
            <Player />
            <Target />
            <PlayerCastBar />
            <PlayerDebuffs />
        </div>
    </div>
</template>

<style lang="scss">
    #game-container {
        position: relative;
        
        #ui-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            
            & > * {
                pointer-events: auto;
            }
        }
    }
</style>