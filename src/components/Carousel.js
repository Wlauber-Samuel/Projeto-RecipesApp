import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { useHistory, useParams } from 'react-router-dom';
import './Carousel.css';

function Carousel() {
  const [carousel, setCarousel] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  const { id } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      const urlMeals = 'https://www.themealdb.com/api/json/v1/1/';
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
      const maxNumber = 6;
      switch (pathname) {
      case `/meals/${id}`: {
        const newResponse = await fetch(`${urlDrinks}search.php?s=`);
        const newData = await newResponse.json();
        setCarousel(newData.drinks.slice(0, maxNumber));
        break;
      }
      case `/drinks/${id}`: {
        const newResponse = await fetch(`${urlMeals}search.php?s=`);
        const newData = await newResponse.json();
        setCarousel(newData.meals.slice(0, maxNumber));
        break;
      }
      default:
        break;
      }
    };
    fetchApi();
  }, [id, pathname]);

  return (
    <Swiper
      slidesPerView={ 2 }
      spaceBetween={ 30 }
      pagination={ {
        clickable: true,
      } }
      modules={ [Pagination] }
      className="mySwiper"
    >
      {pathname === `/meals/${id}`
        ? carousel?.map((drink, index) => (
          <SwiperSlide
            key={ index }
            data-testid={ `${index}-recommendation-card` }
            className="container-carousel"
          >
            <img src={ drink.strDrinkThumb } alt="drink" width={ 160 } />
            <h3 data-testid={ `${index}-recommendation-title` }>
              {drink.strDrink}
            </h3>
          </SwiperSlide>
        ))
        : carousel?.map((food, index) => (
          <SwiperSlide
            key={ index }
            data-testid={ `${index}-recommendation-card` }
            className="container-carousel"
          >
            <img src={ food.strMealThumb } alt="food" width={ 160 } />
            <h3 data-testid={ `${index}-recommendation-title` }>
              {food.strMeal}
            </h3>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default Carousel;
