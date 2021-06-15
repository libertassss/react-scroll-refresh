import React, { FC, useEffect, useState } from 'react';
const  ReactPullRefresh = require('scroll-refresh');
import './index.less';


interface testProps {}

const Demo: FC<testProps> = (props: testProps) => {
    const [ refreshing, setRefreshing ] = useState<boolean>(false);
    const [ data, setData ] = useState<number[]>([1,2,3,4,5,6,7,8,9]);
    let n = 10;

   
    
    return (
        <div>
            <ReactPullRefresh className="my-scroll" height="100%" direction="up" onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                    for(let i=n;i<n+20;i++){
                        data.push(i);
                    }
                    n=n+20;
                    setData(data);
                    setRefreshing(false);
                }, 3000)
            }} refreshing={refreshing}>
               <ul>
                   {
                       data.map((i: number, key: number) => <li key={key}>{i}</li>)
                   }
               </ul>
            </ReactPullRefresh>
        </div>
    )
}

export default Demo;