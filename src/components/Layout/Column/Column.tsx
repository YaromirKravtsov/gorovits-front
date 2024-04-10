import  { FC, ReactNode } from 'react'
interface Props{
    children: ReactNode;
    className?:string
}
const Column:FC<Props> = (props) => {
  return (
    <div style={{display:'flex',flexDirection:'column'}} className={props.className}>
      {props.children}
    </div>
  )
}

export default Column;
