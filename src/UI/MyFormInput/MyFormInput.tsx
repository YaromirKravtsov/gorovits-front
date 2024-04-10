import  {  FC } from 'react'
import style from './MyInput.module.css'


export interface IRegister{
    required: boolean| string;
    pattern?: {
        value: RegExp;
        message: string;
    }
}
interface MyInputProps {
    width?: number;
    height?: number;
    placeholder: string;
    register: any;
    registerOptions: IRegister; // Используем registerOptions для передачи конфигурации
    errors: any;
    name: string;
    labelText?: string;
    className?:string;
    type?:string;
    autoComplete?:string;
  }

  const MyFormInput: FC<MyInputProps> = ({ width = 360, height = 50, ...props }) => {
    console.log(props.errors)
    return (
      <div className={props.className}>
        <label className={style.label}>
          <span className={style.span}>{props.labelText}</span>
          <input
            type={props.type ||'text'}
            style={{ width: width, height: height }}
            className={`${style.input} ${props.errors[props.name] ? style.error: ''}`}
            placeholder={props.placeholder}
            {...props.register(props.name, props.registerOptions)}
            autoComplete ={props.autoComplete ? props.autoComplete: ''}
            id={props.name}
          />
          {props.errors[props.name] && <div className={style.errorText}>{props.errors[props.name].message}</div>}
        </label>
      </div>
    )
  }
  

export default MyFormInput
