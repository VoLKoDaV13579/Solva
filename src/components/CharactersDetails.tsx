import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch} from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacterDetails, updateCharacter } from '../store/slices/charactersSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface FormData {
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Имя обязательно'),
    height: Yup.number().required('Рост обязателен').positive('Рост должен быть положительным').integer('Рост должен быть целым числом'),
    mass: Yup.number().required('Масса обязательна').positive('Масса должна быть положительной').integer('Масса должна быть целым числом'),
    hair_color: Yup.string().required('Цвет волос обязателен'),
    skin_color: Yup.string().required('Цвет кожи обязателен'),
    eye_color: Yup.string().required('Цвет глаз обязателен'),
    birth_year: Yup.string().required('Год рождения обязателен'),
    gender: Yup.string().required('Пол обязателен'),
});

const CharactersDetails = () => {
    const { name } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const characterDetails = useSelector((state: any) => state.characters.details);
    const isLoading = useSelector((state: any) => state.characters.isLoading);
    const error = useSelector((state: any) => state.characters.error);
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (name) {
            dispatch(fetchCharacterDetails(name));
        }
    }, [dispatch, name]);
    
    useEffect(() => {
        if (characterDetails) {
            setValue('name', characterDetails.name);
            setValue('height', characterDetails.height);
            setValue('mass', characterDetails.mass);
            setValue('hair_color', characterDetails.hair_color);
            setValue('skin_color', characterDetails.skin_color);
            setValue('eye_color', characterDetails.eye_color);
            setValue('birth_year', characterDetails.birth_year);
            setValue('gender', characterDetails.gender);
        }
    }, [characterDetails, setValue]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(updateCharacter({data:data, oldName:name}))
        navigate('/characters')
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div className="container">
            <h2 className="mt-4">Детали персонажа</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Имя:</label>
                    <input
                        {...register('name')}
                        className="form-control"
                        defaultValue={characterDetails?.name || ''}
                    />
                    {errors.name && <div className="text-danger">{errors.name.message}</div>} 
                </div>
                <div className="mb-3">
                    <label className="form-label">Рост:</label>
                    <input
                        type="number"
                        {...register('height')}
                        className="form-control"
                        defaultValue={characterDetails?.height || 0}
                    />
                    {errors.height && <div className="text-danger">{errors.height.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Масса:</label>
                    <input
                        type="number"
                        {...register('mass')}
                        className="form-control"
                        defaultValue={characterDetails?.mass || 0}
                    />
                    {errors.mass && <div className="text-danger">{errors.mass.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Цвет волос:</label>
                    <input
                        {...register('hair_color')}
                        className="form-control"
                        defaultValue={characterDetails?.hair_color || ''}
                    />
                    {errors.hair_color && <div className="text-danger">{errors.hair_color.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Цвет кожи:</label>
                    <input
                        {...register('skin_color')}
                        className="form-control"
                        defaultValue={characterDetails?.skin_color || ''}
                    />
                    {errors.skin_color && <div className="text-danger">{errors.skin_color.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Цвет глаз:</label>
                    <input
                        {...register('eye_color')}
                        className="form-control"
                        defaultValue={characterDetails?.eye_color || ''}
                    />
                    {errors.eye_color && <div className="text-danger">{errors.eye_color.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Год рождения:</label>
                    <input
                        {...register('birth_year')}
                        className="form-control"
                        defaultValue={characterDetails?.birth_year || ''}
                    />
                    {errors.birth_year && <div className="text-danger">{errors.birth_year.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Пол:</label>
                    <input
                        {...register('gender')}
                        className="form-control"
                        defaultValue={characterDetails?.gender || ''}
                    />
                    {errors.gender && <div className="text-danger">{errors.gender.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Сохранить</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Назад</button>
            </form>
        </div>
    );
};

export default CharactersDetails;
