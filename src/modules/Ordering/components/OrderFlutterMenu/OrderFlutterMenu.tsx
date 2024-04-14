import React, { FC, ReactNode, FormEvent } from 'react';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import style from './OrderFlutterMenu.module.css';
import MyButton from '../../../../UI/MyButton/MyButton';
import Row from '../../../../components/Layout/Row/Row';
import { useActions } from '../../../../hooks/useActions';
import Column from '../../../../components/Layout/Column/Column';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

interface Props {
    title: string;
    children: ReactNode;
    onSubmit: () => void; // Adjust the type of onSubmit prop,
    hidden: boolean,
    onClose: () => void,
    buttons?: ReactNode
}

const OrderFlutterMenu: FC<Props> = (props) => {
    const handleSubmit = () => {
        props.onSubmit();
    };
    const { windowWidth } = useTypedSelector(state => state.adaptive)
    return (
        <>
            <FlutterMenu shadow={windowWidth >= 600 ? 'all' : 'normal'} className={`${style.flutterMenu}`} hidden={props.hidden}>
                <Column className={style.mainColumn}>
                    <div className={style.title}>{props.title}</div> {/* Use the title prop */}
                    <Row className={style.inputsRow}>
                        {props.children}
                        <div className={style.buttonRow}>

                            {props.buttons}
                            <div className={style.actioveButtons}>
                                <MyButton className={style.button} border onClick={props.onClose}>{windowWidth >= 600 ? 'Schließen' : 'Abbrechen'}</MyButton>
                                <MyButton className={style.button} mode='black' onClick={handleSubmit}>Zeit wählen</MyButton>
                            </div>
                        </div>
                    </Row>
                </Column>
            </FlutterMenu>
        </>
    );
}

export default OrderFlutterMenu;
