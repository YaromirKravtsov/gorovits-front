import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode';
import MyButton from '../../UI/MyButton/MyButton';
import style from './QRCodeGenerator.module.css';
import FlutterMenu from '../../UI/FlutterMenu/FlutterMenu';

interface QRCodeGeneratorProps {
  value: string;
  className: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, className }) => {
  const [codeType, setCodeType] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);


  const handleDownloadQrCode = () => {
    const element = qrCodeRef.current;
    if (!element) {
      console.error('Ref element not found');
      return;
    }

    let url: string | undefined;

    const canvas = element.querySelector('canvas');
    if (!canvas) {
      console.error('Canvas not found for QR Code');
      return;
    }
    url = canvas.toDataURL('image/png');


    if (!url) {
      console.error('Failed to generate URL');
      return;
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  }

  const handleDownloadBarCode = () => {
    const element = qrCodeRef.current;
    if (!element) {
      console.error('Ref element not found');
      return;
    }

    let url: string | undefined;


    const svg = element.querySelector('svg');
    if (!svg) {
      console.error('SVG not found for Barcode');
      return;
    }
    url = svgToDataURL(svg);


    if (!url) {
      console.error('Failed to generate URL');
      return;
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = 'barcode.png';
    a.click();
  }

  function svgToDataURL(svg: SVGSVGElement): string {
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const b64Start = 'data:image/svg+xml;base64,';
    return b64Start + svg64;
  }
  return (
    <div className={style.qrCodeContainer} ref={qrCodeRef}>

      <div>
        <MyButton onClick={() => setCodeType(true)} className={className}>
          <QRCode value={value} className={style.qrImg} height={20} />
        </MyButton>

      </div>

      {codeType &&
        <FlutterMenu shadow='all' className={style.flutter}>
          <div className={style.title}>Wählen Sie den Codetyp </div>
          <div className={style.flutterMain}>
            <div>
              <QRCode value={value} size={100} onClick={handleDownloadQrCode} className={style.qrCode} />
            </div>
            <div onClick={handleDownloadBarCode} className={style.barCode}>
              <Barcode value={value} format="CODE128" width={2} height={100} displayValue={false} />
            </div>
          </div>
          <MyButton onClick={() => setCodeType(false)} className={style.closeButton} border>
          Schließen
          </MyButton>

        </FlutterMenu>
      }

    </div>
  );
};

export default QRCodeGenerator;
