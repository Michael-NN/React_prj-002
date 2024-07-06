const game = {
    cartridge: {
        title: 'Fantasy Adventure'
    },
    config: {
        startingRoom: 'path',
        path: {
            display: true,
            label: 'Choose',
            color: '#c4bebb',
            textColor: '#000000',
            buttonColor: '#84d07d',
            buttonTextColor: '#000000',
        },
    },
    rooms: [
        {
            id: 'path',
            desc: 'You and your team of intrepid heroes have been traveling for weeks. Your mission is to head off the forces of the Skeleton King and retrieve the Orb of Necrosis before them. Should the Skeleton King gain the power of the orb, he will be nigh unstoppable. Before you are two options. First is a narrow mountain pass, it is trecherous but should get you ahead of the Skeleton King.  Alternatively, you can go around the mountains.  The path is safe, but you will lose precious time.',
            paths: [
                {id:'narrow-pass', label: 'Narrow Pass', roomId: 'path-A', requirements: []},
                {id:'around-mountains', label: 'Around the Mountains', roomId: 'path-B'},
            ],
        },
            {
                id: 'path-A',//Extra tired
                desc: 'The journey through the pass proves arduous, wearing down your party\'s stamina and morale.  But thankfully, it enables you to arrive at the Temple of Necrosis where the orb is located with the Skeleton King\'s forces still a full day out.  Before you is the main entrance to the temple.  Pulses of green light swirl through intricate carvings in the walls.  Magical defensive measures, no doubt.  Your rogue however, notices a crevis formed from weathering that offers an alternate way in.  The opening is a squeeze and you would have to leave your barbarian, with all her all broad muscle, behind.',
                paths: [
                    {id:'main-entrance', label: 'Main Entrance', roomId: 'path-AA'},
                    {id:'side-opening', label: 'Side Opening', roomId: 'path-AB'},
                ],
            },
                {
                    id: 'path-AA',//Extra tired, no wizard
                    desc: 'Your party steps carefully through the main entrance.  When suddenly, your wizard makes a mistep and is struck by a bolt of green energy causing him to drop instantly.  Grieving but forced to press on, you arrive at the central chamber and see the Orb of Necrosis on a pedestal before you.  The Orb is surrounded by an impenetrable field of necrotic energy.  The pedestal features a uniquely shaped slot and neary there are two stones that could fit it.  One is engraved with an image of a skull, and one an image of a butterfly.  You must decide which one to insert into the pedestal.',
                    paths: [
                        {id:'skull', label: 'Skull', roomId: 'path-AAA'},
                        {id:'butterfly', label: 'Butterfly', roomId: 'path-AAB'},
                    ],
                },
                    {
                        id: 'path-AAA',
                        desc: 'Carefully, you slide the stone with the skull engraving into the slot.  Streaks of green lightning arc from the pedestal and strike you and your companions.  You don\'t know what the meaning of this puzzle was, but evidently you chose wrong.',
                        paths: [
                            {id:'play-again-1', label: 'Play Again?', roomId: 'path'},
                        ],
                    },
                    {
                        id: 'path-AAB',
                        desc: 'Carefully, you slide the stone with the butterfly engraving into the slot.  After a moment of dead silence, the barrier around the Orb of Necrosis disepates.',
                        paths: [
                        ],
                    },
                {
                    id: 'path-AB',//extra tired, no barbarian
                    desc: 'After a few more spider webs in the face than you cared for, your party emerges in a side chamber of the temple, and makes your way to the central chamber where you see the Orb of Necrosis on a pedestal before you.  Your wizard examines the arcane runes and determines',
                    paths: [
                    ],
                },
            {
                id: 'path-B',//See the Skeleton King
                desc: 'Your party travels around the mountains without issue, but eventually catch signs of the Skeleton King\'s forces in the distance.  Being so close now means whichever of you gets to them temple first, the other wil be hot on their heels.  You consider the option to instead stand and fight now.  As the mightiest heroes in the realm, you do stand a chance at destroying the Skeleton King before he becomes invincible.  But should you fall, there will be no one to stand in his way.',
                paths: [
                    {id:'confront-skelly', label: 'Confront the Skeleton King', roomId: 'path-BA'},
                    {id:'stick-to-plan', label: 'Stick to the Plan', roomId: 'path-BB'},
                ],
            },
                {
                    id: 'path-BA',//confront the skeleton king
                    desc: 'You decide now is the time to fight.  Your party plans a careful ambush and charges into battle.  Blade clashes with bone, torrents of spells swirl around you. In the chaos, you catch a glimpse of the Skeleton King. If you slay him, this nightmare will all be over, but perhaps you should wait for you party to regroup and attack him together?',
                    paths: [
                        {id:'strike-now', label: 'Strike now!', roomId: 'path-BAA'},
                        {id:'regroup-first', label: 'Regroup first', roomId: 'path-BAB'},
                    ],
                },
                    {
                        id: 'path-BAA',
                        desc: 'You dash forward and cross blades with the Skeleton King.  His undead visage is grotesque and his magically enhanced swordsmanship is unparalled.  Blow after blow the he sends you reeling back with a splash of green necrotic energy until finally he runs you through with his blade of bone.  This is the end for you.  You pray your friends will not suffer the same fate.  That they\'ll arise victorious in this battle.  Alas, as the world fades around you, you will never know.',
                        paths: [
                            {id:'play-again-2', label: 'Play Again?', roomId: 'path'},
                        ],
                    },
                    {
                        id: 'path-BAB',
                        desc: 'By the time you and your party are back together, you\'ve lost sight of the Skeleton King. Still fighting off his remaining thralls, you attempt to locate him together. ',
                        paths: [
                        ],
                    },
                {
                    id: 'path-BB',//temple with SK close behind
                    desc: 'You decided to stick to the plan and strike onward for the temple.  You manage to arrive before the Skeleton King, but you know he is close behind.  You rush into the temple, deftly dodging traps that spring forth green bolts of necrotic magic and arrive in the central chamber. Before you sits the Orb of Necrosis on a stone pedestal, protected by an arcane barrier.  Your wizard is able to interpret the glyphs on the pedestal',
                    paths: [
                    ],
                },
    ],
}
export default game;