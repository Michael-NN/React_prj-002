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
            desc: 'You are the leader of a team intrip heroes: yourself, a mighty Warrior, a brilliant Mage, and a skilled Thief. There is an evil, undead entity known as The Skeleton King heading to a lost ancient temple to retrieve an artifact called The Orb of Necrosis. The Skeleton King is a daunting force as is, but if he retrieves The Orb, he will be nigh unstoppable. Your mission is to get to the temple first and retrieve The Orb. As you draw close, a choice of two paths lay before you. A narrow mountain pass will get you to the temple quickly, but will be taxing on your bodies and minds. Going around the mountains is a more sure path, but it will cost valuable time.',
            paths: [
                {id:'narrow-pass', label: 'Narrow Pass', roomId: 'path-A'},
                {id:'around-mountains', label: 'Around the Mountains', roomId: 'path-B'},
            ],
        },
        {
            id: 'path-A',
            desc: 'The shortcut through the mountains is harrowing, but your exhausted group arrives at the temple with expedience. As you stare down the foreboding temple entrance, you consider the countless traps that no doubt wait inside and the encroaching Skeleton King making his way here. Do you traverse the temple carefully to avoid traps, or boldly forge ahead lest the Skeleton King catch up to you?',
            paths: [
                {id:'check-for-traps', label: 'Check for Traps', roomId: 'path-AA',},
                {id:'rush-in', label: 'Rush In', roomId: 'path-AB',},
            ],
        },
        {
            id: 'path-AA',
            desc: 'You tread as carefully as you can. The Thief keeping an eye out for tripwires and trick stepping stones while the Mage puts out an arcane field to detect magical defenses. Unfortunately, the Warrior makes a misstep and the stone floor gives way beneth them. They plummet into a deadly spike pit below. Mourning your loss but forced to press on, you eventually reach the central chamber where you find the Orb of Necrosis. It is on a pedestal shielded behind a magic barrier. Before you are two glowing icons one resembling a Coffin and the other a Butterfly. Below it a series of ancient glyphs which the wizard translates, "Day by day thou toil on with willow, pine, or oak; Then shroud thyself in silk and don thy Mourning Cloak" With this riddle as your only clue, you must decide between the Coffin and the Butterfly',
            paths: [
                {id:'coffin', label: 'Coffin', roomId: 'path-AAA',},
                {id:'butterfly', label: 'Butterfly', roomId: 'path-AAB',},
            ],
        },
        {
            id: 'path-AAA',
            desc: 'You gently press your hand to the glowing Coffin icon. Evidently, it was the wrong answer. A bolt of necrotic energy arcs from the barrier and strikes the Thief, killing them instantly. Quickly, you throw your hand on the Butterfly instead and the barrier dissipates. Slowly, you reach forward and grab The Orb of Necrosis. As it sits in your clutch, you gaze at it pondering the power within. Now all the remains is to get out alive. You can return the way you came, braving the traps that already took one of your group, or you can look for an alternate way out.',
            paths: [
                {id:'return-how-you-came-in', label: 'Return How You Came In', roomId: 'path-AAAA',},
                {id:'find-another-way', label: 'Find Another Way', roomId: 'path-AAAB',},
            ],
        },
        {
            id: 'path-AAAA',
            desc: 'Looping back the way you came, means considering another decision. Treading carefully on your way in took a lot of time. You expect if you go just as slowly on the way out, the Skeleton King will catch up to you. But you also know rushing through quickly could cost more lives.',
            paths: [
                {id:'rush-out', label: 'Rush Out', roomId: 'path-AAAAA',},
                {id:'tread-carefully', label: 'Tread Carefully', roomId: 'path-AAAAB',},
            ],
        },
        {
            id: 'path-AAAAA',
            desc: 'Charging out quickly, you realize you do not remember the existing traps and safe steps as well as you thought. The Mage steps on a tripwire that sends a concealed javelin directly into their chest. Distracted by this, you pass through an invisible necrotic ward and which causes your body to slowly and painfully dissolve. To add to your anguish, you know that when the Skeleton King arrives here, he will find The Orb of Necrosis waiting for him.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AAAAB',
            desc: 'You move carefully through the perilous temple traps and are nearing the exit when suddenly the Mage shoves you aside. In doing so, they step on a tripwire that sends a concealed javelin directly into their chest. With the last of their strength, the Mage points out to you the faint shimmer of an invisible necrotic ward, a deadly barrier they narrowly saved you from walking into. Your friends have all been lost, but you make it out with The Orb only to come face-to-face with the grim visage of the Skeleton King, backed by a hoard of his undead minions. Do you stand and fight him or try to escape with The Orb?',
            paths: [
                {id:'stand-and-fight', label: 'Stand And Fight', roomId: 'path-AAAABA',},
                {id:'run-with-orb', label: 'Run With Orb', roomId: 'path-AAAABB',},
            ],
        },
        {
            id: 'path-AAAABA',
            desc: 'You dig down and summon all of your might, skill, and bravery to face down the Skeleton King. You are an exemplary fighter and clash after clash you meet the Skeleton King\'s unnaturally powerful blows. Unfortunately, there is only so much one person can do against such overwhelming evil. Eventually, the Skeleton King runs you through with his sword. As the light fades, you feel him take The Orb of Necrosis from you and stare into is vacant eye sockets before the darkness takes you.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AAAABB',
            desc: 'Sometimes discretion is the better part of valor. You dash away, running as quickly as your feet can carry you, with the Skeleton King and his minions on hot pursuit. Bobbing and weaving through the terrain you eventually manage to slip away from him. In the distance, you hear his bone-chilling, gutteral scream of fury. You return to the royal city with The Orb of Necrosis in hand. All of your friends have been lost, but The Orb has been kept out of the hands of evil.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AAAB',
            desc: 'Searching the walls of the inner chamber, you find a fissure that leads to an underground cave. You and the Mage traverse the rocky caverns until you come across a branching path. You can either scale a jagged rock face to ascend to the surface, or inch along an unstabble ledge over a deep chasm. Both should take you out to safety, if you survive.',
            paths: [
                {id:'climbing-wall', label: 'Climbing Wall', roomId: 'path-AAABA',},
                {id:'narrow-ledge', label: 'Narrow Ledge', roomId: 'path-AAABB',},
            ],
        },
        {
            id: 'path-AAABA',
            desc: 'You and the Mage try to scale the wall. By the time you\'re halfway up, your muscles are aching. The Warrior was always the brawny one, they probably could have carried you all. You try to keep ascending, but your arms are trembling and an attempt to grasp a lose stone sends the two of you tumbling down to your doom. The only consolation, there should be no chance the Skeleton King will know where you took The Orb of Necrosis.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AAABB',
            desc: 'You and the Mage slowly inch your way along the ledge. The abyss below you is a terrifying sight. You reflect on how this sort of thing would have been the Thief\'s element. Then a rock you stepped on gives way and a section of the ledge collapses. Both you and the Mage plummet into the abyss. The only consolation to your dark demise is that you are taking The Orb of Necrosis with you to the depths where it should never be found.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AAB',
            desc: 'You gently press your hand to the glowing Butterfly icon. Evidently, it was the correct answer. The barrier dissipates and you reach forward and grab The Orb of Necrosis. As it sits in your clutch, you gaze at it pondering the power within. Now all the remains is to get out alive. You can return the way you came, braving the traps that already took one of your group, or you can look for an alternate way out.',
            paths: [
                {id:'return-how-you-came-in', label: 'Return How You Came In', roomId: 'path-AABA',},
                {id:'find-another-way', label: 'Find Another Way', roomId: 'path-AABB',},
            ],
        },
        {
            id: 'path-AABA',
            desc: 'Looping back the way you came, means considering another decision. Treading carefully on your way in took a lot of time. You expect if you go just as slowly on the way out, the Skeleton King will catch up to you. But you also know rushing through quickly could cost more lives.',
            paths: [
                {id:'rush-out', label: 'Rush Out', roomId: 'path-AABAA',},
                {id:'tread-carefully', label: 'Tread Carefully', roomId: 'path-AABAB',},
            ],
        },
        {
            id: 'path-AABAA',
            desc: 'Dashing through the many obstacles and hazards of the temple, thing seem to be going smoothly until the Mage steps on a tripwire that sends a concealed javelin directly into their chest. You have no choice but to move on, and shortly after the Thief passes through an invisible necrotic ward and slowly their entire body is dissolved. In the end, only you make it out of the temple alive. The one benefit of your swiftness, the Skeleton King is still far behind. You return to the royal ciy and are celebrated as a hero. The sacrifice of your friends commemorated.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AABAB',
            desc: 'You move slowly and carefully through the temple, recalling the traps you avoided on the way in. That is until the Mage steps on a tripwire that sends a concealed javelin directly into their chest. You have no choice but to move on, and eventually you and the Thief make it out alive only to come face-to-face with the grim visage of the Skeleton King, backed by a hoard of his undead minions. Do you stand and fight him or try to escape with The Orb?.',
            paths: [
                {id:'stand-and-fight', label: 'Stand And Fight', roomId: 'path-AABABA',},
                {id:'run-with-orb', label: 'Run With Orb', roomId: 'path-AABABB',},
            ],
        },
        {
            id: 'path-AABABA',
            desc: 'You stare down what may well be the end and then rush at the Skeleton King. The Thief, meanwhile, occupies his undead minions. You are an exceptional combatant yourself, but you are barely able to keep up with the Skeleton King\'s unnatural might. As the battle drags on, your stamina begins to be depleted. You\'re not sure how much longer you can last when suddenly the Skeleton King freezes in place and collapses to the ground. Evidently, the Thief had finished off the minions and your ongong fight with the Skeleton King gave them the perfect opening for a sneak attack on the Skeleton King. The two of you return to the royal city and are celebrated as the heroes who destroyed the Skeleton King. Your lost friends are honered for their sacrifice.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AABABB',
            desc: 'Sometimes discretion is the better part of valor. You dash away, running as quickly as your feet can carry you, with the Skeleton King and his minions on hot pursuit. Bobbing and weaving through the terrain you eventually manage to slip away from him. In the distance, you hear his bone-chilling, gutteral scream of fury. You return to the royal city with The Orb of Necrosis in hand. You and the Thief return to the royal city where you are lauded as heroes. Your other friends\' lives have been lost in the endeavor, but The Orb of Necrosis has been kept out of the hands of evil.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AABB',
            desc: 'Searching the walls of the inner chamber, you find a fissure that leads to an underground cave. You traverse the rocky  with the Mage and the Thief until you come across a branching path. You can either scale a jagged rock face to ascend to the surface, or inch along an unstabble ledge over a deep chasm. Both should take you out to safety, if you survive.',
            paths: [
                {id:'climbing-wall', label: 'Climbing Wall', roomId: 'path-AABBA',},
                {id:'narrow-ledge', label: 'Narrow Ledge', roomId: 'path-AABBB',},
            ],
        },
        {
            id: 'path-AABBA',
            desc: 'The three of you try to scale the wall. By the time you\'re halfway up, your muscles are aching. The Warrior was always the brawny one, they probably could have carried you all. You try to keep ascending, but your arms are trembling and an attempt to grasp a lose stone sends you all tumbling down to your doom. The only consolation, there should be no chance the Skeleton King will know where you took The Orb of Necrosis.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AABBB',
            desc: 'You three slowly inch your way along the ledge. The abyss below you is a terrifying sight. A misstep nearly sends you careening downward, but the quick reflexes of the Thief catch you. Eventually, you all make it out of the cave and see daylight again. You return to the royal city with The Orb where you are celebrated for your successful mission. The Warrior you lost along way is honored for his noble sacrifice.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-AB',
            desc: 'With no time to lose, you forge ahead but quickly suffer the consequences. The Warrior steps on a tripwire that launches a concealed javelin. The Thief tackles them out of the way, but by bad luck, the simply left the javalin to keep flying until it struck and killed the Mage. Shortly there after, the Thief passes through an invisible necrotic ward and slowly their entire body is dissolved. Only you and the Warrior remain when you reach the central chamber where you find the Orb of Necrosis. It is on a pedestal shielded behind a magic barrier. Before you are two glowing icons one resembling a Coffin and the other a Butterfly. Below it a series of ancient glyphs but without the Mage, you have no idea what they mean. You can only make your best guess as to whether you should select the Coffin or the Butterfly',
            paths: [
                {id:'coffin', label: 'Coffin', roomId: 'path-ABA',},
                {id:'butterfly', label: 'Butterfly', roomId: 'path-ABB',},
            ],
        },
        {
            id: 'path-ABA',
            desc: 'You gently press your hand to the glowing Coffin icon. Evidently, it was the wrong answer. A bolt of necrotic energy arcs from the barrier and strikes the Warrior, killing them instantly. Quickly, you throw your hand on the Butterfly instead and the barrier dissipates. Slowly, you reach forward and grab The Orb of Necrosis. As it sits in your clutch, you gaze at it pondering the power within. Now all the remains is to get out alive. You can return the way you came, braving the traps that already took two of your group, or you can look for an alternate way out.',
            paths: [
                {id:'return-how-you-came-in', label: 'Return How You Came In', roomId: 'path-ABAA',},
                {id:'find-another-way', label: 'Find Another Way', roomId: 'path-ABAB',},
            ],
        },
        {
            id: 'path-ABAA',
            desc: 'You decide to return through the temple traps you faced once before. You navigate them well, recalling where many of them were on your way in. But you make one misstep and the stones of the floor fall out below, and you plummet into a hidden spike pit. As you fall, you know that not only is this the end, but when the Skeleton King arrives at the temple, he will find The Orb of Necrosis waiting for him.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-ABAB',
            desc: 'Searching the walls of the inner chamber, you find a fissure that leads to an underground cave. You traverse the rocky until you come across a branching path. You can either scale a jagged rock face to ascend to the surface, or inch along an unstabble ledge over a deep chasm. Both should take you out to safety, if you survive.',
            paths: [
                {id:'climbing-wall', label: 'Climbing Wall', roomId: 'path-ABABA',},
                {id:'narrow-ledge', label: 'Narrow Ledge', roomId: 'path-ABABB',},
            ],
        },
        {
            id: 'path-ABABA',
            desc: 'You try to scale the wall. By the time you\'re halfway up, your muscles are aching. The Warrior was always the brawny one, they probably could have carried you all. You try to keep ascending, but your arms are trembling and an attempt to grasp a lose stone sends you all tumbling down to your doom. The only consolation, there should be no chance the Skeleton King will know where you took The Orb of Necrosis.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-ABABB',
            desc: 'You slowly inch your way along the ledge. The abyss below you is a terrifying sight. You reflect on how this sort of thing would have been the Thief\'s element. Then a rock you stepped on gives way and a section of the ledge collapses. You plummet into the abyss. The only consolation to your dark demise is that you are taking The Orb of Necrosis with you to the depths where it should never be found.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-ABB',
            desc: 'You gently press your hand to the glowing Butterfly icon. Evidently, it was the correct answer. The barrier dissipates and you reach forward and grab The Orb of Necrosis. As it sits in your clutch, you gaze at it pondering the power within. Now all the remains is to get out alive. You can return the way you came, braving the traps that already took two of your group, or you can look for an alternate way out.',
            paths: [
                {id:'return-how-you-came-in', label: 'Return How You Came In', roomId: 'path-ABBA',},
                {id:'find-another-way', label: 'Find Another Way', roomId: 'path-ABBB',},
            ],
        },
        {
            id: 'path-ABBA',
            desc: 'Looping back the way you came, means considering another decision. Move quickly to keep your lead on the Skeleton King, or expend some of that lead time to get out as safely as you can.',
            paths: [
                {id:'rush-out', label: 'Rush Out', roomId: 'path-ABBAA',},
                {id:'tread-carefully', label: 'Tread Carefully', roomId: 'path-ABBAB',},
            ],
        },
        {
            id: 'path-ABBAA',
            desc: 'You and the Warrior try to move swiftly through the dangers of the temple. Managing to recall much of what you saw on the way in.  But then stones of the floor fall out below you, and you plummet into a hidden spike pit. As you fall, you know that not only is this the end, but when the Skeleton King arrives at the temple, he will find The Orb of Necrosis waiting for him.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-ABBAB',
            desc: 'You and the Warrior try to move swiftly through the dangers of the temple. Managing to recall much of what you saw on the way in.  Suddenly some stones of the floor fall out below you, and in the nick of time, the Warrior pushes you to safety as the floor collapses below them and they plummet into a hidden spike pit. Finally, you make it out of the temple alive, but having lost all of your friends. You return to the royal city and are celebrated as a hero, but the price paid weighs on you.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-ABBB',
            desc: 'Searching the walls of the inner chamber, you find a fissure that leads to an underground cave. You and the Warrior traverse the rocky caverns until you come across a branching path. You can either scale a jagged rock face to ascend to the surface, or inch along an unstabble ledge over a deep chasm. Both should take you out to safety, if you survive.',
            paths: [
                {id:'climbing-wall', label: 'Climbing Wall', roomId: 'path-ABBBA',},
                {id:'narrow-ledge', label: 'Narrow Ledge', roomId: 'path-ABBBB',},
            ],
        },
        {
            id: 'path-ABBBA',
            desc: 'You and the Warrior try to scale the wall. By the time you\'re halfway up, your muscles are aching. The Warrior is still going strong however, and is able to carry you on their back the rest of the way. You soon see sunlight and emerge back on the surface. You and the Warrior return to the royal city with The Orb of Necrosis. You are lauded as heroes and your fallen friends are commemorated.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-ABBBB',
            desc: 'You and the Warrior slowly inch your way along the ledge. The abyss below you is a terrifying sight. You reflect on how this sort of thing would have been the Thief\'s element. Then a rock you stepped on gives way and a section of the ledge collapses. Both you and the Warrior plummet into the abyss. The only consolation to your dark demise is that you are taking The Orb of Necrosis with you to the depths where it should never be found.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-B',
            desc: 'You and your group take the surer path around the mountain. The journey is going smoothly, until you see signs of the movement of the Skeleton King mere miles away from you. If you continue to the temple at this point, you can get there ahead of the Skeleton King, but he will be hot on your heals. Alternatively, you can change tactics and attempt to defeat the Skeleton King here and now.',
            paths: [
                {id:'rush-to-the-temple', label: 'Rush To The Temple', roomId: 'path-BA',},
                {id:'attack-the-skeleton-king', label: 'Attack The Skeleton King', roomId: 'path-BB',},
            ],
        },
        {
            id: 'path-BA',
            desc: 'You arrive at the temple and stare down its forbodding entrance. There are no doubt all manner of traps inside that are best navigated slowly and carefully. But you you know you don\'t have much time before the Skeleton King catches up to you.',
            paths: [
                {id:'check-for-traps', label: 'Check for Traps', roomId: 'path-BAA',},
                {id:'rush-in', label: 'Rush In', roomId: 'path-BAB',},
            ],
        },
        {
            id: 'path-BAA',
            desc: 'You tread as carefully as you can. The Thief keeping an eye out for tripwires and trick stepping stones while the Mage puts out an arcane field to detect magical defenses. You all make it to the the central chamber alive, but it takes so long you believe the Skeleton King will arrive before you make it out. In this central chamber, you find the Orb of Necrosis. It is on a pedestal shielded behind a magic barrier. Before you are two glowing icons one resembling a Coffin and the other a Butterfly. Below it a series of ancient glyphs which the wizard translates, "Day by day thou toil on with willow, pine, or oak; Then shroud thyself in silk and don thy Mourning Cloak" With this riddle as your only clue, you must decide between the Coffin and the Butterfly',
            paths: [
                {id:'coffin', label: 'Coffin', roomId: 'path-BAAA',},
                {id:'butterfly', label: 'Butterfly', roomId: 'path-BAAB',},
            ],
        },
        {
            id: 'path-BAAA',
            desc: 'You gently press your hand to the glowing Coffin icon. Evidently, it was the wrong answer. A bolt of necrotic energy arcs from the barrier and strikes the Thief, killing them instantly. Quickly, you throw your hand on the Butterfly instead and the barrier dissipates. Slowly, you reach forward and grab The Orb of Necrosis. As it sits in your clutch, you gaze at it pondering the power within. Now all the remains is to get out alive. You can return the way you came, braving the traps that already took one of your group, or you can look for an alternate way out.',
            paths: [
                {id:'return-how-you-came-in', label: 'Return How You Came In', roomId: 'path-BAAAA',},
                {id:'find-another-way', label: 'Find Another Way', roomId: 'path-BAAAB',},
            ],
        },
        {
            id: 'path-BAAAA',
            desc: 'As you double back the way you came, you know you are walking into an encounter with the Skeleton King. The Warrior insists on allowing them to battle the Skeleton King to give the rest of you the opportunity to escape with The Orb. The Mage suggests they could leverage the power of The Orb themselves to vanquish the Skeleton King. As the leader, it is up to you which plan you go with.',
            paths: [
                {id:'warrior', label: 'Warrior', roomId: 'path-BAAAAA',},
                {id:'mage', label: 'Mage', roomId: 'path-BAAAAB',},
            ],
        },
        {
            id: 'path-BAAAAA',
            desc: 'You make it out to the front of the temple, and come face-to-face with the grim visage of the Skeleton King, backed by a hoard of his undead minions. The Warrior lets out a battle cry and charges at the Skeleton King. You and the Mage are able to fight your way through the remaining minions to make your escape. But just as you\'re free, you look back and see the Warrior on their knees, about to be slain by the Skeleton King. Do you escape with your main objective, The Orb of Necrosis, or go back to try and save the Warrior?',
            paths: [
                {id:'escape-with-the-orb', label: 'Escape With The Orb', roomId: 'path-BAAAAAA',},
                {id:'help-the_warrior', label: 'Help The Warrior', roomId: 'path-BAAAAAB',},
            ],
        },
        {
            id: 'path-BAAAAAA',
            desc: 'Making a hard decision, you prioritize getting The Orb of Necrosis away from the Skeleton King. You and the Mage survive and return to the royal city where you are celebrated as heroes. Your fallen friends are remembered fondly for their sacrifce.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BAAAAAB',
            desc: 'In this moment you decide you cannot simply trade lives and you dash back help the Warrior. You make it just in time to parry the Skeleton King\'s blade and the Mage helps the Warrior to their feet. Emboldened by the power of friendship, the three of you stand against the Skeleton King and bring about his defeat. You return to the royal city as the heroes who slayed the Skeleton King. Your fallen friend is honored for their sacrifice.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BAAAAB',
            desc: 'You make it out to the front of the temple, and come face-to-face with the grim visage of the Skeleton King, backed by a hoard of his undead minions. You pass The Orb of Necrosis to the Mage who begins to generate a swirling miasma of necrotic energy. There is a dark tension in the air as the vortex grows larger. You fear it may be exceeding the Mages control. Suddenly, the necrotic power explodes outward and you feel the life being drained from your body. As the world begins to fade, you see the Mage and the Warrior collapse to the ground. You fall as well and your gaze lands on the Skeleton King\'s minions who have likewise collapsed. You realize this blast of untempered necrotic magic has vanquished the undead creatures and also taken the lives of you and your friends. You wonder if it was powerful enough to vanquish the Skeleton King himself as the darkness takes you.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BAAAB',
            desc: 'Searching the walls of the inner chamber, you find a fissure that leads to an underground cave. You, the Warrior, and the Mage traverse the rocky caverns until you come across a branching path. You can either scale a jagged rock face to ascend to the surface, or inch along an unstabble ledge over a deep chasm. Both should take you out to safety, if you survive.',
            paths: [
                {id:'climbing-wall', label: 'Climbing Wall', roomId: 'path-BAAABA',},
                {id:'narrow-ledge', label: 'Narrow Ledge', roomId: 'path-BAAABB',},
            ],
        },
        {
            id: 'path-BAAABA',
            desc: 'You, the Warrior, and the Mage try to scale the wall. By the time you\'re halfway up, your muscles are aching. The Warrior is still going strong however, and is able to carry both you and the Mage on their back the rest of the way. You soon see sunlight and emerge back on the surface. You all return to the royal city with The Orb of Necrosis. You are lauded as heroes and your fallen friend is commemorated.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BAAABB',
            desc: 'You, the Warrior, and the Mage slowly inch your way along the ledge. The abyss below you is a terrifying sight. You reflect on how this sort of thing would have been the Thief\'s element. Then a rock you stepped on gives way and a section of the ledge collapses. All three of you plummet into the abyss. The only consolation to your dark demise is that you are taking The Orb of Necrosis with you to the depths where it should never be found.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BAAB',
            desc: 'You gently press your hand to the glowing Butterfly icon. Evidently, it was the correct answer. The barrier dissipates and you reach forward and grab The Orb of Necrosis. As it sits in your clutch, you gaze at it pondering the power within. Now all the remains is to get out alive. You can return the way you came, braving the traps that already took one of your group, or you can look for an alternate way out.',
            paths: [
                {id:'return-how-you-came-in', label: 'Return How You Came In', roomId: 'path-BAABA',},
                {id:'find-another-way', label: 'Find Another Way', roomId: 'path-BAABB',},
            ],
        },
        {
            id: 'path-BAABA',
            desc: 'Your group heads back out the way you came, carefully navigating the traps of the temple, but knowing you\'ve taken enough time that you will see the Skeleton King before you are out. Thankfully, the Thief is well versed in stealth. When the Skeleton King arrived, you were hidding in an alcove of the temple and simply allowed them to pass you by before continuing your egress. Your group all make it back to the royal city with The Orb of Necrosis and are celebrated as heroes.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BAABB',
            desc: 'Searching the walls of the inner chamber, you find a fissure that leads to an underground cave. You all traverse the rocky caverns until you come across a branching path. You can either scale a jagged rock face to ascend to the surface, or inch along an unstabble ledge over a deep chasm. Both should take you out to safety, if you survive.',
            paths: [
                {id:'climbing-wall', label: 'Climbing Wall', roomId: 'path-BAABBA',},
                {id:'narrow-ledge', label: 'Narrow Ledge', roomId: 'path-BAABBB',},
            ],
        },
        {
            id: 'path-BAABBA',
            desc: 'You all try to scale the wall. By the time you\'re halfway up, your muscles are aching. The Warrior is still going strong however, and is able to carry you all on their back the rest of the way. You soon see sunlight and emerge back on the surface. You all return to the royal city with The Orb of Necrosis. You are celebrated as heroes.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BAABBB',
            desc: 'You all slowly inch your way along the ledge. The abyss below you is a terrifying sight. A misstep nearly sends you careening downward, but the quick reflexes of the Thief catch you. Eventually, you all make it out of the cave and see daylight again. You return to the royal city with The Orb where you are celebrated for your successful mission.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BAB',
            desc: 'You make haste into the temple, knowing the Skeleton King is close behind, but you pay the price. The Mage carelessly steps onto a section of fake flooring. The stones crumble beneth them and they plummet into a spike bit below. You have no choice but to keep moving forward and you reach the central chamber where you find the Orb of Necrosis. It is on a pedestal shielded behind a magic barrier. Before you are two glowing icons one resembling a Coffin and the other a Butterfly. Below it a series of ancient glyphs but without the Mage, you have no idea what they mean. You can only make your best guess as to whether you should select the Coffin or the Butterfly.',
            paths: [
                {id:'coffin', label: 'Coffin', roomId: 'path-BABA',},
                {id:'butterfly', label: 'Butterfly', roomId: 'path-BABB',},
            ],
        },
        {
            id: 'path-BABA',
            desc: 'You gently press your hand to the glowing Coffin icon. Evidently, it was the wrong answer. A bolt of necrotic energy arcs from the barrier and strikes the Warrior, killing them instantly. Quickly, you throw your hand on the Butterfly instead and the barrier dissipates. Slowly, you reach forward and grab The Orb of Necrosis. As it sits in your clutch, you gaze at it pondering the power within. Now all the remains is to get out alive. You can return the way you came, braving the traps that already took one of your group, or you can look for an alternate way out.',
            paths: [
                {id:'return-how-you-came-in', label: 'Return How You Came In', roomId: 'path-BABAA',},
                {id:'find-another-way', label: 'Find Another Way', roomId: 'path-BABAB',},
            ],
        },
        {
            id: 'path-BABAA',
            desc: 'Looping back the way you came, means considering another decision. You know the the Skeleton King is hot on your heels. Moving through dangers of the temple slowly will likely mean encountering him. But rushing through them could cost you another life.',
            paths: [
                {id:'rush-out', label: 'Rush Out', roomId: 'path-BABAAA',},
                {id:'tread-carefully', label: 'Tread Carefully', roomId: 'path-BABAAB',},
            ],
        },
        {
            id: 'path-BABAAA',
            desc: 'As you and the Thief carefully traverse the dangers of the temple, you hear the Skeleton King approaching. Using their knowledge of stealth, the Thief is able to hide you both in an alcove and let the Skeleton King simply pass you by.  The two of you escape back to the royal city with The Orb of Necrosis where you are celebrated as heroes and your fallen friends are commemorated.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BABAAB',
            desc: 'You and the Thief are running through the temple in the hopes of making it out before the Skeleton King arrives. Unfortunately, the usually observant Thief steps on a tripwire that tirggers a concealed javelin to be launched directly into their chest. You keep moving, leaving your last friend behind and make it out without ever seeing the Skeleton King. You return to the royal city and are celebrated as a hero, but the loss of your friends weighs on you.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BABAB',
            desc: 'Searching the walls of the inner chamber, you find a fissure that leads to an underground cave. You and the Thief traverse the rocky caverns until you come across a branching path. You can either scale a jagged rock face to ascend to the surface, or inch along an unstabble ledge over a deep chasm. Both should take you out to safety, if you survive.',
            paths: [
                {id:'climbing-wall', label: 'Climbing Wall', roomId: 'path-BABABA',},
                {id:'narrow-ledge', label: 'Narrow Ledge', roomId: 'path-BABABB',},
            ],
        },
        {
            id: 'path-BABABA',
            desc: 'You and the Thief try to scale the wall. By the time you\'re halfway up, your muscles are aching. The Warrior was always the brawny one, they probably could have carried you all. You try to keep ascending, but your arms are trembling and an attempt to grasp a lose stone sends the two of you tumbling down to your doom. The only consolation, there should be no chance the Skeleton King will know where you took The Orb of Necrosis.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BABABB',
            desc: 'You and the Thief slowly inch your way along the ledge. The abyss below you is a terrifying sight. A misstep nearly sends you careening downward, but the quick reflexes of the Thief catch you. Eventually, you both make it out of the cave and see daylight again. You return to the royal city with The Orb where you are celebrated for your successful mission. The friends you lost along way is honored for their noble sacrifice.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BABB',
            desc: 'You gently press your hand to the glowing Butterfly icon. Evidently, it was the correct answer. The barrier dissipates and you reach forward and grab The Orb of Necrosis. As it sits in your clutch, you gaze at it pondering the power within. Now all the remains is to get out alive. You can return the way you came, braving the traps that already took one of your group, or you can look for an alternate way out.',
            paths: [
                {id:'return-how-you-came-in', label: 'Return How You Came In', roomId: 'path-BABBA',},
                {id:'find-another-way', label: 'Find Another Way', roomId: 'path-BABBB',},
            ],
        },
        {
            id: 'path-BABBA',
            desc: 'Looping back the way you came, means considering another decision. You know the the Skeleton King is hot on your heels. Moving through dangers of the temple slowly will likely mean encountering him. But rushing through them could cost you another life.',
            paths: [
                {id:'rush-out', label: 'Rush Out', roomId: 'path-BABBAA',},
                {id:'tread-carefully', label: 'Tread Carefully', roomId: 'path-BABBAB',},
            ],
        },
        {
            id: 'path-BABBAA',
            desc: 'Moving carefully to keep your friends alive, you know you are going to have to face the Skeleton King. The Warrior insists on allowing them to battle the Skeleton King to give the rest of you the opportunity to escape with The Orb. The Thief suggests simply finding a place to hide and let the Skeleton King pass you by. Which plan will you go with?',
            paths: [
                {id:'warrior', label: 'Warrior', roomId: 'path-BABBAAA',},
                {id:'thief', label: 'Thief', roomId: 'path-BABBAAB',},
            ],
        },
        {
            id: 'path-BABBAAA',
            desc: 'As you are nearly out of the temple, you come face-to-face with the grim visage of the Skeleton King, backed by a hoard of his undead minions. The Warrior lets out a resounding battle cry and charges the Skeleton King while you and the Thief make fight your way through his minions. Just as you escape, you glance back and see the Warrior get run through by the sword of the Skeleton King. You and the thief return to the royal city where you are celebrated has heroes and your fallen friends are commemorated.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BABBAAB',
            desc: 'Despite the Warriors protested demands for a chance to find and evil skeleton, you go with the stealthier approach. Hiding in an alcove near the temple entrance, you allow the Skeleton King to simply pass you by. You all return to the royal city and are celebrated as heroes. The Mage you lost along the way is commemorated for their noble sacrifice.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BABBAB',
            desc: 'You and your friends make haste to get out of the temple before the Skeleton King arrives. Unfortunately, the warrior accidentally walked through an invisible necrotic ward and slowly their entire body is dissolved. You and the Thief make it back to the royal city with The Orb of Necrosis. You are lauded as heroes and your fallen friends are honered for their sacrifice.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BABBB',
            desc: 'Searching the walls of the inner chamber, you find a fissure that leads to an underground cave. You all traverse the rocky caverns until you come across a branching path. You can either scale a jagged rock face to ascend to the surface, or inch along an unstabble ledge over a deep chasm. Both should take you out to safety, if you survive.',
            paths: [
                {id:'climbing-wall', label: 'Climbing Wall', roomId: 'path-BABBBA',},
                {id:'narrow-ledge', label: 'Narrow Ledge', roomId: 'path-BABBBB',},
            ],
        },
        {
            id: 'path-BABBBA',
            desc: 'You all try to scale the wall. By the time you\'re halfway up, your muscles are aching. The Warrior is still going strong however, and is able to carry you and the Thief on their back the rest of the way. You soon see sunlight and emerge back on the surface. You all return to the royal city with The Orb of Necrosis. You are lauded as heroes. The Mage you lost along way is honored for their noble sacrifice.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BABBBB',
            desc: 'You three slowly inch your way along the ledge. The abyss below you is a terrifying sight. A misstep nearly sends you careening downward, but the quick reflexes of the Thief catch you. Eventually, you all make it out of the cave and see daylight again. You return to the royal city with The Orb where you are celebrated for your successful mission. The Mage you lost along way is honored for their noble sacrifice.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BB',
            desc: 'You decide to intercept the Skeleton King and make your way to a location you predict is on his path to the temple. You expect he is accompanied by a hoard of undead minions which leave you with two choice for tactics. The Skeleton King is a powerful necromancer, but the Mage believes they can prepare a magic circle that will trap him. Alternatively, you can start with a coordinated surprise attack to take out the undead minions. The decision is up to you.',
            paths: [
                {id:'magic-circle', label: 'Magic Circle', roomId: 'path-BBA',},
                {id:'ambush', label: 'Ambush', roomId: 'path-BBB',},
            ],
        },
        {
            id: 'path-BBA',
            desc: 'You wait with bated breath as the Skeleton King and his minions arrive. Just as intended, the Skeleton King walks on to the concealed magic circle and the enchantment is triggered. You move in to attack the trapped Skeleton King, but his minions stand in your way. As you and your friends fight the through the crowd you see an opening in their line you could dart through to go directly for the Skeleton King, who you fear my break free. Or perhaps it would be better to stay with the group and finish the undead minions first.',
            paths: [
                {id:'skeleton-king', label: 'Skeleton King', roomId: 'path-BBAA',},
                {id:'undead-minions', label: 'Undead Minions', roomId: 'path-BBAB',},
            ],
        },
        {
            id: 'path-BBAA',
            desc: 'You break away from the formation with your friends to go straight for the Skeleton King. Your friends begin to be overwhelmed without you and you wonder if you made the right decion as you watch the undead minions kill the Warrior of your group. But too late to go change course now, you engage in battle with the Skeleton King. Even trapped by the magic circle, he has powerful magic. But you duel him with skill and power and eventually bring him to his knees. Just as you are about to deliver the finish blow, he speaks to you for the first time. He says that he was once a man whose past mistakes turned him into what he is now and that his campaign of slaughter has been to harvest souls to sustain himself, but if he acquires The Orb of Necrosis, its boundless power will mean he no longer needs to take the lives of others. The only question is, do you believe him?',
            paths: [
                {id:'trust', label: 'Trust', roomId: 'path-BBAAA',},
                {id:'kill', label: 'Kill', roomId: 'path-BBAAB',},
            ],
        },
        {
            id: 'path-BBAAA',
            desc: 'You lower your weapon. Your friends, having finished the undead minions join you at your side. You order the Mage to release the Skeleton King and the instant they do, several things happen in the blink of an eye. The Skeleton King immediately leaps to strike you down, the quick reflexes of the Thief enable them to intercede and save you by taking the attack in your place, and finally the wizard casts a spell that deals the Skeleton King its finishing blow. You lost two of your friends, but the Skeleton King is dead. You and the Mage return to the royal city to report the good news and to mourn your loss.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBAAB',
            desc: 'What kind of fool does the Skeleton King, incarnation of pure evil, take you for? You strike him down and save the land from his cruelty. But as you and your surviving friends set off to return to the royal city, you can\'t help but wonder if he was telling the truth.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBAB',
            desc: 'You trust the magic circle will keep the Skeleton King bound and stick with your friends. Working together against mindless minions cut off from their leader, you make quick work the undead forces. But as you turn your attention to the Skeleton King, you see he has gathered enough power to break free from from the magic circle. Now you must make another decision. If the rest of you occupy the Skeleton King for long enough, the Mage should be able to construct a ritual that will destroy the Skeleton King for good, or perhaps it would be better all of you attack him together and take him down through the tried and true "extreme violence" method',
            paths: [
                {id:'protect-the-mage', label: 'Protect the Mage', roomId: 'path-BBABA',},
                {id:'everyone-attack', label: 'Everyone Attack', roomId: 'path-BBABB',},
            ],
        },
        {
            id: 'path-BBABA',
            desc: 'You order the Mage to being casting the ritual while the rest of you hold off the Skeleton King.  Your friends turn to your tactical leadership and you must decide whether to prioritize a strong offense to keep the Skeleton King on the back foot, or watching each other\'s backs to keep everyone alive.',
            paths: [
                {id:'offensive-strategy', label: 'Offensive Strategy', roomId: 'path-BBABAA',},
                {id:'defensive-strategy', label: 'Defensive Stragety', roomId: 'path-BBABAB',},
            ],
        },
        {
            id: 'path-BBABAA',
            desc: 'A violent and chaotic battle ensues. The Warrior charging in to overwhelm the Skeleton King while the Thief subtly knows him off balance. All seems to be going well until the Skeleton King telekinetically pulls the Thief into the path of the Warrior\'s attack before unleashing a bolt of necrotic energy that kills the Warrior instantly. The Mage is almost done with their spell, but you see the Skeleton King conjuring another attack to be aimed at them. You can run in to intercept the attack or call out to warn the Mage.',
            paths: [
                {id:'intercept', label: 'Intercept', roomId: 'path-BBABAAA',},
                {id:'call-out', label: 'Call Out', roomId: 'path-BBABAAB',},
            ],
        },
        {
            id: 'path-BBABAAA',
            desc: 'Your body moves almost automatically to stand between the Mage and the Skeleton King. As the Skeleton King\'s spells strikes you, you hear the Mage complete their complex spell. The last thing you see before the darkness takes you as the body of the Skeleton King turn to dust as the Mage\'s spell unravels his very being.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBABAAB',
            desc: 'You yell out to warn the Mage, but they aren\'t quick enough to react. The Skeleton King\'s attack fells the Mage as well and you are left facing him alone. You try bravely to duel him, despite knowing it is a losing battle. Ultimately, the Skeleton King strikes you down as well and, you can only assume, goes on to acquire The Orb of Necrosis.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBABAB',
            desc: 'You, the Warrior, and the Thief move in well-practiced synchronization. Every attack you each make covered by one of the others, every rebuke from the Skeleton King deftly parried. The fight does on until finally the Mage\'s ritual is complete. A burst of arcane energy shines outward and the Skeleton King stops. He seizes up and then slowly his body turns to dust as the Mage has unravelled the magic threads that held him together. You and your friends have defeated the Skeleton King!',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBABB',
            desc: 'You decide the time to attack is now and all four of your make a coordinated effort to destroy this great evil. You are the tactical leader of this group and must decide on your formation. Do you all focus on offense to overwhelm the Skeleton King, or do you fight more defensively and try to cover each other\'s openings?',
            paths: [
                {id:'offensive-strategy', label: 'Offensive Strategy', roomId: 'path-BBABBA',},
                {id:'defensive-strategy', label: 'Defensive Stragety', roomId: 'path-BBABBB',},
            ],
        },
        {
            id: 'path-BBABBA',
            desc: 'Your strategy of "best defense is a good offense" serves you well. Four of the realms mighties heroes all attacking at once are too much for even the Skeleton King to handle. Blow by blow you wear him down until finally he is a pile of inanimate bones which you continue to attack for a while for good measure.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBABBB',
            desc: 'The battle drags on for a while. The Skeleton King is a powerful adversary even for the likes of you and your friends. Finally the Skeleton King makes a mistake that costs both sides dearly. He teleports behind the Mage of your group swiftly dispatches them. This however leaves him open to a particularly vengeful blow from the Warrior that does the Skeleton King in.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBB',
            desc: 'You decide the better tactic is to chip away at this great evil one piece at time. You lay in wait for the Skeleton King to arrive, and when he does you and your friends unleash a sudden ambush to remove his undead minions from the equation. However, the Skeleton King\'s own tactal mind guides the minions and the Thief of your group falls during the battle. At this point you reconsider. Should you switch tactics to straight for the Skeleton King and end things or follow through with defeating his minions first?',
            paths: [
                {id:'skeleton-king', label: 'Skeleton King', roomId: 'path-BBBA',},
                {id:'undead-minions', label: 'Undead Minions', roomId: 'path-BBBB',},
            ],
        },
        {
            id: 'path-BBBA',
            desc: 'You break away from the main battle and dart directly for the Skeleton King. Almost immediately you regret your decision as the Warrior and the Mage are overwhelmed and killed. Now you are alone, caught between the Skeleton King and his undead minions. Do you follow through on the decision that cost you friends or double back and slay their killers?',
            paths: [
                {id:'skeleton-king', label: 'Skeleton King', roomId: 'path-BBBAA',},
                {id:'undead-minions', label: 'Undead Minions', roomId: 'path-BBBAB',},
            ],
        },
        {
            id: 'path-BBBAA',
            desc: 'With a heart full of fury for your fallen friends, you charge directly at the Skeleton King. He delivers a counter attack that presumably he expected you to block. Instead you let his attack hit you just to follow through on your attack against him.  The both of you fall to the ground. As the light fades, you apologize to your friends you let die.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBBAB',
            desc: 'You double back and a whirlwind of combat skill vanquish every last one of the undead minions. By the time you are done, the Skeleton King has absconded, presumably to head to the temple where The Orb of Necrosis awaits. You could chase after him on your own or you could hurry back to the royal city to at least warn them all of what has happened.',
            paths: [
                {id:'chase-the-skeleton-king', label: 'Chase The Skeleton King', roomId: 'path-BBBABA',},
                {id:'royal-city', label: 'Royal City', roomId: 'path-BBBABB',},
            ],
        },
        {
            id: 'path-BBBABA',
            desc: 'By the time you reach the temple, the Skeleton King is already coming back out in possession of The Orb of Necrosis. You see before you a fully realized force of unrivaled evil and your heart sinks, knowing you have failed and the realm is doomed. At least the Skeleton King makes your death instantaneous.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBBABB',
            desc: 'A shamed of how things have turned out, you return to the royal city. The advanced word of the Skeleton King\'s success in reaching The Orb of Necrosis should at least give the realm a fighting chance when it assemles its next group of heroes. Suffice to say, you will not be on it.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBBB',
            desc: 'You stay the course and continue the battle. The Mage of your group is slain the battle as well, but ultimately you vanquish the Skeleton King\'s minions and then corner the Skeleton King himself. It is at this point that he speaks to you for the first time. He says that he was once a man whose past mistakes turned him into what he is now and that his campaign of slaughter has been to harvest souls to sustain himself, but if he acquires The Orb of Necrosis, its boundless power will mean he no longer needs to take the lives of others. The only question is, do you believe him?',
            paths: [
                {id:'', label: '', roomId: 'path-BBBBA',},
                {id:'', label: '', roomId: 'path-BBBBB',},
            ],
        },
        {
            id: 'path-BBBBA',
            desc: 'You lower your weapons and show Skeleton King mercy. He immediately takes advantage of your trust and unleashes a pair of bolts of necrotic energy that kill you and the Warrior instantly. Great going.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
        {
            id: 'path-BBBBB',
            desc: 'What kind of fool does the Skeleton King, incarnation of pure evil, take you for? You strike him down and save the land from his cruelty. But as you and your surviving friends set off to return to the royal city, you can\'t help but wonder if he was telling the truth.',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
    ],
}
    /*
        {
            id: 'path-',
            desc: '',
            paths: [
                {id:'', label: '', roomId: 'path-',},
                {id:'', label: '', roomId: 'path-',},
            ],
        },
        {
            id: 'path-',
            desc: '',
            paths: [
                {id:'start-again', label: 'Start again?', roomId: 'path',},
            ],
        },
    */
        export default game;