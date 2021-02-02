export interface homeProps {
    distanceToRefresh?: number,
    direction?: 'up' | 'down',
    onRefresh?: () => void,
    refreshing?: boolean,
    children?: any
}

export type dragStateType = {
    startTime: number,
    nowTime: number,
    duration: number,
    minY: number,
    maxY: number,
    pointY: number,
    momentumStartY: number,
    startY: number,
    offsetY: number,
    momentumTimeThreshold: number,
    momentumYThreshold: number,
    bezier: any,
    wrapperHeight: number,
    _startScreenX: number,
    _startScreenY: number
}