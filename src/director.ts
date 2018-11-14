import { hider, seeker, goal } from './nouns/unit';

const distance = ( p1, p2 ) => {
    !p2 
        ? p => distance( p1, p )
        : Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) )
}

const initialState: {
    goals: Goal[]
} = {
    goals: [
        goal( { position: { x: 0, y: 0 } } ),
        goal(... ),
        goal(... ),
    ],
    seeker: seeker( ... ),
    hider: hider( ... ),
    history: []
}

const tickPerSecond = 1;