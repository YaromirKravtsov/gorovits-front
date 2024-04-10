import React, { FC, ReactNode, FormEvent } from 'react';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import style from './OrderFlutterMenu.module.css';
import MyButton from '../../../../UI/MyButton/MyButton';
import Row from '../../../../components/Layout/Row/Row';
import { useActions } from '../../../../hooks/useActions';
import Column from '../../../../components/Layout/Column/Column';

interface Props {
    title: string;
    children: ReactNode;
    onSubmit: () => void; // Adjust the type of onSubmit prop,
    hidden: boolean,
    onClose: () => void
}

const OrderFlutterMenu: FC<Props> = (props) => {
    const handleSubmit = () => {
        props.onSubmit();
    };
    
    return (
        <FlutterMenu shadow='all' className={`${style.flutterMenu}`} hidden={props.hidden}>
                <Column className={style.mainColumn}>
                    <div className={style.title}>{props.title}</div> {/* Use the title prop */}
                    <Row className={style.inputsRow}>
                        {props.children}
                        <Row className={style.buttonRow}>
                            <MyButton className={style.button} border onClick={props.onClose}>Schließen</MyButton>
                            <MyButton className={style.button} mode='black' onClick={handleSubmit}>Zeit wählen</MyButton> 
                        </Row>
                    </Row>
                </Column>
            </FlutterMenu>
    );
}

export default OrderFlutterMenu;
