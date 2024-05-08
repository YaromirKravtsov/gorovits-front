import React, { ChangeEventHandler, FC, useEffect, useState, useRef } from 'react';
import style from './OrderSearchInput.module.css';

import searchIcon from '../../assets/images/search-icon.png';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import MyImage from '../../UI/MyImage/MyImage';
import { IString } from '../../models/IString';


export interface StringOption {
  name: string;
  id: number;
}

interface Props {
  onSelect: (value: StringOption) => void;
  error?: boolean;
  setError?: (value: boolean) => void,
  value:StringOption,
  strings: IString[]
}
const SearchStrings: FC<Props> = (props) => {

  const [value, setValue] = useState<string>(props.value.name);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredStrings, setFilteredStrings] = useState<IString[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setValue(props.value.name);
    
  }, [props.value]);

  useEffect(() => {
    setFilteredStrings(props.strings); // Обновляем filteredStrings после получения новых строк
  }, [props.strings]);
  
  useEffect(()=>{
    if(value == ''){
      onSelect({
        name: '',
        id: 0
      })
    }
  },[value])
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    const filtered = props.strings.filter(string => string.name.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredStrings(filtered);
    setIsOpen(true);
    if(props.setError)
    props.setError(false)
  };
  
  const onSelect = (string: StringOption) => {
    props.onSelect(string);
    setValue(string.name);
    setIsOpen(false);
    if(props.setError)
    props.setError(false)
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={componentRef} className={style.main}>
      <div className={style.serachRow}>
        <input
          type="text"
          className={style.searchInput}
          placeholder='Suchstrings'
          onChange={onInputChange}
          value={value}
          onFocus={() => setIsOpen(true)}
        />
        <MyImage alt='' src={searchIcon} className={style.searchIcon} />
         {props.error&&
         <span className={style.errorInput}>Das Feld muss ausgefüllt werden </span>
        }
        {isOpen &&
          <div className={style.dropDownBlock}>
            <div className={style.dropTitle}>Vorgeschlagene</div>
            {filteredStrings.map(string =>
              <div className={style.stringsItem} onClick={() => onSelect(string)}>{string.name}</div>
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default SearchStrings;
