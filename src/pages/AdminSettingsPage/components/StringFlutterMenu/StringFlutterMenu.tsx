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
import ImageCropper from '../../../../components/ImageCropper/ImageCropper'
import { DataActions } from '../../../../helpers/DataActions'
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
    const [image, setImage] = useState<string>('')
    const { setGlobalError } = useActions();
    const [errors, setErrors] = useState<Errors>({
        stringModel: false,
        image: false
    })
    useEffect(() => {
        if (props.action == 'edit' && props.string) {
            setStringModel(props.string.name)
        }
        if(props.string)
        setImage(props.string.imgLink)
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

            const blob = DataActions.base64ToBlob(image,'image/png')
            const file = new File([blob], '1', {
                type: 'image/png'
            });
  
            if (props.action == 'edit') {
                formData.append('id', String(props.string?.id));
                if (file) {
                    formData.append('imageChanged', 'true');
                    formData.append('image', file);

                } else {
                    formData.append('imageChanged', 'false');
                }

            } else {
                if (file)
                    formData.append('image', file)
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
                <div className={style.title}>{props.action == 'add'? 'Saite hinzufügen':'Saite bearbeiten'} </div>
                <div className={style.mainRow}>
                    <InputRow label='Saitenname'>
                        <MyInput placeholder='Saitenname eingeben'
                            value={stringModel}
                            onChange={setStringModel}
                            className={style.input}
                            error={errors.stringModel}
                            setError={value => setErrors(prev => ({ ...prev, racketModel: value }))}
                        />
                    </InputRow>
                    <InputRow label='Saiten Foto'>
                    <div className={`${style.photoSelect} ${errors.image && style.photoSelectError}`}>
                        <ImageCropper
                            onCropDone={setImage}
                            aspect ={1}
                            className={style.imageCropper}
                            internalImage ={image}
                        />
               
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
