import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Perfil from '../images/Perfil.png';
import done from '../images/done.png';
import favorite from '../images/favorite.png';
import logout from '../images/Logout.png';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user')) || { email: '' };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="w-screen">
      <Header title="PROFILE" image={ Perfil } />
      <div className="flex justify-center flex-col items-cente text-center align-middle w-[80%] m-auto">
        <p data-testid="profile-email" className="font-bold py-4">{email.email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className="text-gray-500 font-medium flex justify-center"
        >
          <img src={ done } alt="done" />
        </button>
        <hr />
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          className="text-gray-500 font-medium flex justify-center"
        >
          <img src={ favorite } alt="favorite" />
        </button>
        <hr />
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
          className="text-gray-500 font-medium flex justify-center"
        >
          <img src={ logout } alt="logout" />
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
