import  { FC, useState } from 'react'
import style from './TopMenu.module.css';
import MyButton from '../../../../UI/MyButton/MyButton';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import InfoFlutter from '../../../../UI/InfoFlutter/InfoFlutter';
import { NewUserService } from '../../api/NewUserService';
import { useActions } from '../../../../hooks/useActions';
import { getErrorText } from '../../../../helpers/FormDataGeneration';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { SelectedImage } from '../../../../components/PhotoSelection/PhotoSelection';
interface Props{
  photo: SelectedImage
}
const TopMenu:FC<Props> = (props) => {
    const {userInfo} = useTypedSelector(state=> state.user);
    const {newRackets} = useTypedSelector(state=> state.newRackets);
    const [isErrorMenuOpen, setIsErrorMenuOpen] = useState<boolean>();
    const {setGlobalError} = useActions()
    const [errorText,setErrorText] = useState<string>('')
    const navigate = useNavigate()

    const validateFields = ():boolean =>{
      
      if(userInfo.email == ''){
        console.log(props.photo)
        setErrorText('Das E-Mail-Feld ist nicht ausgefüllt ')
        setIsErrorMenuOpen(true)
        return false;
      }else if(userInfo.fullName == ''){
        setErrorText('Das Name-Feld ist nicht ausgefüllt ')
        setIsErrorMenuOpen(true)
        return false;
      }else if(userInfo.phoneNumber == ''){
        setErrorText('Das Telefonnummer-Feld ist nicht ausgefüllt ')
        setIsErrorMenuOpen(true)
        return false;
      }else if(props.photo.focusImage.name == ''){
        setErrorText('Foto nicht ausgewählt  ')
        setIsErrorMenuOpen(true)
        return false;
      }
      setIsErrorMenuOpen(false)
      return true
    };
    
    
    const handelClick = async () =>{
      if(validateFields()){
        try{
          const {data} = await NewUserService.createUser( newRackets, userInfo, props.photo);
          navigate(`/user-account/${data.userId}`)
        }catch(e: any){
          getErrorText(e)
          console.log(e)
          setGlobalError(getErrorText(e))
        }
      
       
      }
      console.log(userInfo,props.photo, newRackets)
    }
  return (
    <div>
        <MyButton className={style.button} onClick={handelClick} mode='black'>Neuer Benutzer registrieren</MyButton>
        {isErrorMenuOpen&&
          <InfoFlutter onisOpen={setIsErrorMenuOpen} title='Nicht ausgefülltes Feld' text={errorText}/>
        } 
        
    </div>
  )
}

export default TopMenu
