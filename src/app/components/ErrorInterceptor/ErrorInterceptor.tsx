import React,{ FC, ReactNode, useEffect, useState } from "react";
import InfoFlutter from "../../../UI/InfoFlutter/InfoFlutter";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

interface Props{
    children: ReactNode
}
const ErrorInterceptor:FC<Props> = ({ children }) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const {error} = useTypedSelector(state=> state.auth);
    const {setGlobalError} = useActions()
    const deleteError = (value: boolean) =>{
        setGlobalError('')
        setIsOpen(value)
    }
   useEffect(()=>{
        if(error !== ''){
            setIsOpen(true)
        }
   },[error])
    return (
        <>
        {isOpen &&
            <InfoFlutter onisOpen={deleteError} title='Es ist ein Fehler aufgetreten ' text={error}/>
        }
        {children}
        </>
    )
  };
  
  export default ErrorInterceptor;
  