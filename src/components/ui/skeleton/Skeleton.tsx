import React from 'react'

export const Skeleton = ({width,height,round,classes}:{width:string,height:string,round:string,classes:string}) => {
  return (
    <div className={`animate-pulse bg-zinc-900 ${round} ${width} ${height} ${classes}`}></div>
  )
}
