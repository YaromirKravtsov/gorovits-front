import React, { FC, useEffect, useState } from 'react'
import style from './AddRacketMenu.module.css'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu'
import InputRow from '../../../../components/InputRow/InputRow'
import MyInput from '../../../../components/MyInput/MyInput'
import { INewRacket } from '../../../../models/INewRackets'
import SearchStrings, { StringOption } from '../../../../components/SearchStrings/SearchStrings'
import { MainServise } from '../../../../api/services/MainService'
import { IString } from '../../../../models/IString'
import { ModelAndManufactureres } from '../../../../modules/Ordering/models/OrderModel'
import DropDownInput from '../../../../UI/DropDownInput/DropDownInput'
import MyButton from '../../../../UI/MyButton/MyButton'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { NewRacketsService } from '../../api/NewRacketsService'
import { getErrorText } from '../../../../helpers/FormDataGeneration'
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode.react'
import RecordHeler from '../../../../helpers/recordHelper'
import { useParams } from 'react-router-dom'
import StringingHardnessInput from '../../../../components/StringingHardnessInput/StringingHardnessInput'
import { isValidString } from '../../../../components/StringingHardnessInput/isValidStringHardness'


interface ModelManufacturereDefault {
  model: string,
  manufactiors: string
}

interface Props {
  onOpenChange: (value: boolean) => void,
  editMode: boolean
  racket?: INewRacket
}
const AddRacketMenu: FC<Props> = (props) => {
  const { userId } = useParams();
  console.log(userId)
  const { addNewRacket, updateNewRacket, setGlobalError } = useActions()
  const { newRackets } = useTypedSelector(state => state.newRackets)
  const [newRacketData, setNewRacketData] = useState<INewRacket>({
    id: 0,
    racketModelId: 0,
    number: '',
    code: '',
    balancePoint: '',
    totalWeight: '',
    swingWeight: '',
    stringHardness: '',
    longString: {
      name: '',
      id: 0,
    },
    crossString: {
      name: '',
      id: 0,
    },
    stringId: 0,
    racketModelName: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({
    number: false,
    balancePoint: false,

    longStrings: false,

    stringId: false,
    racketModelId: false
  });
  const validateFields = (): boolean => {
    const { number, stringHardness, longString, stringId, racketModelId } = newRacketData;
    const errorsL: { [key: string]: boolean } = {
      number: number.trim() === '',
      stringHardness: !isValidString(stringHardness),
      longString: longString.name.trim() === '',
      stringId: stringId === 0,
      racketModelId: racketModelId === 0
    };
    setErrors(errorsL);
    console.log(errorsL)
    return !Object.values(errorsL).some(error => error);
  };



  const [strings, setStrings] = useState<IString[]>([] as IString[]);
  const [modelManufacturereDefault, setModelManufacturereDefault] = useState<ModelManufacturereDefault>({
    model: 'Wählen Sie die Firma',
    manufactiors: 'Wählen Sie die Hersteller'

  });
  const [racketModels, setRacketModels] = useState<ModelAndManufactureres[]>([] as ModelAndManufactureres[]);
  const [racketManufactureres, setManufactureres] = useState<ModelAndManufactureres[]>([] as ModelAndManufactureres[]);
  const [currentRacketModels, setCurrentRacketModels] = useState<ModelAndManufactureres[]>([]);
  const { userInfo } = useTypedSelector(state => state.user)



  //===
  useEffect(() => {

    const fetch = async () => {
      const strings = await MainServise.getStrins()
      setStrings(strings.data);
      const manufactureres = await MainServise.getRacketsManufactureres();
      setManufactureres(manufactureres.data);
      const models = await MainServise.getRacketsModels()
      setRacketModels(models.data)

    }
    fetch()

    if (props.racket) {
      setNewRacketData(props.racket);
      //setModelManufacturereDefault
    }
  }, [])

  useEffect(() => {
    if (props.racket) {


      const model = racketModels.find(racket => racket.id == newRacketData.racketModelId)
      const manufactior = racketManufactureres.find(racket => racket.id == model?.rocketManufacturerId)
      setModelManufacturereDefault({
        model: model?.name as string,
        manufactiors: manufactior?.name as string
      })

    }
  }, [racketModels])
  useEffect(() => {
    setNewRacketData(prev => ({ ...prev, stringId: newRacketData.longString.id }));
  }, [newRacketData.longString])
  //===
  const formatOption = (arr: ModelAndManufactureres[]) => {
    return arr.map(item => ({
      value: item.id,
      label: item.name
    }));
  }

  const renderRacketModels = (manufactiorId: number) => {
    const models = getModelBuManufacuresId(manufactiorId)
    setCurrentRacketModels(models)
  }
  const getModelBuManufacuresId = (id: number) => {
    const models: ModelAndManufactureres[] = racketModels.filter((item) => {
      return item.rocketManufacturerId == id;
    })

    return models;
  }
  //===

  const addModelToList = (value: number) => {
    setErrors(prev => ({ ...prev, racketModelId: false }))
    setNewRacketData(prev => ({ ...prev, racketModelId: value }));
    const mod = racketModels.find(racket => racket.id == value);
    const man = racketManufactureres.find(racket => (racket.id) as number == mod?.rocketManufacturerId)
    const modelName = man?.name + " " + mod?.name;
    setNewRacketData(prev => ({ ...prev, racketModelName: modelName }))
  }

  //===
  const handelSubmit = async () => {
    //setNewRacketData(prev => ({...prev, stringId: newRacketData.longString.id}));
    const isValid = validateFields();
    const id = newRackets.length > 0 ? newRackets[newRackets.length - 1].id + 1 : 0;
    setNewRacketData(prev => ({ ...prev, id: id }));


    if (isValid) {
      const code =  newRacketData.code.trim() == ''?RecordHeler.generateDNA(5): newRacketData.code;
  
      console.log(code)

      const racketData = { ...newRacketData, code: code }

      if (props.racket) {
        if (props.editMode) {
          try {

            await NewRacketsService.editNewRacket(racketData)
            updateNewRacket(racketData)
          } catch (e) {
            console.log(e)
            setGlobalError(getErrorText(e))
          }
        } else {
          updateNewRacket(racketData)
        }
      } else {

        if (props.editMode) {
          try {

            await NewRacketsService.createNewRacket(Number(userId), [racketData])
            addNewRacket(racketData)
          } catch (e) {
            console.log(e)
            setGlobalError(getErrorText(e))
          }
        } else {
          addNewRacket(racketData)
        }
      }
      props.onOpenChange(false)

    }


  }
  return (
    <>
      <FlutterMenu shadow='all' className={style.main}>
        <div className={style.title}> {props.editMode ? 'Schläger bearbeiten' : 'Neuen Schläger registrieren'}</div>
        <div className={style.mainRow}>
          <InputRow label='Schlägernummer' className={style.inpitRow}>
            <MyInput onChange={(value: string) => setNewRacketData(prev => ({ ...prev, number: value }))} value={newRacketData.number}
              placeholder='Schlägernummer eingeben'
              error={errors.number}
              setError={(value: boolean) => setErrors(prev => ({ ...prev, number: value }))}
              className={style.input}
            />
          </InputRow >
          <InputRow label='Bar code' className={style.inpitRow}>
            <MyInput onChange={(value: string) => setNewRacketData(prev => ({ ...prev, code: value }))} value={newRacketData.code}
              placeholder='Bar code eingeben'
              className={style.input}
            />
          </InputRow>


          <InputRow label='Hersteller' className={style.inpitRow}>
            <DropDownInput
              defaultValue={modelManufacturereDefault.manufactiors}
              value={0}
              options={formatOption(racketManufactureres)}
              onChange={(value: number) => renderRacketModels(value)}
              className={style.input}

            />
          </InputRow>

          <InputRow label='Schlägermodell' className={style.inpitRow}>
            <DropDownInput
              defaultValue={modelManufacturereDefault.model}
              value={0}
              options={formatOption(currentRacketModels)}
              onChange={(value: number) => addModelToList(value)}
              className={style.input}
            />
            {errors.racketModelId &&
              <div className={style.errorInput}>

                Das Feld muss ausgefüllt werden
              </div>}
          </InputRow>
          <InputRow label='Längstsaiten' className={style.inpitRow}>
            <SearchStrings
              onSelect={(value: StringOption) => setNewRacketData(prev => ({ ...prev, longString: value }))}
              strings={strings} value={newRacketData.longString}
              error={errors.longString}
              setError={(value: boolean) => setErrors(prev => ({ ...prev, longString: value }))}

            />
          </InputRow>

          <InputRow label='Quersaite' questionMark questionText='Wenn Sie keine Quersaite auswählen, wird sie gleich der Längstsaite sein' className={style.inpitRow}>
            <SearchStrings
              onSelect={(value: StringOption) => setNewRacketData(prev => ({ ...prev, crossString: value }))}
              strings={strings} value={newRacketData.crossString}

            />
          </InputRow>
          <InputRow label='Besaitungshärte' className={style.inpitRow}>
       {/*      <MyInput
              onChange={(value: string) => setNewRacketData(prev => ({ ...prev, stringHardness: value }))}
              mask='99.9×99.9'
              placeholder='__._×__._'
              error={errors.stringHardness}
              setError={(value: boolean) => setErrors(prev => ({ ...prev, stringHardness: value }))}
              value={(newRacketData).stringHardness}
              className={style.input}
            /> */}
            <StringingHardnessInput
              onChange={(value: string) => setNewRacketData(prev => ({ ...prev, stringHardness: value }))}
              error={errors.stringHardness}
              setError={(value: boolean) => setErrors(prev => ({ ...prev, stringHardness: value }))}
              value={(newRacketData).stringHardness}
              className={style.input}
            />
          </InputRow>
          <InputRow label='Schwunggewicht' className={style.inpitRow}>
            <MyInput
              onChange={(value: string) => setNewRacketData(prev => ({ ...prev, swingWeight: value }))}
              value={newRacketData.swingWeight}
              placeholder='Schwunggewicht eingeben'
              className={style.input}

            />
          </InputRow>
          <InputRow label='Balancepunkt' className={style.inpitRow}>
            <MyInput
              onChange={(value: string) => setNewRacketData(prev => ({ ...prev, balancePoint: value }))}
              value={newRacketData.balancePoint}
              placeholder='Balancepunkt eingeben'
              className={style.input}

            />
          </InputRow>

          <InputRow label='Gesamtgewicht' className={style.inpitRow}>
            <MyInput
              onChange={(value: string) => setNewRacketData(prev => ({ ...prev, totalWeight: value }))}
              value={newRacketData.totalWeight}
              placeholder='Gesamtgewicht eingeben'
              className={style.input}

            />
          </InputRow>


        </div>
        <div className={style.buttonRow}>
          <MyButton mode='white' border className={style.button} onClick={() => props.onOpenChange(false)}>
            Schließen
          </MyButton>
          <MyButton mode='black' className={style.button} onClick={handelSubmit}>
            {props.editMode ? 'Bearbeiten ' : 'Registrieren'}
          </MyButton></div>
      </FlutterMenu>
    </>
  )
}

export default AddRacketMenu
