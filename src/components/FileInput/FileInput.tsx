import { FC, useRef, ChangeEvent } from 'react';
import style from './FileInput.module.css';

interface Props {
    onImageSelected: (value: string) => void;
}

const FileInput: FC<Props> = ({ onImageSelected }) => {
    const inputRef = useRef<HTMLInputElement>(null); // Указываем, что ref ссылается на HTMLInputElement
    
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader(); // Получаем файл
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (e) => {
                if (reader.result)
                    onImageSelected(String(reader.result));
            }
            // Вызываем функцию onImageSelected с файлом как аргументом
        }
    };

    const onChooseImg = () => {
        inputRef.current?.click(); // Убедитесь, что inputRef.current существует перед вызовом click
    };

    return (
        <div>
            <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleOnChange}
                style={{ display: 'none' }}
            />
            <button className={style.addPhotoIcon} onClick={onChooseImg} >
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12.5" width="4" height="29" fill="white" />
                    <rect y="16.5" width="4" height="29" transform="rotate(-90 0 16.5)" fill="white" />
                </svg>

            </button>
           

        </div>
    );
}

export default FileInput;
