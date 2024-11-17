import { useGridAtlas } from '@/lib/utils/useGridAtlas.js'

export const load = (scene) => {
    if (!scene.textures.exists('markers')) {
        scene.load.atlas('markers', 'assets/markers.webp', useGridAtlas({
            rows: 2,
            cols: 4,
            frameNames: ['star', 'circle', 'diamond', 'triangle', 'moon', 'square', 'cross', 'skull']
        }))
    }
}