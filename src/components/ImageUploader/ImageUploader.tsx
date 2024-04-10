import React, { FC, useState } from 'react';
import style from './ImageUploader.module.css'
interface ImageUploaderProps {
  onFileChange: (file: File) => void;
  src?: string;
className:string;
}
const ImageUploader: FC<ImageUploaderProps> = (props) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setImageSrc(dataURL);
        props.onFileChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label htmlFor="imageInput" style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }} className={style.label}>
        <img
          src={imageSrc || props.src || 'placeholder.jpg'} // Поменяйте 'placeholder.jpg' на ссылку на изображение по умолчанию
          alt="Uploaded"
          style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}
          className={style.img}
        />
      </label>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default ImageUploader;
