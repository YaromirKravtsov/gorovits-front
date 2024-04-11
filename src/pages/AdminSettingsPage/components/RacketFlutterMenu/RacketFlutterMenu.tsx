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
    const [image, setImage] = useState<File>()
    const { setGlobalError } = useActions();
    const [errors, setErrors] = useState<Errors>({
        racketManufacterId: false,
        racketModel: false,
        image: false
    })
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await AdminSettingPageService.getRacketsManufactureres();
                setManufactursOptions(mapOptions(data))
                console.log(data)
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
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsToTest(event.target.checked); // Обновляем состояние в соответствии с текущим состоянием чекбокса
    };
    const validate = () => {
        const errorsL: Errors = {
            racketManufacterId: racketManufacterId == 0,
            racketModel: racketModel.trim() == '',
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


            formData.append('isTestAvailable', isToTest.toString())
            formData.append('rocketManufacturerId', racketManufacterId.toString())
            formData.append('name', racketModel)
            if (props.action == 'edit') {
                formData.append('modelId', String(props.racket?.id));
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
                    const {data} = await AdminSettingPageService.createracketModel(formData)
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
        console.log(image)
    }
    useEffect(() => {
        setErrors(prev => ({ ...prev, image: false }));
    }, [image])
    return (
        <div>
            <FlutterMenu shadow='all' className={style.flutterMenu}>
                <div className={style.title}>{props.action == 'add'? 'Schläger hinzufügen':'Schläger bearbeiten'} </div>
                <div className={style.mainRow}>
                    <InputRow label='Hersteller'>
                        <DropDownInput options={manufactursOptions} defaultValue={'Wählen Sie einen Hersteller'}
                            error={errors.racketManufacterId}
                            setError={value => setErrors(prev => ({ ...prev, racketManufacterId: value }))}
                            value={racketManufacterId} onChange={setRacketManufacterId}
                            defaultOptions={manufactursOptions}
                        />

                    </InputRow>
                    <InputRow label='Schlägermodell'>
                        <MyInput placeholder='Schlägermodell eingeben'
                            value={racketModel}
                            onChange={setRacketModel}
                            className={style.input}
                            error={errors.racketModel}
                            setError={value => setErrors(prev => ({ ...prev, racketModel: value }))}
                        />
                    </InputRow>
                    <div className={style.isToTestRow}>
                        <div className={style.checkboxContainer}>
                            <input type='checkbox' className={style.testCheckBox} checked={isToTest} onChange={handleCheckboxChange} />
                            <span className={style.checkmark}></span>
                        </div>
                        <div className={style.isToTestText}>Display für Tests auf dem Spielfeld </div>
                    </div>
                    <div className={`${style.photoSelect} ${errors.image && style.photoSelectError}`}>
                        <div className={style.addPhotoIcon}>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="12.5" width="4" height="29" fill="white" />
                                <rect y="16.5" width="4" height="29" transform="rotate(-90 0 16.5)" fill="white" />
                            </svg>

                        </div>
                        {<ImageUploader onFileChange={setImage} src={props.racket?.imgLink} className='' />}
                    </div>
                </div>
                <div className={style.buttonsRow} >
                    <MyButton mode='white' border onClick={() => props.setIsOpen(false)}>
                        Schließen
                    </MyButton>
                    <MyButton mode='black' onClick={handelSubmit}>
                        Schläger hinzufüg
                    </MyButton>
                </div>
            </FlutterMenu>
        </div>
    )
}

export default RacketFlutterMenu
