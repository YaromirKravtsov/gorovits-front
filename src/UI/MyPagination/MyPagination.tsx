import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import Loader from '../Loader/Loader';
import MyButton from '../MyButton/MyButton';
import style from './MyPagination.module.css';
import { AxiosResponse } from 'axios';
type fetchDataType =
    ((currentPage: number, itemsPerPage: number, searchQuery: string) => Promise<AxiosResponse<{ totalCount: number; data: any[] }>>) |
    ((currentPage: number, itemsPerPage: number, searchQuery: string, state: number) => Promise<AxiosResponse<{ totalCount: number; data: any[] }>>);

interface Props {
    fetchData: fetchDataType
    itemsPerPage: number;
    renderItem: (item: any) => ReactNode;
    className: string;
    searchQuery: string,
    state?: number;
    list: any[]
    setList: React.Dispatch<React.SetStateAction<any[]>>
}

const MyPagination: FC<Props> = ({ fetchData, itemsPerPage, renderItem, className, searchQuery, ...props }) => {

    const [items, setItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null); // Создание ссылки на div



    useEffect(() => {
        setCurrentPage(0);
        setTotalItems(0);
        props.setList([])
        setItems([]);
        if (props.state) {
            fetchMoreItemsWidthState(0, searchQuery, props.state)
        } else {
            fetchMoreItems(0, searchQuery); // Передаем currentPage = 0 и актуальный searchQuery как аргументы

        }
    }, [searchQuery, props.state]);
    useEffect(() => {
        setItems(props.list);
    }, [props.list])

    const fetchMoreItems = async (page = currentPage, query = searchQuery) => {

        if (containerRef.current) {
            const currentScrollPosition = containerRef.current.scrollTop;

            setIsLoading(true);
            try {
                //@ts-expect-error
                const response = await fetchData(page, itemsPerPage, query);
                setTotalItems(response.data.totalCount);
                setItems(prev => [...prev, ...response.data.data]);
                console.log(response.data)

                props.setList(prev => [...prev, ...response.data.data])
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

    const fetchMoreItemsWidthState = async (page: number = currentPage, query: string = searchQuery, state: number) => {
        console.log('fetchMoreItemsWidthState')
        setIsLoading(true);
        try {
            const response = await fetchData(page, itemsPerPage, query, state);
            const responseData = response.data; // Now TypeScript knows response.data exists
            setTotalItems(responseData.totalCount);
            setItems(prev => [...prev, ...responseData.data]);
            props.setList(prev => [...prev, ...responseData.data]);
            setCurrentPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };




    const hasMoreItems = items.length  < totalItems-1;
    console.log(items.length , totalItems-1 ,items.length  <= totalItems)
    return (
        <div ref={containerRef} className={className}>

            {items.map(item => <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>)}
            {isLoading &&
                <Loader size='small' />
            }
            {hasMoreItems && (
                <div className={style.buttonContainer}>

                    <MyButton mode='black' onClick={()=> props.state ? fetchMoreItemsWidthState(currentPage, searchQuery, props.state): fetchMoreItems(currentPage, searchQuery)} className={style.mehrLaden}>
                        Mehr laden
                    </MyButton>
                </div>
            )}

        </div>
    );
};

export default MyPagination;
