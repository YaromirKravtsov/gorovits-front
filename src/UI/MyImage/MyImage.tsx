import  { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';


interface MyImageProps {
    alt: string; 
    width?:number;
    height?:number;
    src: string;
    lazy?: boolean;
    className?: string;

}
const MyImage: FC<MyImageProps>= (props) => (
  <>
    {props.lazy? 
     <LazyLoadImage
     alt={props.alt}
     src={props.src} 
     style ={{width:props.width, height: props.height}}
     effect="blur"
     className={props.className}
    />
    :
    <img alt={props.alt || 'Ladefehler des Bildes' }
    src={props.src} 
    style ={{width:props.width, height: props.height}}
    className={props.className}
    />
    }
   

  </>
);

export default MyImage;
