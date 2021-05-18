# 使用说明
* npm i scroll-refresh --save 或者 yarn add scroll-refresh
* import ReactPullRefresh from 'scroll-refresh'

```JS

import React, { FC, useEffect, useState } from 'react'
import ReactPullRefresh from 'scroll-refresh'

interface testProps {}

const Test: FC<testProps> = (props: testProps) => {
    const [ refreshing, setRefreshing ] = useState<boolean>(false)
    const [ data, setData ] = useState<number[]>([1,2,3,4,5,6,7,8,9])
    let n = 10

    
    return (
        <div>
            <ReactPullRefresh direction="down" onRefresh={() => {
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

export default Test

```

* props
* refreshing (是否显示刷新状态) bool
* direction (拉动方向) 'up' | 'down'
* onRefresh (回调函数，触发刷新的回调函数)
* height (固定高度，当高度高于当前dom实际高度时有不可预知的Bug)
* desc (刷新文字描述)
* className (类名)

# [示例](https://libertassss.github.io/pages/scroll-refresh/home)

