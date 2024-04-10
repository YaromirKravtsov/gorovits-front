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
    const [scrollTop, setScrollTop] = useState<number>(0)
    
    useEffect(() => {
        setCurrentPage(0)
        setTotalItems(0)
        setItems([])
        fetchMoreItems();
    }, [searchQuery]);

    const fetchMoreItems = async () => {
        if (containerRef.current) {
            const currentScrollPosition = containerRef.current.scrollTop;
            console.log(searchQuery,currentPage, itemsPerPage)
            setIsLoading(true);
            try {
                const response = await fetchData(currentPage, itemsPerPage, searchQuery);
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

    
    
    
    const handelScroll = () => {
        if (containerRef.current)
      
            setScrollTop(containerRef.current.scrollTop)
    }

    const hasMoreItems = items.length < totalItems;

    return (
        <div ref={containerRef} className={className} onScroll={handelScroll}>
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
