import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setPage } from '../store/slices/charactersSlice';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';

const CharactersTable = () => {
    const dispatch: AppDispatch = useDispatch();
    const { data, page, isLoading, error, hasMore } = useSelector((state: RootState) => state.characters);
    const currentPageData = data[page] || [];

    useEffect(() => {
        dispatch(fetchCharacters(page));
    }, [page, dispatch]);

    if (isLoading) return <p>Загрузка....</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="container mt-4">
                <h2 className="text-center">Список персонажей</h2>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Имя</th>
                            <th>Рост</th>
                            <th>Масса</th>
                            <th>Год рождения</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((character: any) => (
                            <tr key={character.name}>
                                <td>{character.name}</td>
                                <td>{character.height}</td>
                                <td>{character.mass}</td>
                                <td>{character.birth_year}</td>
                                <td>
                                    <Link to={`/characters/${character.name}`} className="btn btn-info">Детальная информация</Link>
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

export default CharactersTable;
