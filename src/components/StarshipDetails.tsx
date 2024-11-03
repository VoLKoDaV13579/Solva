import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AppDispatch } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchStarshipDetails, updateStarship } from '../store/slices/starshipsSlice';
import { useEffect } from 'react';

interface FormData {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  max_atmosphering_speed: number;
  crew: number;
  passengers?: number | null;
  cargo_capacity: number;
  consumables: string;
  hyperdrive_rating: number;
  MGLT: number;
  starship_class: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно'),
  model: Yup.string().required('Модель обязательна'),
  manufacturer: Yup.string().required('Производитель обязателен'),
  cost_in_credits: Yup.number().required('Стоимость обязательна').positive('Число должно быть положительным'),
  length: Yup.number().required('Длина обязательна').positive('Число должно быть положительным'),
  max_atmosphering_speed: Yup.number().required('Максимальная скорость обязательна').positive('Число должно быть положительным'),
  crew: Yup.number().required('Экипаж обязателен').positive('Число должно быть положительным'),
  passengers: Yup.number().nullable(),
  cargo_capacity: Yup.number().required('Грузоподъемность обязательна').positive('Число должно быть положительным'),
  consumables: Yup.string().required('Расходные материалы обязательны'),
  hyperdrive_rating: Yup.number().required('Рейтинг гипердвигателя обязателен').positive('Число должно быть положительным'),
  MGLT: Yup.number().required('MGLT обязательно').positive('Число должно быть положительным'),
  starship_class: Yup.string().required('Класс звездолета обязателен')
});

const StarshipDetails = () => {
  const { name } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const starshipDetails = useSelector((state: any) => state.starships.details);
  const isLoading = useSelector((state: any) => state.starships.isLoading);
  const error = useSelector((state: any) => state.starships.error);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (name) {
      dispatch(fetchStarshipDetails(name));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (starshipDetails) {
      setValue("name", starshipDetails.name );
      setValue("model", starshipDetails.model );
      setValue("manufacturer", starshipDetails.manufacturer);
      setValue("cost_in_credits", Number(starshipDetails.cost_in_credits) );
      setValue("length", Number(starshipDetails.length) );
      setValue("max_atmosphering_speed", Number(starshipDetails.max_atmosphering_speed) );
      setValue("crew", Number(starshipDetails.crew) );
      setValue("passengers", starshipDetails.passengers === "n/a" ? null : Number(starshipDetails.passengers) || null);
      setValue("cargo_capacity", Number(starshipDetails.cargo_capacity));
      setValue("consumables", starshipDetails.consumables );
      setValue("hyperdrive_rating", Number(starshipDetails.hyperdrive_rating) );
      setValue("MGLT", Number(starshipDetails.MGLT) );
      setValue("starship_class", starshipDetails.starship_class );
    }
  }, [starshipDetails, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(updateStarship({ data: data, oldName: name }));
    navigate('/starships');
  }

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  
  return (
    <div className="container">
      <h2 className="mt-4">Детали звездолета</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Имя:</label>
          <input {...register('name')} className="form-control" />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Модель:</label>
          <input {...register('model')} className="form-control" />
          {errors.model && <div className="text-danger">{errors.model.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Производитель:</label>
          <input {...register('manufacturer')} className="form-control" />
          {errors.manufacturer && <div className="text-danger">{errors.manufacturer.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Стоимость в кредитах:</label>
          <input type="number" {...register('cost_in_credits')} className="form-control" />
          {errors.cost_in_credits && <div className="text-danger">{errors.cost_in_credits.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Длина:</label>
          <input type="number" {...register('length')} className="form-control" />
          {errors.length && <div className="text-danger">{errors.length.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Максимальная скорость в атмосфере:</label>
          <input type="number" {...register('max_atmosphering_speed')} className="form-control" />
          {errors.max_atmosphering_speed && <div className="text-danger">{errors.max_atmosphering_speed.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Экипаж:</label>
          <input type="number" {...register('crew')} className="form-control" />
          {errors.crew && <div className="text-danger">{errors.crew.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Пассажиры:</label>
          <input type="number" {...register('passengers')} className="form-control" />
          {errors.passengers && <div className="text-danger">{errors.passengers.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Грузоподъемность:</label>
          <input type="number" {...register('cargo_capacity')} className="form-control" />
          {errors.cargo_capacity && <div className="text-danger">{errors.cargo_capacity.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Расходные материалы:</label>
          <input {...register('consumables')} className="form-control" />
          {errors.consumables && <div className="text-danger">{errors.consumables.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Рейтинг гипердвигателя:</label>
          <input type="number" {...register('hyperdrive_rating')} className="form-control" />
          {errors.hyperdrive_rating && <div className="text-danger">{errors.hyperdrive_rating.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">MGLT:</label>
          <input type="number" {...register('MGLT')} className="form-control" />
          {errors.MGLT && <div className="text-danger">{errors.MGLT.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Класс звездолета:</label>
          <input {...register('starship_class')} className="form-control" />
          {errors.starship_class && <div className="text-danger">{errors.starship_class.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
};

export default StarshipDetails;
