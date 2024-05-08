import React, { FC, useEffect, useState } from 'react'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import style from './RacketFlutterMenu.module.css'
import MyInput from '../../../../components/MyInput/MyInput';
import DropDownInput, { Option } from '../../../../UI/DropDownInput/DropDownInput';
import { AdminSettingPageService, RacketsManufactureres } from '../../api/AdminSettingPageService';
import { useActions } from '../../../../hooks/useActions';
import { getErrorText } from '../../../../helpers/FormDataGeneration';
import InputRow from '../../../../components/InputRow/InputRow';
import ImageUploader from '../../../../components/ImageUploader/ImageUploader';
import MyButton from '../../../../UI/MyButton/MyButton';
import { IRacket } from '../../models/IRacket';
import addNewPhotoIcon from '../../../../assets/images/settings/add_new.png';
import CheckBox from '../../../../UI/CheckBox/CheckBox';
import FileInput from '../../../../components/FileInput/FileInput';
import ImageCropper from '../../../../components/ImageCropper/ImageCropper';
import { Area } from 'react-easy-crop';
import { DataActions } from '../../../../helpers/DataActions';
type Action = 'add' | 'edit'
interface Props {
    action: Action,
    setIsOpen: (value: boolean) => void,
    racket?: IRacket,
    handelEdit?: (value: IRacket) => void,
    handelAdd?: (value: IRacket) => void,
}
interface Errors {
    racketManufacterId: boolean,
    racketModel: boolean,
    image: boolean
}
const RacketFlutterMenu: FC<Props> = (props) => {

    const [manufactursOptions, setManufactursOptions] = useState<Option[]>([])
    const [racketManufacterId, setRacketManufacterId] = useState<number>(0);
    const [racketModel, setRacketModel] = useState<string>('')
    const [isToTest, setIsToTest] = useState<boolean>(false);
    const [image, setImage] = useState<string>('')
    const { setGlobalError } = useActions();
    const [errors, setErrors] = useState<Errors>({
        racketManufacterId: false,
        racketModel: false,
        image: false
    })
    useEffect(() => {
        if (props.racket?.imgLink !== '' && props.racket?.imgLink) {
            setImage(props.racket.imgLink)
        }
        const fetch = async () => {
            try {
                const { data } = await AdminSettingPageService.getRacketsManufactureres();
                setManufactursOptions(mapOptions(data))

            } catch (error) {
                setGlobalError(getErrorText(error))
            }
        }
        fetch();
        if (props.action == 'edit' && props.racket) {
            setRacketManufacterId(props.racket.rocketManufacturerId)
            setRacketModel(props.racket.name);
            setIsToTest(props.racket.isTestAvailable)
        }
    }, [])

    //helpers
    const mapOptions = (data: RacketsManufactureres[]): Option[] => {
        return data.map(element => {
            return { label: element.name, value: element.id }
        });
    }

    const validate = () => {
        const errorsL: Errors = {
            racketManufacterId: racketManufacterId == 0,
            racketModel: racketModel.trim() == '',
            image: props.action == 'add' ? image == undefined : false
        }
        setErrors(errorsL)

        return !Object.values(errorsL).some(error => error);
    }
    //== main
    const handelSubmit = async () => {
        if (validate()) {
            const formData = new FormData();


            formData.append('isTestAvailable', isToTest.toString())
            formData.append('rocketManufacturerId', racketManufacterId.toString())
            formData.append('name', racketModel)
            const isEditidImg = image.split(':')[0] == 'http'
            let file
            if (!isEditidImg) {
                const blob = DataActions.base64ToBlob(image, 'image/png')
                file = new File([blob], '1', {
                    type: 'image/png'
                });
            }
            if (props.action == 'edit') {
                console.log(props.racket?.id)
                formData.append('modelId', String(props.racket?.id));
                if (file && !isEditidImg) {
                    formData.append('imageChanged', 'true');
                    formData.append('image', file);
                } else {
                    formData.append('imageChanged', 'false');
                }
            } else {
                if (file)
                    formData.append('image', (file))
            }
            try {
                if (props.action == 'add') {
                    const { data } = await AdminSettingPageService.createracketModel(formData)
                    if (props.handelAdd)
                        props.handelAdd(data)
                } else {
                    const { data } = await AdminSettingPageService.updateRacketModel(formData)
                    if (props.handelEdit)
                        props.handelEdit(data)
                }
            } catch (error) {
                setGlobalError(getErrorText(error))
            } finally {
                props.setIsOpen(false)
            }

        }
    }
    useEffect(() => {
        setErrors(prev => ({ ...prev, image: false }));
    }, [image])






    return (
        <div>
            <FlutterMenu shadow='all' className={style.flutterMenu}>
                <div className={style.title}>{props.action == 'add' ? 'Schläger hinzufügen' : 'Schläger bearbeiten'} </div>
                <div className={style.mainRow}>
                    <InputRow label='Hersteller' className={style.inputRow}>
                        <DropDownInput options={manufactursOptions} defaultValue={'Wählen Sie einen Hersteller'}
                            error={errors.racketManufacterId}
                            setError={value => setErrors(prev => ({ ...prev, racketManufacterId: value }))}
                            value={racketManufacterId} onChange={setRacketManufacterId}
                            defaultOptions={manufactursOptions}
                            className={style.input}
                        />

                    </InputRow>
                    <InputRow label='Schlägermodell' className={style.inputRow}>
                        <MyInput placeholder='Schlägermodell eingeben'
                            value={racketModel}
                            onChange={setRacketModel}
                            className={style.input}
                            error={errors.racketModel}
                            setError={value => setErrors(prev => ({ ...prev, racketModel: value }))}
                        />
                    </InputRow>
                    <CheckBox text='als Testschläger im Sortiment' setIsChecked={setIsToTest} isChecked ={isToTest}/>
                    <div className={`${style.photoSelect} ${errors.image && style.photoSelectError}`}>


                        <ImageCropper
                            onCropDone={setImage}
                            aspect={2.615}
                            className={style.imageCropper}
                            internalImage={image}
                        />


                    </div>
                </div>
                <div className={style.buttonsRow} >
                    <MyButton mode='white' border onClick={() => props.setIsOpen(false)} className={style.button}>
                        Schließen
                    </MyButton>
                    <MyButton mode='black' onClick={handelSubmit} className={style.button}>
                        Schläger hinzufügen
                    </MyButton>
                </div>
            </FlutterMenu>

        </div>
    )
}

export default RacketFlutterMenu
