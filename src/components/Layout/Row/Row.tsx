import React, { FC, ReactNode } from 'react'
interface Props{
    children: ReactNode;
    className?:string;
}
const Row:FC<Props> = (props) => {
  return (
    <div style = {{display:'flex', flexDirection:'row'}} className={props.className}>
      {props.children}
    </div>
  )
}

export default Row
