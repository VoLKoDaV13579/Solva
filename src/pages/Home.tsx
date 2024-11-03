import React from 'react';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Nav />
      <div className="container text-center">
        <h1 className="mt-5">Добро пожаловать!</h1>
        <p className="lead">Мы рады видеть вас в нашем приложении.</p>
        <div className="mt-4">
          <h3>Что вы можете сделать:</h3>
          <ul className="list-unstyled">
            <li>Посмотреть список <Link to="/characters" className="link-primary">персонажей</Link>.</li>
            <li>Изучить различные <Link to="/planets" className="link-primary">планеты</Link>.</li>
            <li>Узнать о различных <Link to="/starships" className="link-primary">кораблях</Link>.</li>
          </ul>
        </div>
        <footer className="mt-5">
          <p>Хорошего времени суток! Наслаждайтесь!</p>
        </footer>
      </div>
    </>

  );

}

export default Home;
