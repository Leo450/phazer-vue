export const useRelativePosition = (parent, child, pos, offset) => {
    const relativePosition = { x: parent.x, y: parent.y }
    switch (pos) {
        case 'top':
            relativePosition.y -= parent.height / 2 + child.height / 2
            break
        case 'bottom':
            relativePosition.x = parent.x - child.width / 2
            relativePosition.y += parent.height / 2 + child.height / 2
            break
        case 'left':
            relativePosition.x -= parent.width / 2 + child.width / 2
            break
        case 'right':
            relativePosition.x += parent.width / 2 + child.width / 2
            break
        case 'top-left':
            relativePosition.x -= parent.width / 2 + child.width / 2
            relativePosition.y -= parent.height / 2 + child.height / 2
            break
        case 'top-right':
            relativePosition.x += parent.width / 2 + child.width / 2
            relativePosition.y -= parent.height / 2 + child.height / 2
            break
        case 'bottom-left':
            relativePosition.x -= parent.width / 2 + child.width / 2
            relativePosition.y += parent.height / 2 + child.height / 2
            break
        case 'bottom-right':
            relativePosition.x += parent.width / 2 + child.width / 2
            relativePosition.y += parent.height / 2 + child.height / 2
            break
    }
    if (offset) {
        relativePosition.x += offset.x || 0
        relativePosition.y += offset.y || 0
    }
    return relativePosition
}

export const setRelativePosition = (parent, child, pos, offset) => {
    const relativePosition = useRelativePosition(parent, child, pos, offset)
    child.setPosition(relativePosition.x, relativePosition.y)
    return child
}