const game = {
    cartridge: {
        isDefault: true,
        title: 'Scifi',
        cartColor: 'darkblue',
    },
    config: {
        startingRoom: 'intro',
        path: {
            display: true,
            label: 'Go to:',
            color: 'black',
            textColor: 'white'
        },
    },
    rooms: [
        {
            id: 'intro',
            desc: 'You are the captain of the starship Basilisk.  One in a line of new vessels of the Cosmic Armada, in which the galaxy has instilled its hopes of finding exciting wonders in new frontiers. Unfortunately, your sister ship, the Phoenix, recently went dark. No one has received any communication from it for over a week when it reported it was investigating a strange star system.  You\'ve been charged with the task of heading to the Phoenix\'s last known location to investigate and, hopefully, find the crew',
            paths: [
                {id: 'intro-to-bridge', label: 'Begin!', roomId: 'bridge'},
            ]
        },
        {
            id: 'bridge',
            desc: 'You are on the bridge of The Starship Basilisk.  Before you is the control panel.'
        },
    ]
}

export default game;
