export const auras = {
    burn: {
        id: 'burn',
        name: 'Burn',
        stackable: true,
        icon: 'https://wow.zamimg.com/images/wow/icons/large/ability_mage_livingbomb.jpg',
        tickRate: 1000,
        ticks: 5,
        pandemic: 2,
        tick: (actor, self) => {
            console.log('Burn tick', self.currentTicks)
            actor.health.hit(1)
        },
    },
}