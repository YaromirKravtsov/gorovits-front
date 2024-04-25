import React,{ FC, ReactNode, useEffect, useState } from "react";
import InfoFlutter from "../../../UI/InfoFlutter/InfoFlutter";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import AuthService from "../../api/service/AuthService";

interface Props{
    children: ReactNode
}
const ErrorInterceptor:FC<Props> = ({ children }) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [isNew,setIsNew] = useState<boolean>(false);
    const {error} = useTypedSelector(state=> state.auth);
    const {userInfo} = useTypedSelector(state=> state.user);
    const {setGlobalError} = useActions();

    const deleteError = (value: boolean) =>{
        setGlobalError('')
        setIsOpen(value)
    }

   useEffect(()=>{
        if(error !== ''){
            setIsOpen(true)
        }

        const fetch = async () =>{

        }

        fetch();
   },[error]);

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
  