import React, { FC, useEffect, useState } from 'react'
import { IRacket } from '../../models/IRacket'
import MyButton from '../../../../UI/MyButton/MyButton'
import ImageUploader from '../../../../components/ImageUploader/ImageUploader'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu'
import InputRow from '../../../../components/InputRow/InputRow'
import MyInput from '../../../../components/MyInput/MyInput'
import style from './StringFlutterMenu.module.css'
import { AdminSettingPageService } from '../../api/AdminSettingPageService'
import { useActions } from '../../../../hooks/useActions'
import { IString } from '../../models/IString'
import { getErrorText } from '../../../../helpers/FormDataGeneration'
type Action = 'add' | 'edit'
interface Props {
    action: Action,
    setIsOpen: (value: boolean) => void,
    string?: IString,
    handelEdit?: (value: IRacket) => void,
    handelAdd?: (value: IRacket) => void,
}
interface Errors {
    stringModel: boolean,
    image: boolean
}
const StringFlutterMenu: FC<Props> = (props) => {


    const [stringModel, setStringModel] = useState<string>('')
    const [image, setImage] = useState<File>()
    const { setGlobalError } = useActions();
    const [errors, setErrors] = useState<Errors>({
        stringModel: false,
        image: false
    })
    useEffect(() => {
        if (props.action == 'edit' && props.string) {
            setStringModel(props.string.name)
        }
    }, [])

    //helpers

    
    const validate = () => {
        const errorsL: Errors = {
            stringModel: stringModel.trim() == '',
            image: props.action == 'add' ? image == undefined : false
        }
        setErrors(errorsL)
        console.log(errorsL)
        console.log("Returned " + Object.values(errors).some(field => field === false))
        return !Object.values(errorsL).some(error => error);
    }
    //== main
    const handelSubmit = async () => {
        if (validate()) {
            const formData = new FormData();


        
  
            formData.append('name', stringModel)
            if (props.action == 'edit') {
                formData.append('id', String(props.string?.id));
                if (image) {
                    formData.append('imageChanged', 'true');
                    formData.append('image', image);

                } else {
                    formData.append('imageChanged', 'false');
                }

            } else {
                if (image)
                    formData.append('image', image)
            }
            try {
                if (props.action == 'add') {
                    const {data} = await AdminSettingPageService.createString(formData)
                    if (props.handelAdd)
                        props.handelAdd(data)
                } else {
                    const { data } = await AdminSettingPageService.updateString(formData)
                    if (props.handelEdit)
                        props.handelEdit(data)
                }
            } catch (error) {
                setGlobalError(getErrorText(error))
            } finally {
                props.setIsOpen(false)
            }

        }
        console.log(image)
    }
    useEffect(() => {
        setErrors(prev => ({ ...prev, image: false }));
    }, [image])
    return (
        <div>
            <FlutterMenu shadow='all' className={style.flutterMenu}>
                <div className={style.title}>{props.action == 'add'? 'Seite hinzufüg':'Seite bearbeiten'} </div>
                <div className={style.mainRow}>
                    <InputRow label='Schlägermodell'>
                        <MyInput placeholder='Schlägermodell eingeben'
                            value={stringModel}
                            onChange={setStringModel}
                            className={style.input}
                            error={errors.stringModel}
                            setError={value => setErrors(prev => ({ ...prev, racketModel: value }))}
                        />
                    </InputRow>
                    <InputRow label='Seite foto'>
                    <div className={`${style.photoSelect} ${errors.image && style.photoSelectError}`}>
                        <div className={style.addPhotoIcon}>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="12.5" width="4" height="29" fill="white" />
                                <rect y="16.5" width="4" height="29" transform="rotate(-90 0 16.5)" fill="white" />
                            </svg>

                        </div>
                        
                        {<ImageUploader onFileChange={setImage} src={props.string?.imgLink} className='' />}
               
                    </div>
                    </InputRow>
                </div>
                <div className={style.buttonsRow} >
                    <MyButton mode='white' border onClick={() => props.setIsOpen(false)}>
                        Schließen
                    </MyButton>
                    <MyButton mode='black' onClick={handelSubmit}>
                    Seite  hinzufüg
                    </MyButton>
                </div>
            </FlutterMenu>
        </div>
    )
}


export default StringFlutterMenu
