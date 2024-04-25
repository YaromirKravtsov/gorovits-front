import { FC, useState } from "react"
import style from './PrivacyPolicy.module.css'
import FlutterMenu from "../../../UI/FlutterMenu/FlutterMenu"
import CheckBox from "../../../UI/CheckBox/CheckBox"
import MyButton from "../../../UI/MyButton/MyButton"
import AuthService from "../../api/service/AuthService"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useActions } from "../../../hooks/useActions"
import { getErrorText } from "../../../helpers/FormDataGeneration"
interface Props{
    setIsNew: (value: boolean) => void
}
const PrivacyPolicy: FC<Props> = (props) => {
    const [isPolicy, setIsPolicy] = useState<boolean>(false);
    const {userInfo} = useTypedSelector(state => state.user)
    const {setGlobalError} = useActions()
    const handleSubmit = async () =>{
        try{
            await AuthService.setIsNewUser(userInfo.userId)
            props.setIsNew(false)
        }catch(error){
            setGlobalError(getErrorText(error))
        }
        
    }
    return (
        <FlutterMenu shadow="all" className={style.flutter}>
            <div className={style.title}>
                Datenschutzpolitik
            </div>
            <div className={style.mainText}>
                <div className={style.subTitle}>
                    Datenschutzrichtlinie
                </div>
                <div className={style.text}>
                    Vielen Dank für Ihr Interesse an unserer Tennis-Meisterschafts-Webanwendung. Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und halten uns strikt an die geltenden Datenschutzgesetze.
                </div>
                <div className={style.subTitle}>
                    Erhobene Daten:
                </div>
                <div className={style.text}>
                    Wir speichern folgende Daten von Ihnen:
                </div>
                <ul>
                    <li>Name</li>
                    <li>E-Mail-Adresse</li>
                    <li>Telefonnummer</li>
                </ul>
                <div className={style.subTitle}>

                    Verwendungszweck:
                </div>
                <div className={style.text}>
                    Ihre E-Mail-Adresse wird für den Versand verschiedener Mitteilungen und Newsletter verwendet, um Sie über Neuigkeiten, Events und Angebote in unserem Tennis-Workshop auf dem Laufenden zu halten.
                </div>
                <div className={style.subTitle}>
                    Datenschutzfrist:
                </div>
                <div className={style.text}>
                    Falls Sie sich 100 Tage lang nicht in Ihr Benutzerkonto einloggen, werden Ihre Kontodaten automatisch gelöscht, um Ihre Privatsphäre zu schützen.
                </div>
                <div className={style.subTitle}>
                    Datenaufbewahrung:
                </div>
                <div className={style.text}>
                    Wir garantieren, dass Ihre persönlichen Daten sicher gespeichert und nur für interne Zwecke verwendet werden. Ihre Daten werden nicht an Dritte weitergegeben oder für Werbezwecke verkauft.
                </div>
                <div className={style.subTitle}>
                    Recht auf Datenlöschung:
                </div>
                <div className={style.text}>
                    Wenn Sie möchten, dass wir Ihre Daten löschen, können Sie uns jederzeit kontaktieren. Sie können uns entweder telefonisch unter der angegebenen Telefonnummer oder per E-Mail erreichen. Nachdem Ihre Identität überprüft wurde, werden wir Ihre Daten unverzüglich aus unserem System entfernen.
                </div>
                <div className={style.subTitle}>
                    Fragen zum Datenschutz:
                </div>
                <div className={style.text}>
                    Wenn Sie Fragen oder Bedenken zum Datenschutz haben, zögern Sie bitte nicht, uns zu kontaktieren. Wir stehen Ihnen gerne zur Verfügung, um Ihre Anliegen zu klären und Ihnen weiterzuhelfen.
                </div>
               
            </div>
            <CheckBox className={style.firstCheck} text="Zustimmung zur Datenschutzrichtlinie" isChecked={isPolicy} setIsChecked={setIsPolicy}></CheckBox>
          
            {isPolicy &&
                <MyButton mode="black" className={style.button} onClick={handleSubmit}>
                    Zustimmung
                </MyButton>
            }

        </FlutterMenu>
    )
}

export default PrivacyPolicy
