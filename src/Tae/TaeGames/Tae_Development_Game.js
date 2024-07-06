/*
--Note-- To make any object with a "requirements" field factor current inventory into the requirements:
    Use key 'inventory' with an item id to require that item has been acquired
    Use key 'inventoryStillHave' with an item id to require that item has been acquired and has not yet been expended
    Use key 'inventoryUsedUp' with an item id to require that item has been acquired and has been expended

cartridge: Object giving info about how cartridge should appear
    cartColor: Text color of the game cartridge
    tabColor: Text color of the on top of gae cartridge
    stickerColor: Text color of sticker labelling cartridge
    textColor: Text color of text on cartridge
config: Object giving overall game details {
    startingRoom: String ID of the room the game starts in
    startingInspect: String ID of the inspectable the game starts on, if any
    startingInventory: List of inventory items you start with [
        {
            id: String unique ID to identiy item
            label: String what to display for item in inventory panel
            requirements: List of key value pairs for what conditions must be met for this item to appear in panel
            effect: List of key-value pairs for what changes the use of this item has on the game state variables

            toUse: List of key-value pairs for what conditions must be met to use this item
            useConfirmation: String what to display when item is used at a time where its toUse conditions are met
            useFail: String what to display when item is used at a time where its toUse conditions are not met
            uses: Number indicating how many times an item can be used before it disappears

            closeLabel: String override for text displayed in button to close modal
            takeLabel: String override for text displayed on button to take items in modal
            color: String color of modal
            windowColor: String color of section of modal that displays text
            textColor: String color of text modal displays
            buttonColor: String color of buttons on modal
            buttonTextColor: String color of text in buttons on modal
        }
    ]
    startingVariables: List of key-value pairs for initial game variables
    path: Object giving overall details for path panel {
        display: Boolean indicates whether or not this panel is displayed in this game
        label: String what text displays at top of panel in this game
        color: String color of panel in this game
        textColor: String color of text at top of panel in this game
        buttonColor: String color of buttons in panel in this game
        buttonTextColor: String color of text in buttons in panel in this game
    }
    inspect: Object giving overall details for inspect panel {
        display: Boolean indicates whether or not this panel is displayed in this game
        label: String what text displays at top of panel in this game
        color: String color of panel in this game
        textColor: String color of text at top of panel in this game
        buttonColor: String color of buttons in panel in this game
        buttonTextColor: String color of text in buttons in panel in this game
    }
    inventory: Object giving overall details for inventory panel {
        display: Boolean indicates whether or not this panel is displayed in this game
        label: String what text displays at top of panel in this game
        color: String color of panel in this game
        textColor: String color of text at top of panel in this game
        buttonColor: String color of buttons in panel in this game
        buttonTextColor: String color of text in buttons in panel in this game
        useConfirmation: String default for text displayed in modal when item is clicked at a time its use conditions are met
        useFail: String default for text displayed in modal when item is clicked at a time its use conditions are not met
    }
    modal: Object giving overall details for modal that displays when inspecting {
        closeLabel: String default for text displayed in button to close modal
        takeLabel: String default for text displayed in button to take modal items
        color: String color of modal
        windowColor: String color of section of modal that displays text
        textColor: String color of text modal displays
        buttonColor: String color of buttons on modal
        buttonTextColor: String color of text in buttons on modal
    }
rooms: List of all rooms in the game [
    {
        id: String unique ID to identify room
        desc: String text that displays on main screen when in this room
        paths: List of paths from this room to other rooms [
            {
                id: String unique ID to identify path
                label: String what to display for path in path panel
                requirements: List of key value pairs for what conditions must be met for this path to appear in panel
                effect: List of key-value pairs for what changes the going through this path has on the game state variables

                roomId: String id of room this path takes you to
            }
        ]
        inspectables: List of inspectable things in room [
            {
                id: String unique ID to identify inspectable
                label: String what to display for inspectable in inspect panel
                requirements: List of key value pairs for what conditions must be met for this inspectable to appear in panel
                effect: List of key-value pairs for what changes the inspecting this inspectable has on the game state variables

                desc: String what to display in modal when inspecting inspectable
                descWithItems: String what to display in modal when inspectable has items

                closeLabel: String override for text displayed in button to close modal
                takeLabel: String override for text displayed on button to take items in modal
                color: String color of modal
                windowColor: String color of section of modal that displays text
                textColor: String color of text modal displays
                buttonColor: String color of buttons on modal
                buttonTextColor: String color of text in buttons on modal
                items: List of items in inspectable [
                    {
                        id: String unique ID to identiy item
                        label: String what to display for item in inventory panel
                        requirements: List of key value pairs for what conditions must be met for this item to appear in panel
                        effect: List of key-value pairs for what changes the use of this item has on the game state variables

                        toUse: List of key-value pairs for what conditions must be met to use this item
                        useConfirmation: String what to display when item is used at a time where its toUse conditions are met
                        useFail: String what to display when item is used at a time where its toUse conditions are not met
                        uses: Number indicating how many times an item can be used before it is expended.  Expended items do not appear in game inventory

                        closeLabel: String override for text displayed in button to close modal
                        takeLabel: String override for text displayed on button to take items in modal
                        color: String color of modal
                        windowColor: String color of section of modal that displays text
                        textColor: String color of text modal displays
                        buttonColor: String color of buttons on modal
                        buttonTextColor: String color of text in buttons on modal
                    }
                ]
            }
        ]
    }
]
}
*/

const game = {
    cartridge: {
        title: 'Dev Game',
        cartColor: 'orange'
    },
    config: {
        startingRoom: 'start-room',
        startingInventory: [
            {id: 'cool-rock', label: 'Cool Rock', useConfirmation: 'This rock is pretty cool!',},
        ],
        path: {
            display: true,
            label: 'Go to:',
            color: 'pink',
        },
        inspect: {
            display: true,
            label: 'Inspect:',
            color: 'cyan',
        },
        inventory: {
            display: 'true',
            label: 'Inventory:',
            color: 'lightgreen',
            useConfirmation: 'You use this item.  Good job!',
            useFail: 'This item cannot be used here.'
        },
        modal: {
            closeLabel: 'Back',
            takeLabel: 'Take',
        }
    },
    rooms: [
        {
            id: 'start-room',
            desc: 'You are in a room.  Before you is a massive, red door.  The door is locked.  To your left and to your right there is a smaller wooden door.  In your pocket, you notice a pretty cool rock.',
            paths: [
                {id: 'left-door', label: 'Left Door', roomId: 'left-room',},
                {id: 'right-door', label: 'Right Door', roomId: 'right-room',},
                {id: 'red-door', label: 'Red Door', roomId: 'second-room', requirements: [['redDoorUnlocked',true]]},
            ],
            inspectables: [
            ]
        },
        {
            id: 'left-room',
            desc: 'The room is small and dusty.  In it there is a wooden table with a locked blue box on it.',
            paths: [
                {id: 'left-to-center-door', label: 'Main Room', roomId: 'start-room'}
            ],
            inspectables: [
                {id: 'box-2', label: 'Box', descWithItems: 'Inside the box is a yellow key.', desc: 'The box is empty', requirements: [['blueDoorUnlocked',true]], items: [
                    {id: 'yel-key', label: 'Yellow Key', effect: [['yellowDoorUnlocked',true]], toUse: [['room','second-room']], useConfirmation: 'The key unlocks the yellow door.', useFail: 'This yellow key looks like it might open something yellow', uses: 1},
                ]}
            ]
        },
        {
            id: 'right-room',
            desc: 'The room is small and dusty.  In it there is a wooden table with a box on it.',
            paths: [
                {id: 'right-to-center-door', label: 'Main Room', roomId: 'start-room'}
            ],
            inspectables: [
                {id: 'box-1', label: 'Box', descWithItems: 'Inside the box are two keys.  One red and One blue.', desc: 'The box is empty', items: [
                    {id: 'red-key', label: 'Red Key', effect: [['redDoorUnlocked',true]], toUse: [['room','start-room']], useConfirmation: 'The key unlocks the red door.', useFail: 'This red key looks like it might open something red', uses: 1},
                    {id: 'blu-key', label: 'Blue Key', effect: [['blueDoorUnlocked',true]], toUse: [['room','left-room']], useConfirmation: 'The key unlocks the blue box.', useFail: 'This blue key looks like it might open something blue', uses: 1},
                ]}
            ]
        },
        {
            id: 'second-room',
            desc: 'This new room features a large, yellow door similar to the red door.',
            paths: [
                {id: 'second-to-center-door', label: 'Main Room', roomId: 'start-room'},
                {id: 'second-to-third-door', label: 'Yellow Door', roomId: 'third-room', requirements: [['yellowDoorUnlocked',true]]},
            ]
        },
        {
            id: 'third-room',
            desc: 'You made it to the final room!  You are smart and cool!'
        },
    ],
}

export default game;

