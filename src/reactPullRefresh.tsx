import React, { FC, TouchEvent, useRef, MouseEvent, useState, useEffect } from 'react';
import './index.less';
import { dragStateType, homeProps } from './propType';


const durationMap: any = {
    'noBounce': 2500,
    'weekBounce': 800,
    'strongBounce': 400,
};

const bezierMap: any = {
    'noBounce': 'cubic-bezier(.17, .89, .45, 1)',
    'weekBounce': 'cubic-bezier(.25, .46, .45, .94)',
    'strongBounce': 'cubic-bezier(.25, .46, .45, .94)',
};


const ReactPullRefresh :FC<homeProps> = (props: homeProps) => {
    const { onRefresh = () => {} , refreshing, direction, distanceToRefresh = 25, children } = props;
    const contentRef = useRef<any>();
    const contentWrapperRef = useRef<any>();
    const [ scrollStyle, setScrollStyle ] = useState<any>();
    const [ isStarted, setIsStarted ] = useState<boolean>(false);
    const [ dragState, setDragState ] = useState<dragStateType>({
        duration: 0,
        minY: 0,
        maxY: 0,
        pointY: 0,
        momentumStartY: 0,
        startY: 0,
        offsetY: 0,
        momentumTimeThreshold: 300,
        momentumYThreshold: 15,
        startTime: 0,
        nowTime: 0,
        bezier: 'linear',
        wrapperHeight: 0,
        _startScreenX: 0,
        _startScreenY: 0
    });

    useEffect(() => {
        const { height: wrapperHeight } = contentRef.current.getBoundingClientRect();
        const { height: scrollHeight } = contentWrapperRef.current.getBoundingClientRect();
        dragState.minY = wrapperHeight - scrollHeight;
        dragState.wrapperHeight = wrapperHeight;
        contentWrapperRef.current.addEventListener("transitionend", isNeedReset);
        setDragState(dragState);
        return distroy;
    },[])   

    const distroy = () => {
        contentWrapperRef.current.removeEventListener("transitionend", isNeedReset);
        contentWrapperRef.current.removeEventListener("touchstart", onTouchStart);
        contentWrapperRef.current.removeEventListener("touchmove", onTouchMove);
        contentWrapperRef.current.removeEventListener("touchcancel", ontouchcancel);
    }

    const onTouchStart = (event:TouchEvent<HTMLDivElement>) => {
        const point = event.changedTouches[0];
        stop();
        setIsStarted(true);
        dragState.pointY =  point.pageY;
        dragState._startScreenY = point.screenY;
        dragState._startScreenX = point.screenX;
        dragState.startTime = new Date().getTime();
        dragState.duration = 0;
        dragState.momentumStartY = dragState.startY = dragState.offsetY;
        setDragState(dragState);
    }

    const onTouchMove = (event:TouchEvent<HTMLDivElement>) => {
        if(!isStarted) return;
        const point = event.changedTouches[0];
        // 使用 pageY 对比有问题
        const _screenY = point.screenY;
        const _screenX = point.screenX;
        // 横向滑动不处理
        if (Math.abs(_screenX - dragState._startScreenX) > 20 * window.devicePixelRatio) {
            return;
        }
        
        const deltaY = point.pageY - (dragState.pointY || 0);
        // 浮点数坐标会影响渲染速度
        let offsetY = Math.round((dragState.startY || 0) + deltaY);
        // 超出边界时增加阻力
        if (offsetY < dragState.minY || offsetY > dragState.maxY) {
            offsetY = Math.round((dragState.startY || 0) + deltaY / 3);
        }
        if (dragState.offsetY < dragState.minY-distanceToRefresh || dragState.offsetY > distanceToRefresh) {
            offsetY = Math.round((dragState.startY || 0) + deltaY / 3);
            return;
        }

        dragState.offsetY = offsetY;
        const now = new Date().getTime();
        // 记录在触发惯性滑动条件下的偏移值和时间
        if (now - (dragState.startTime || 0) > dragState.momentumTimeThreshold) {
            dragState.momentumStartY = dragState.offsetY;
            dragState.startTime = now;
        }
        setDragState(dragState);
        setStyle(dragState); 
    }


    const setStyle = ({offsetY, duration, bezier}: dragStateType) => {
        setScrollStyle({
            'transform': `translate3d(0, ${offsetY}px, 0)`,
            'transitionDuration': `${duration}ms`,
            'transitionTimingFunction': bezier,
        })
    }


    const ontouchcancel = (event: TouchEvent<HTMLDivElement>) => {
        if(!isStarted) return;
        setIsStarted(false);
        if(direction === 'up'){ 
            if(dragState.offsetY < dragState.minY - distanceToRefresh){
                onRefresh();
                return;
            }
        }
        if(direction === 'down'){
            if(dragState.offsetY > distanceToRefresh){
                onRefresh();
                return;
            }
        }
        if(isNeedReset()) return;
        const absDeltaY = Math.abs(dragState.offsetY - dragState.momentumStartY);
        const duration = new Date().getTime() - dragState.startTime;
         // 启动惯性滑动
        if (duration < dragState.momentumTimeThreshold && absDeltaY > dragState.momentumYThreshold) {
            const momentumData = momentum(dragState.offsetY, dragState.momentumStartY, duration);
            dragState.offsetY = Math.round(momentumData.destination);
            dragState.duration = momentumData.duration;
            dragState.bezier = momentumData.bezier;
            setDragState(dragState);
            setStyle(dragState);
        }
    }


    useEffect(() => {
        if(refreshing){
            stop();
        }else{
            isNeedReset();
        }  
    }, [refreshing])


    useEffect(() => {
        //dom有变化时更新dom高度
        const { height: wrapperHeight } = contentRef.current.getBoundingClientRect();
        const { height: scrollHeight } = contentWrapperRef.current.getBoundingClientRect();
        dragState.minY = wrapperHeight - scrollHeight;
        dragState.wrapperHeight = wrapperHeight;
        setDragState(dragState);
    }, [children])




    /**
     * 超出边界重置位置
     */
    const isNeedReset = () => {
        let offsetY;
        if(dragState.offsetY < dragState.minY){
            offsetY = dragState.minY;
        }else if(dragState.offsetY > dragState.maxY){
            offsetY = dragState.maxY;
        }
        if(typeof offsetY !== 'undefined'){
            dragState.offsetY = offsetY;
            dragState.duration = 500;
            dragState.bezier = 'cubic-bezier(.165, .84, .44, 1)';
            setDragState(dragState);
            setStyle(dragState);
            return true;
        }
        return false;
    }


    const stop = () => {
        // 获取当前 translate 的位置
        const matrix = window.getComputedStyle(contentWrapperRef.current).getPropertyValue('transform');
        dragState.offsetY = Math.round(+matrix.split(')')[0].split(', ')[5]);
        setDragState(dragState);
        setStyle(dragState)
    }
    

   


    const momentum = (current: number, start: number, duration: number) => {
        let type = 'noBounce';
        // 惯性滑动加速度
        const deceleration = 0.003;
        // 回弹阻力
        const bounceRate = 10;
        // 强弱回弹的分割值
        const bounceThreshold = 300;
        // 回弹的最大限度
        const maxOverflowY = dragState.wrapperHeight / 6;
        let overflowY;
        const distance = current - start;
        const speed = 2 * Math.abs(distance) / duration;
        let destination = current + speed / deceleration * (distance < 0 ? -1 : 1);
        if (destination < dragState.minY) {
            overflowY = dragState.minY - destination;
            type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce';
            destination = Math.max(dragState.minY - maxOverflowY, dragState.minY - overflowY / bounceRate);
        } else if (destination > dragState.maxY) {
            overflowY = destination - dragState.maxY;
            type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce';
            destination = Math.min(dragState.maxY + maxOverflowY, dragState.maxY + overflowY / bounceRate);
        }
        return {
            destination,
            duration: durationMap[type],
            bezier: bezierMap[type],
        };
    }



    










    const onMouseStart = (event: MouseEvent<HTMLDivElement>) => {
        event.persist();
       
    }

    const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        event.persist();
        const eventTarget = event;
        
    }

    const onMouseUp = (event: MouseEvent<HTMLDivElement>) => {

    }


    return (
        <div className="hp-box" ref={contentRef} style={{height: `200px`}}  
        >
            { direction === 'down' && <span className="refresh-icon">刷新中.....</span>}
            { direction === 'up' && <span className="loading-icon">加载中.....</span>}
            <div ref={contentWrapperRef}
                style={scrollStyle}
                onTouchStart={(e) => onTouchStart(e)} 
                onTouchMove={(e) => onTouchMove(e)}
                onTouchCancel={(e) => ontouchcancel(e)}
                onTouchEnd={ (e) => ontouchcancel(e)}
                className="hp-wrapper"
            >
                {children}
            </div>
        </div>
    )
}

export default ReactPullRefresh;