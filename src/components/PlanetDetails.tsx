import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AppDispatch } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchPlanetDetails, updatePlanet } from '../store/slices/planetsSlice';

interface FormData {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно'),
  rotation_period: Yup.number().required('Обязательно поле').positive('Число должно быть положительным'),
  orbital_period: Yup.number().required('Обязательно поле').positive('Число должно быть положительным'),
  diameter: Yup.number().required('Обязательно поле').positive('Число должно быть положительным'),
  climate: Yup.string().required('Климат обязателен'),
  gravity: Yup.string().required('Гравитация обязательна'),
  terrain: Yup.string().required('Тип ландшафта обязателен'),
  surface_water: Yup.number().required('Уровень воды обязателен').positive('Уровень воды должен быть положительным'),
  population: Yup.number().required('Население обязательно').positive('Население должно быть положительным')
});

const PlanetDetails = () => {
  const { name } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const planetDetails = useSelector((state: any) => state.planets.details);
  const isLoading = useSelector((state: any) => state.planets.isLoading);
  const error = useSelector((state: any) => state.planets.error);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (name) {
      dispatch(fetchPlanetDetails(name));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (planetDetails) {
      setValue("name", planetDetails.name);
      setValue("rotation_period", planetDetails.rotation_period);
      setValue("orbital_period", planetDetails.orbital_period);
      setValue("diameter", planetDetails.diameter);
      setValue("climate", planetDetails.climate);
      setValue("gravity", planetDetails.gravity);
      setValue("terrain", planetDetails.terrain);
      setValue("surface_water", planetDetails.surface_water);
      setValue("population", planetDetails.population);
    }
  }, [planetDetails, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(updatePlanet({ data, oldName: name }));
    navigate('/planets');
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  return (
    <div className="container">
      <h2 className="mt-4">Детали планеты</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Имя:</label>
          <input {...register('name')} className="form-control" />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Период вращения:</label>
          <input type="number" {...register('rotation_period')} className="form-control" />
          {errors.rotation_period && <div className="text-danger">{errors.rotation_period.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Орбитальный период:</label>
          <input type="number" {...register('orbital_period')} className="form-control" />
          {errors.orbital_period && <div className="text-danger">{errors.orbital_period.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Диаметр:</label>
          <input type="number" {...register('diameter')} className="form-control" />
          {errors.diameter && <div className="text-danger">{errors.diameter.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Климат:</label>
          <input {...register('climate')} className="form-control" />
          {errors.climate && <div className="text-danger">{errors.climate.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Гравитация:</label>
          <input {...register('gravity')} className="form-control" />
          {errors.gravity && <div className="text-danger">{errors.gravity.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Тип ландшафта:</label>
          <input {...register('terrain')} className="form-control" />
          {errors.terrain && <div className="text-danger">{errors.terrain.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Уровень воды:</label>
          <input type="number" {...register('surface_water')} className="form-control" />
          {errors.surface_water && <div className="text-danger">{errors.surface_water.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Население:</label>
          <input type="number" {...register('population')} className="form-control" />
          {errors.population && <div className="text-danger">{errors.population.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Назад</button>
      </form>
    </div>
  );
};

export default PlanetDetails;
