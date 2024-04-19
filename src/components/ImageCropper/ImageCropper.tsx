import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import FlutterMenu from "../../UI/FlutterMenu/FlutterMenu";
import style from './ImageCropper.module.css';
import MyButton from "../../UI/MyButton/MyButton";
import HoverEffect from "../../UI/HoverEffect/HoverEffect";
import DimOverlay from "../../UI/DimOverlay/DimOverlay";
import { DataActions } from "../../helpers/DataActions";

interface Props {
    onCropDone: (img: string) => void;
    aspect: number,
    className: string,
    internalImage: string
}

const ImageCropper: FC<Props> = ({ onCropDone, aspect, className, internalImage }) => {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [croppedArea, setCroppedArea] = useState<Area | null>(null);
    const [image, setImage] = useState<string>(internalImage)
    const [isInCrop, setIsInCrop] = useState<boolean>()
    const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
        setCroppedArea(croppedAreaPixels);
    };
    useEffect(() => {
        DataActions.convertImageToBase64(internalImage,img =>{
            setImage(img)
        })
    }, [internalImage])
    const rotateImage = () => {
        setRotation((prevRotation) => prevRotation + 90);
    };

    const handelCropDone = (imgCroppedArea: Area, rotation: number) => {
        setIsInCrop(false)
        const imageObj1 = new Image();
        imageObj1.src = image;

        imageObj1.onload = function () {
            // Создаём канвас с размером исходного изображения для начала
            const canvasEl = document.createElement('canvas');
            const context = canvasEl.getContext('2d');

            // Рассчитываем угол в радианах и определяем размеры канваса
            const angleInRadians = rotation * Math.PI / 180;
            const cos = Math.cos(angleInRadians);
            const sin = Math.sin(angleInRadians);

            // Определяем размеры канваса после поворота
            canvasEl.width = Math.abs(imageObj1.width * cos) + Math.abs(imageObj1.height * sin);
            canvasEl.height = Math.abs(imageObj1.width * sin) + Math.abs(imageObj1.height * cos);

            if (context) {
                // Центрируем и поворачиваем изображение
                context.translate(canvasEl.width / 2, canvasEl.height / 2);
                context.rotate(angleInRadians);
                context.translate(-imageObj1.width / 2, -imageObj1.height / 2);

                // Рисуем исходное изображение
                context.drawImage(imageObj1, 0, 0);
                console.log('dataUrl')
                // Рисуем обрезанное изображение в новый канвас
                const croppedCanvas = document.createElement('canvas');
                croppedCanvas.width = imgCroppedArea.width;
                croppedCanvas.height = imgCroppedArea.height;
                const croppedCtx = croppedCanvas.getContext('2d');

                if (croppedCtx) {
                    croppedCtx.drawImage(canvasEl,
                        imgCroppedArea.x, imgCroppedArea.y, imgCroppedArea.width, imgCroppedArea.height,
                        0, 0, imgCroppedArea.width, imgCroppedArea.height
                    );

                    const dataUrl = croppedCanvas.toDataURL('image/png');

/* 
                    const blob = DataActions.base64ToBlob(image, 'image/png')
                    const file = new File([blob], '1', {
                        type: 'image/png'
                    }); */
                    console.log(dataUrl)
                    setImage(dataUrl);
                    onCropDone(dataUrl)
                }
            }
        };
        imageObj1.onerror = function () {
            console.error('Error loading the image');
        };
    }

    /* ==== */

    const inputRef = useRef<HTMLInputElement>(null); // Указываем, что ref ссылается на HTMLInputElement

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsInCrop(true)
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader(); // Получаем файл
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (e) => {
                if (reader.result)
                    setImage(String(reader.result));
            }
            // Вызываем функцию onImageSelected с файлом как аргументом
        }
    };

    const onChooseImg = () => {

        inputRef.current?.click(); // Убедитесь, что inputRef.current существует перед вызовом click
    };
    const [isHovered, setIsHovered] = useState<boolean>(false)
    return (
        <>
            <HoverEffect setIsHovered={setIsHovered}>
                <input type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleOnChange}
                    style={{ display: 'none' }}
                />
                {image == '' ?
                    <button className={style.addPhotoIcon} onClick={onChooseImg} >
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12.5" width="4" height="29" fill="white" />
                            <rect y="16.5" width="4" height="29" transform="rotate(-90 0 16.5)" fill="white" />
                        </svg>
                    </button>
                    :
                    <div className={className}>
                        <div>
                            <img src={image} alt="" className={style.image} />
                        </div>

                        {isHovered &&
                            <DimOverlay className={style.actionButtons}>
                                <button className={style.addPhotoIcon} onClick={onChooseImg} >
                                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="12.5" width="4" height="29" fill="white" />
                                        <rect y="16.5" width="4" height="29" transform="rotate(-90 0 16.5)" fill="white" />
                                    </svg>
                                </button>

                                <button className={style.addPhotoIcon} onClick={() => setIsInCrop(true)} >
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.0916 37.3246L13.9733 36.1111L13.9733 36.1111L13.0916 37.3246ZM11.4324 35.6654L10.2188 36.547L10.2188 36.547L11.4324 35.6654ZM33.9084 37.3246L33.0267 36.1111L33.0267 36.1111L33.9084 37.3246ZM35.5676 35.6654L34.3541 34.7837L34.3541 34.7837L35.5676 35.6654ZM11.4324 14.8486L10.2188 13.9669L10.2188 13.9669L11.4324 14.8486ZM13.0916 13.1893L13.9733 14.4029L13.9733 14.4029L13.0916 13.1893ZM20.518 13.2677C21.3463 13.2577 22.0098 12.5782 21.9999 11.7498C21.99 10.9214 21.3104 10.258 20.482 10.2679L20.518 13.2677ZM38.4891 28.2749C38.499 27.4466 37.8355 26.767 37.0072 26.7571C36.1788 26.7471 35.4992 27.4106 35.4893 28.239L38.4891 28.2749ZM24.6963 31.2636L24.5307 29.7728L24.6963 31.2636ZM18.5167 30.8174L17.456 31.8781L17.456 31.8781L18.5167 30.8174ZM18.0704 24.6378L19.5613 24.8034L18.0704 24.6378ZM19.7911 21.0577L18.7304 19.997L18.7304 19.997L19.7911 21.0577ZM18.4644 22.6236L17.1124 21.9738L17.1124 21.9738L18.4644 22.6236ZM28.2764 29.543L29.337 30.6036L29.337 30.6036L28.2764 29.543ZM26.7105 30.8697L27.3603 32.2216L27.3603 32.2216L26.7105 30.8697ZM23.5 37.257C20.6543 37.257 18.6405 37.2549 17.0875 37.0866C15.5625 36.9214 14.6607 36.6105 13.9733 36.1111L12.2099 38.5381C13.494 39.471 14.9841 39.8763 16.7643 40.0692C18.5165 40.259 20.7211 40.257 23.5 40.257V37.257ZM8.5 25.257C8.5 28.0359 8.49794 30.2405 8.68777 31.9926C8.88065 33.7729 9.28592 35.263 10.2188 36.547L12.6459 34.7837C12.1465 34.0962 11.8355 33.1945 11.6703 31.6695C11.5021 30.1165 11.5 28.1027 11.5 25.257H8.5ZM13.9733 36.1111C13.4639 35.741 13.016 35.293 12.6459 34.7837L10.2188 36.547C10.774 37.3111 11.4459 37.983 12.2099 38.5381L13.9733 36.1111ZM23.5 40.257C26.2789 40.257 28.4835 40.259 30.2357 40.0692C32.0159 39.8763 33.506 39.471 34.7901 38.5381L33.0267 36.1111C32.3393 36.6105 31.4375 36.9214 29.9125 37.0866C28.3595 37.2549 26.3457 37.257 23.5 37.257V40.257ZM34.3541 34.7837C33.984 35.293 33.5361 35.741 33.0267 36.1111L34.7901 38.5381C35.5541 37.983 36.226 37.3111 36.7812 36.547L34.3541 34.7837ZM11.5 25.257C11.5 22.4113 11.5021 20.3975 11.6703 18.8444C11.8355 17.3195 12.1465 16.4177 12.6459 15.7303L10.2188 13.9669C9.28592 15.251 8.88065 16.7411 8.68777 18.5213C8.49794 20.2734 8.5 22.4781 8.5 25.257H11.5ZM12.2099 11.9758C11.4459 12.5309 10.774 13.2028 10.2188 13.9669L12.6459 15.7303C13.016 15.2209 13.4639 14.7729 13.9733 14.4029L12.2099 11.9758ZM20.482 10.2679C16.8608 10.3113 14.2391 10.5016 12.2099 11.9758L13.9733 14.4029C15.1137 13.5743 16.7482 13.3129 20.518 13.2677L20.482 10.2679ZM35.4893 28.239C35.4441 32.0088 35.1827 33.6432 34.3541 34.7837L36.7812 36.547C38.2554 34.5179 38.4457 31.8961 38.4891 28.2749L35.4893 28.239ZM35.2734 20.4246L27.2157 28.4823L29.337 30.6036L37.3948 22.5459L35.2734 20.4246ZM20.8518 22.1184L28.9095 14.0607L26.7881 11.9393L18.7304 19.997L20.8518 22.1184ZM24.5307 29.7728C22.7641 29.9691 21.6014 30.0946 20.7472 30.067C19.9332 30.0407 19.7 29.8795 19.5773 29.7568L17.456 31.8781C18.3529 32.775 19.4895 33.0279 20.6504 33.0654C21.7711 33.1016 23.1885 32.9404 24.862 32.7545L24.5307 29.7728ZM16.5796 24.4721C16.3937 26.1456 16.2325 27.563 16.2687 28.6837C16.3062 29.8446 16.5591 30.9812 17.456 31.8781L19.5773 29.7568C19.4546 29.6341 19.2934 29.4009 19.2671 28.5869C19.2395 27.7326 19.365 26.57 19.5613 24.8034L16.5796 24.4721ZM18.7304 19.997C18.0658 20.6616 17.47 21.2299 17.1124 21.9738L19.8164 23.2734C19.9015 23.0963 20.0425 22.9276 20.8518 22.1184L18.7304 19.997ZM19.5613 24.8034C19.6877 23.666 19.7313 23.4504 19.8164 23.2734L17.1124 21.9738C16.7549 22.7177 16.6834 23.538 16.5796 24.4721L19.5613 24.8034ZM27.2157 28.4823C26.4065 29.2916 26.2378 29.4326 26.0607 29.5177L27.3603 32.2216C28.1042 31.8641 28.6724 31.2682 29.337 30.6036L27.2157 28.4823ZM24.862 32.7545C25.7961 32.6507 26.6164 32.5792 27.3603 32.2216L26.0607 29.5177C25.8837 29.6028 25.6681 29.6464 24.5307 29.7728L24.862 32.7545ZM35.2734 14.0607C36.3034 15.0906 36.9669 15.7587 37.3916 16.3152C37.7898 16.8371 37.8341 17.0812 37.8341 17.2426H40.8341C40.8341 16.1615 40.3784 15.2842 39.7766 14.4955C39.2012 13.7413 38.3648 12.9094 37.3948 11.9393L35.2734 14.0607ZM37.3948 22.5459C38.3648 21.5759 39.2012 20.744 39.7766 19.9898C40.3784 19.2011 40.8341 18.3238 40.8341 17.2426H37.8341C37.8341 17.4041 37.7898 17.6482 37.3916 18.1701C36.967 18.7266 36.3034 19.3946 35.2734 20.4246L37.3948 22.5459ZM37.3948 11.9393C36.4247 10.9693 35.5928 10.1329 34.8386 9.55747C34.0499 8.95566 33.1726 8.5 32.0914 8.5V11.5C32.2529 11.5 32.497 11.5443 33.0189 11.9425C33.5754 12.3671 34.2434 13.0307 35.2734 14.0607L37.3948 11.9393ZM28.9095 14.0607C29.9395 13.0307 30.6075 12.3671 31.164 11.9425C31.6859 11.5443 31.93 11.5 32.0914 11.5V8.5C31.0103 8.5 30.133 8.95567 29.3443 9.55747C28.5901 10.1329 27.7582 10.9693 26.7881 11.9393L28.9095 14.0607ZM37.3948 20.4246L28.9095 11.9393L26.7881 14.0607L35.2734 22.5459L37.3948 20.4246Z" fill="white" />
                                    </svg>

                                </button>

                            </DimOverlay>
                        }
                    </div>

                }

            </HoverEffect>
            {isInCrop &&
                <FlutterMenu shadow='all' className={style.editFlutter}>
                    <div className={style.cropperMain}>
                        <Cropper
                            image={image}
                            aspect={aspect}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            style={{
                                containerStyle: {
                                    width: "100%",
                                    height: "100%",
                                    border: '1px solid #000'
                                },
                                mediaStyle: {
                                    transform: `rotate(${rotation}deg)`
                                }
                            }}
                        />
                        <MyButton mode='black' onClick={rotateImage} className={style.rotate}>
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.rotateImg}>
                                <g clip-path="url(#clip0_1109_173)">
                                    <path d="M30 2C30 3.104 30.896 4 32 4C 39.479 4 46.51 6.913 51.798 12.202C57.087 17.49 60 24.521 60 32C60 39.381 57.158 46.323 52 51.587V46C52 44.896 51.104 44 50 44C48.896 44 48 44.896 48 46V58H60C61.104 58 62 57.104 62 56C62 54.896 61.104 54 60 54H55.224C60.885 48.032 64 40.257 64 32C64 23.453 60.671 15.417 54.626 9.373C48.583 3.329 40.547 0 32 0C30.896 0 30 0.896 30 2Z" fill="white" />
                                    <path d="M9.374 54.627C15.417 60.671 23.453 64 32 64C33.104 64 34 63.104 34 62C34 60.896 33.104 60 32 60C24.521 60 17.49 57.087 12.202 51.798C6.913 46.51 4 39.479 4 32C4 24.619 6.842 17.677 12 12.413V18C12 19.104 12.896 20 14 20C15.104 20 16 19.104 16 18V6H4C2.896 6 2 6.896 2 8C2 9.104 2.896 10 4 10H8.776C3.115 15.968 0 23.743 0 32C0 40.547 3.329 48.583 9.374 54.627Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1109_173">
                                        <rect width="64" height="64" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </MyButton>
                    </div>
                    <div className={style.buttonsRow}>
                    <MyButton mode='white' border onClick={() => setIsInCrop(false)}>
                        Schließen
                    </MyButton>
                    <MyButton mode='white' border onClick={() => { if (croppedArea) handelCropDone(croppedArea, rotation) }}>
                        Crop
                    </MyButton>
                    </div>

                </FlutterMenu>
            }
        </>
    );
}

export default ImageCropper;
