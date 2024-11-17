export const spells = {
    fireball: {
        id: 'fireball',
        name: 'Fireball',
        castDuration: 3000,
        cast: (target) => {
            target.health.hit(10)
        },
        cancel: () => {
            console.log('Cancelling Fireball')
        },
    },
}