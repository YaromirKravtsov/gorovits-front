import netural from '../assets/images/profile/neutral.png';
import female from '../assets/images/profile/female.png';
import male from '../assets/images/profile/male.png';
import addProfileIcon from '../profile/add-profile-photo.png';


export interface ProfilePhoto{
    src: string;
    name:string;
}
export const profilePhotos:ProfilePhoto[]  = [
    {name: 'natural', src: netural},
    {name: 'female', src: female},
    {name: 'male', src: male},
]