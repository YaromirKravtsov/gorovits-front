import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import MyButton from '../../UI/MyButton/MyButton';
import style from './QRCodeGenerator.module.css'
interface QRCodeGeneratorProps {
  value: string; // Явно указываем тип для value
  className:string
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value,className }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null); // Указываем тип для qrCodeRef

  const handleDownloadQRCode = () => {
    const canvas = qrCodeRef.current?.querySelector('canvas');
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }
    
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div ref={qrCodeRef}>
    
      <MyButton onClick={handleDownloadQRCode} className ={className}>  <QRCode value={value} className={style.qrImg} height={30}/></MyButton>
    </div>
  );
};

export default QRCodeGenerator;
