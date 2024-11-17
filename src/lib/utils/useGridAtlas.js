export const useGridAtlas = (options) => {
    const rows = options.rows || 1
    const cols = options.cols || 1
    const frameWidth = options.frameWidth || 64
    const frameHeight = options.frameHeight || 64
    const frameNamePrefix = options.frameNamePrefix || ''
    const frameNames = options.frameNames || []
    
    const atlas = {
        frames: {},
    }
    let frameIndex = 0
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const frameName = frameNames[frameIndex] || `${frameNamePrefix ? frameNamePrefix + '-' : ''}${row}-${col}`
            atlas.frames[frameName] = {
                frame: { x: col * frameWidth, y: row * frameHeight, w: frameWidth, h: frameHeight },
            }
            frameIndex++
        }
    }
    return atlas
}