import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanets, setPage } from '../store/slices/planetsSlice';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';

const PlanetsTable = () => {
    const dispatch: AppDispatch = useDispatch();
    const { data, page, isLoading, error, hasMore } = useSelector((state: RootState) => state.planets);
    const currentPageData = data[page] || []
    useEffect(() => {
        dispatch(fetchPlanets(page));
    }, [dispatch, page]);

    if (isLoading) return <p>Загрузка....</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-center mt-4">Список планет</h2>
            <div className="container mt-3">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Название</th>
                            <th>Гравитация</th>
                            <th>Население</th>
                            <th>Рельеф</th>
                            <th>Климат</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((planet: any) => (
                            <tr key={planet.name}>
                                <td>{planet.name}</td>
                                <td>{planet.gravity}</td>
                                <td>{planet.population}</td>
                                <td>{planet.terrain}</td>
                                <td>{planet.climate}</td>
                                <td>
                                    <Link to={`/planets/${planet.name}`} className="btn btn-info">Детальная информация</Link>
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

export default PlanetsTable;
