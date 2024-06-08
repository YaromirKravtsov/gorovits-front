import React, { FC, useEffect, useState } from 'react'
import { IRacket } from '../../models/IRacket'
import MyButton from '../../../../UI/MyButton/MyButton'
import ImageUploader from '../../../../components/ImageUploader/ImageUploader'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu'
import InputRow from '../../../../components/InputRow/InputRow'
import MyInput from '../../../../components/MyInput/MyInput'
import style from './StringFlutterMenu.module.css'
import { AdminSettingPageService, RacketsManufactureres } from '../../api/AdminSettingPageService'
import { useActions } from '../../../../hooks/useActions'
import { IString } from '../../models/IString'
import { getErrorText } from '../../../../helpers/FormDataGeneration'
import ImageCropper from '../../../../components/ImageCropper/ImageCropper'
import { DataActions } from '../../../../helpers/DataActions'
import DropDownInput, { Option } from '../../../../UI/DropDownInput/DropDownInput'
import Loader from '../../../../UI/Loader/Loader'
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
    const [stringManufacter, setStringManufacter] = useState<string>('');
    const [stringManufacterId, setStringManufacterId] = useState<number>(0);
    const [image, setImage] = useState<string>('')
    const { setGlobalError } = useActions();
    const [manufactursOptions, setManufactursOptions] = useState<Option[]>([])
    const [errors, setErrors] = useState<Errors>({
        stringModel: false,
        image: false
    })
    useEffect(() => {
        if (props.action == 'edit' && props.string) {
            setStringModel(props.string.name)
        }
        if (props.string)
            setImage(props.string.imgLink)
    }, [])

    useEffect(() => {

        const fetch = async () => {
            try {
                const { data } = await AdminSettingPageService.getRacketsManufactureres();
                const options = mapOptions(data)
                setManufactursOptions([{ label: '', value: -1 },...options, { label: 'Luxilon', value: options.length + 1 }])

            } catch (error) {
                setGlobalError(getErrorText(error))
            }
        }
        fetch();
      
    }, [])

    useEffect(() => {
        if (props.action == 'edit' && stringModel !== '') {

            const stringMan = stringModel.split(' ')[0];
            const manId = manufactursOptions.find(option => option.label === stringMan)?.value;
            if (typeof manId === 'number') {
                setStringManufacterId(manId);
                setStringModel(stringModel.split(' ').slice(1).join(' '));
            } else {

            }
        }
    }, [props.string, stringModel, manufactursOptions])

    //helpers
    const mapOptions = (data: RacketsManufactureres[]): Option[] => {
        return data.map(element => {
            return { label: element.name, value: element.id }
        });
    }


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
            console.log(image.split(':')[0])
            const stringMan = manufactursOptions.find(string => string.value == stringManufacterId)

            formData.append('name', (stringManufacterId == 0 ? '' : stringMan?.label + ' ') + stringModel)
            const isEditidImg = image.split(':')[0].includes('http')
            console.log(image)
            let file
            if (!isEditidImg) {
                const blob = DataActions.base64ToBlob(image, 'image/png')
                file = new File([blob], '1', {
                    type: 'image/png'
                });
            }
            if (props.action == 'edit') {
                formData.append('id', String(props.string?.id));

                if (file && !isEditidImg) {

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
                    const { data } = await AdminSettingPageService.createString(formData)
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
                <div className={style.title}>{props.action == 'add' ? 'Saite hinzufügen' : 'Saite bearbeiten'} </div>
                <div className={style.mainRow}>
                    <InputRow label='Hersteller' className={style.inputRow}>
                        <DropDownInput options={manufactursOptions} defaultValue={'Wählen Sie einen Hersteller'}
                            /*   error={errors.racketManufacterId}
                              setError={value => setErrors(prev => ({ ...prev, racketManufacterId: value }))} */
                            value={stringManufacterId} onChange={setStringManufacterId}
                            defaultOptions={manufactursOptions}
                            className={style.input}
                        />

                    </InputRow>
                    <InputRow label='Saitenname' className={style.inputRow}>
                        <MyInput placeholder='Saitenname eingeben'
                            value={stringModel}
                            onChange={setStringModel}
                            className={style.input}
                            error={errors.stringModel}
                            setError={value => setErrors(prev => ({ ...prev, racketModel: value }))}
                        />
                    </InputRow>
                    <InputRow label='Saiten Foto' className={style.inputRow}>
                        <div className={`${style.photoSelect} ${errors.image && style.photoSelectError}`}>
                            {image !== '' || props.action == 'add' ?
                            
                        
                            <ImageCropper
                                onCropDone={setImage}
                                aspect={1}
                                className={style.imageCropper}
                                internalImage={image}
                            />
                        :
                        <Loader size='small'/>
                        }

                        </div>
                    </InputRow>
                </div>
                <div className={style.buttonsRow} >
                    <MyButton mode='white' border onClick={() => props.setIsOpen(false)} className={style.button}>
                        Schließen
                    </MyButton>
                    <MyButton mode='black' onClick={handelSubmit} className={style.button}>
                        Seite  hinzufüg
                    </MyButton>
                </div>
            </FlutterMenu>
        </div>
    )
}


export default StringFlutterMenu
