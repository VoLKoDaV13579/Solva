import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships, setPage } from '../store/slices/starshipsSlice';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';

const StarshipsTable = () => {
    const dispatch: AppDispatch = useDispatch();
    const { data, page, isLoading, error, hasMore } = useSelector((state: RootState) => state.starships);
    const currentPageData = data[page] || []
    useEffect(() => {
        dispatch(fetchStarships(page));
    }, [dispatch, page]);

    if (isLoading) return <p>Загрузка....</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-center mt-4">Список звездолётов</h2>
            <div className="container mt-3">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Название</th>
                            <th>Модель</th>
                            <th>Экипаж</th>
                            <th>Класс</th>
                            <th>Пассажиры</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((ship: any) => (
                            <tr key={ship.name}>
                                <td>{ship.name}</td>
                                <td>{ship.model}</td>
                                <td>{ship.crew}</td>
                                <td>{ship.starship_class}</td>
                                <td>{ship.passengers}</td>
                                <td>
                                    <Link to={`/starships/${ship.name}`} className="btn btn-info">Детальная информация</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between mt-3">
                    <button
                        className="btn btn-secondary"
                        onClick={() => dispatch(setPage(page - 1))}
                        disabled={page <= 1}>
                        Предыдущая
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => dispatch(setPage(page + 1))}
                        disabled={!hasMore}>
                        Следующая
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StarshipsTable;
