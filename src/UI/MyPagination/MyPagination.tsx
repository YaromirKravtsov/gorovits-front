import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import Loader from '../Loader/Loader';
import MyButton from '../MyButton/MyButton';
import style from './MyPagination.module.css';
import { AxiosResponse } from 'axios';

/* interface Item {
    id: number;
    // Добавьте другие свойства элемента
}
 */
interface Props {
    fetchData: (currentPage: number, itemsPerPage: number,searchQuery: string) => Promise<AxiosResponse<{ totalCount: number; data: any[] }>>;
    itemsPerPage: number;
    renderItem: (item: any) => ReactNode;
    className: string;
    searchQuery: string
}

const MyPagination: FC<Props> = ({  fetchData, itemsPerPage, renderItem, className,searchQuery }) => {
    const [items, setItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null); // Создание ссылки на div
  
    
    useEffect(() => {
        // Сброс состояний
        setCurrentPage(0);
        setTotalItems(0);
        setItems([]);
        // Вызов fetchMoreItems с актуальными значениями
        fetchMoreItems(0, searchQuery); // Передаем currentPage = 0 и актуальный searchQuery как аргументы
    }, [searchQuery]);
    
    const fetchMoreItems = async (page = currentPage, query = searchQuery) => {
        if (containerRef.current) {
            const currentScrollPosition = containerRef.current.scrollTop;
            console.log(query, page, itemsPerPage);
            setIsLoading(true);
            try {
                const response = await fetchData(page, itemsPerPage, query);
                setTotalItems(response.data.totalCount);
                setItems(prev => [...prev, ...response.data.data]);
                setCurrentPage(prevPage => prevPage + 1);
    
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.scrollTop = currentScrollPosition;
                    }
                }, 0);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    

    
    

    const hasMoreItems = items.length < totalItems;

    return (
        <div ref={containerRef} className={className}>
            {isLoading ? (
                <Loader />
            ) : (
                items.map(item => <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>)
            )}
            {hasMoreItems && (
                <MyButton mode='black' onClick={fetchMoreItems} className={style.mehrLaden}>
                    Mehr laden
                </MyButton>
            )}
        </div>
    );
};

export default MyPagination;
