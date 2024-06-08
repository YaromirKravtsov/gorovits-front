import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import Loader from '../Loader/Loader';
import MyButton from '../MyButton/MyButton';
import style from './MyPagination.module.css';
import { AxiosResponse } from 'axios';

type fetchDataType =
    ((currentPage: number, itemsPerPage: number, searchQuery: string) => Promise<AxiosResponse<{ totalCount: number; data: any[] }>>) |
    ((currentPage: number, itemsPerPage: number, searchQuery: string, state: number) => Promise<AxiosResponse<{ totalCount: number; data: any[] }>>) |
    ((currentPage: number, itemsPerPage: number, searchQuery: string, state: number, userId: number|'all') => Promise<AxiosResponse<{ totalCount: number; data: any[] }>>);

interface Props {
    fetchData: fetchDataType;
    itemsPerPage: number;
    renderItem: (item: any) => ReactNode;
    className: string;
    searchQuery: string;
    state?: number;
    list: any[];
    setList: React.Dispatch<React.SetStateAction<any[]>>;
    userId?: number| 'all';
}

const MyPagination: FC<Props> = ({ fetchData, itemsPerPage, renderItem, className, searchQuery, ...props }) => {

    const [items, setItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentPage(0);
        setTotalItems(0);
        props.setList([]);
        setItems([]);
        if (props.state && !props.userId) {
            fetchMoreItemsWithState(0, searchQuery, props.state);
        } else if (props.userId) {
            fetchMoreItemsWithUserId(0, searchQuery, props.state, props.userId);
        } else {
            fetchMoreItems(0, searchQuery);
        }
    }, [searchQuery, props.state, props.userId]);

    useEffect(() => {
        setItems(props.list);
    }, [props.list]);

    const fetchMoreItems = async (page = currentPage, query = searchQuery) => {
        if (containerRef.current) {
            const currentScrollPosition = containerRef.current.scrollTop;

            setIsLoading(true);
            try {
                    //@ts-ignore
                const response = await fetchData(page, itemsPerPage, query) as AxiosResponse<{ totalCount: number; data: any[] }>;
                setTotalItems(response.data.totalCount);
                setItems(prev => [...prev, ...response.data.data]);
                props.setList(prev => [...prev, ...response.data.data]);
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

    const fetchMoreItemsWithState = async (page: number = currentPage, query: string = searchQuery, state: number) => {
        setIsLoading(true);
        try {
            //@ts-ignore
            const response = await fetchData(page, itemsPerPage, query, state) as AxiosResponse<{ totalCount: number; data: any[] }>;
            const responseData = response.data;
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

    const fetchMoreItemsWithUserId = async (page: number = currentPage, query: string = searchQuery, state: number | undefined, userId: number| 'all') => {
        setIsLoading(true);
        try {
            const response = await fetchData(page, itemsPerPage, query, state as number, userId as number|'all') as AxiosResponse<{ totalCount: number; data: any[] }>;
            const responseData = response.data;
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

    const hasMoreItems = items.length < totalItems - 1;

    return (
        <div ref={containerRef} className={className}>
            {items.map(item => <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>)}
            {isLoading && <Loader size='small' />}
            {hasMoreItems && (
                <div className={style.buttonContainer}>
                    <MyButton
                        mode='black'
                        onClick={() =>
                            props.userId ?
                                fetchMoreItemsWithUserId(currentPage, searchQuery, props.state, props.userId) :
                                props.state ?
                                    fetchMoreItemsWithState(currentPage, searchQuery, props.state) :
                                    fetchMoreItems(currentPage, searchQuery)
                        }
                        className={style.mehrLaden}
                    >
                        Mehr laden
                    </MyButton>
                </div>
            )}
        </div>
    );
};

export default MyPagination;
