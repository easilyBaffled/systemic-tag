/**
 * @prettier
 */

// A collection of settings that will turn our unit into what ever specific entity it's supposed to be
// This should be an asset that we can modify both in and out of runtime and apply it to a unit

/* Unit Profile
    These attributes should be avalable to be edited while running
*/

export enum UnitType {
    Player,
    Goal
}

export enum PlayerType {
    Hider,
    Seeker
}

export enum MoveStatus {
    Prone,
    Moving,
    Standing
}

export enum ActionType {
    Consume,
    Move
}

export interface Action {
    tag: ActionType;
    payload: Point | UnitType.Goal | PlayerType | object;
}

export interface Point {
    x: number;
    y: number;
}

export interface Consumer {
    readonly targetType: UnitType.Goal | PlayerType;
    consumeTarget: (target: UnitType.Goal | PlayerType) => Action;
}

export interface Moveable {
    position: Point;
    speed: number;
    moveStatus: MoveStatus;
    target: Point | UnitType.Goal | PlayerType;
    move: (target: Moveable['target']) => Action;
}

export interface Unit {
    position: Point;
    health: number;
    value: number;
}

export interface Seeker {
    tag: PlayerType.Seeker;
}

export interface Hider {
    tag: PlayerType.Hider;
}

export interface Goal {
    tag: UnitType.Goal;
    consumptionReq: object;
}

export const startPoint: Point = {
    x: 0,
    y: 0
};

export const baseHealth: number = 10;
export const baseValue: number = 10;

export const moveableAttr = ({
    position = startPoint,
    speed = 1,
    moveStatus = MoveStatus.Standing,
    target = null,
    move
}: {
    position?: Point;
    speed?: number;
    moveStatus?: MoveStatus;
    target?: Point | UnitType.Goal | PlayerType;
    move: (target: Moveable['target']) => Action;
}): Moveable => ({
    position,
    speed,
    moveStatus,
    target,
    move
});

export const consumerAttr = ({
    targetType,
    consumeTarget
}: {
    targetType: Consumer['targetType'];
    consumeTarget: Consumer['consumeTarget'];
}): Consumer => ({
    targetType,
    consumeTarget
});

export const unitAttr = (
    {
        position = startPoint,
        value = baseValue,
        health = baseHealth
    }: { position?: Point; value?: number; health?: number } = {
        position: startPoint,
        value: baseValue,
        health: baseHealth
    }
): Unit => ({
    position,
    value,
    health
});

export const goalAttr = ({
    consumptionReq
}: { consumptionReq?: any } = {}): Goal => ({
    tag: UnitType.Goal,
    consumptionReq
});

export const hider: Hidder & Unit & Consumer & Moveable = props => ( {
    tag: PlayerType.Hider
    ...unitAttr(props ),
    ...consumerAttr({
        ...props,
        targetType: UnitType.Goal,
        consumeTarget: (target: UnitType.Goal) => ({
            tag: ActionType.Consume,
            payload: target
        })
    }),
    ...moveableAttr({
        ...props,
        move: (target: Moveable['target']) => ({
            tag: ActionType.Move,
            payload: target
        })
    })
} )

export const seeker: Seeker & Unit & Consumer & Moveable = props => ( {
    tag: PlayerType.Seeker
    ...unitAttr( props ),
    ...consumerAttr({
        ...props,
        targetType: PlayerType.Hider,
        consumeTarget: (target: PlayerType.Hider) => ({
            tag: ActionType.Consume,
            payload: target
        })
    }),
    ...moveableAttr({
        ...props
        move: (target: Moveable['target']) => ({
            tag: ActionType.Move,
            payload: target
        })
    })
} )

export const goal: Goal & Unit = props => ( {
    ...unitAttr( props )
    ...goalAttr({ props, consumptionReq: target => target.tag === PlayerType.Hider }),
} )