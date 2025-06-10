import React, {useState, useEffect, useRef} from "react";
import ModalWindow from './ModalWindow.jsx';
import AllGallery from './AllGallery.jsx';
import Banners from './Banners.jsx';
import YouTubeDesign from './YouTubeDesign.jsx';
import YouTubeThumbnails from './YouTubeThumbnails.jsx';
import InstagramStories from './InstagramStories.jsx';
import Review from './Review.jsx';

import "./index.css";

const App =() => {
 //Модальное окно
  const [showModal, setShowModal] = useState(false);
   //Карусель
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const renderComponent = () => { 
    switch (selectedCategory) {
      case 'All':
        return <AllGallery/>;
      case 'Banners':
        return <Banners/>;
      case 'YouTubeDesign':
        return <YouTubeDesign/>;
      case 'YouTubeThumbnails':
        return <YouTubeThumbnails/>;
      case 'InstagramStories':
        return <InstagramStories/>;
      default:
        return <AllGallery/>;
    }
  };
//Модальное окно
  const handleOpenModal = () => { 
    setShowModal(true);
  };

  const handleCloseModal = () => { 
    setShowModal(false);
  };
 //Коментарии
  const containerRef = useRef(null);
  const reviewWidthRef = useRef(0);

  const reviews = [
    <Review key={1} name='Данила' link='sfcsc' text='Это отзыв'/>,
    <Review key={2} name='Дмитрий' link='sfcsc' text='Это отзыв'/>,
    <Review key={3} name='Сергей' link='sfcsc' text='Это отзыв'/>,
  ];

  const visibleReviews = 3;

  const handleScroll = () => {
    const box = containerRef.current;
    const width = reviewWidthRef.current * visibleReviews;

    if (box.scrollLeft <=0) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = box.scrollWidth -2 * width;
      box.style.scrollBehavior = 'smooth';
    }

    if (box.scrollLeft >= box.scrollWidth - width) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = width;
      box.style.scrollBehavior = 'smooth';
    }
  };

  const btnPrevReview = () => {
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
    const box = containerRef.current;
    box.scrollLeft += reviewWidthRef.current;
  };

  useEffect(() => {
    const box = containerRef.current;
    const firstReview = box.querySelector('.review-card');
    reviewWidthRef.current = firstReview.clientWidth;
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollWidth - width) / 2;
    box.addEventListener('scroll', handleScroll);

    return () => {
      box.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [scroll, setScroll] = useState(0);

  const scrollUp = () => {
    setScroll(window.scrollY)
  }

  const upButton = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

  useEffect (() => {
    window.addEventListener("scroll", scrollUp)
  }, [])

  const toBlock = (height) => {
    window.scrollTo({top: height, left: 0, behavior: 'smooth'})
  }

  return (
    <>
      <header>
          <div className="navigation">
            <div className="menu">
            <a onClick={upButton}>Обо мне</a>
            <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="700">Услуги</a>
            <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="1230">Портфолио</a>
            <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="1920">Отзывы</a>
            <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="2600">Гарантии</a>
            <a>Обратная связь</a>
          </div>

          <div className="header-buttons">
            <button onClick={handleOpenModal} className="btn">Связаться</button>
           

            <a href="" target="_blank" 
            className="icon telegram"/>
            <a href="" target="_blank" 
            className="icon instagram"/>

            <div className="switch">
              <div className="theme light"></div>
            </div>
            </div>
          </div>
      </header>

            <ModalWindow show={showModal} onClose={handleCloseModal}>
              <h2 style={{color: "#4824ff", fontSize: "40px"}}>Контакты</h2>
              <p style={{fontSize: "22px"}}>Вы можете связаться со мной в тг <br/> или в инст</p>
            </ModalWindow>

      <div className="welcome-block">
            <div className="first-block">
                <h1>Мой<span className="title"> сайт</span></h1>
                <h2 style={{marginBottom: '7%', marginTop: '7%'}}>Это<span style={{color: '#4824ff'}}> топовый</span> сайт<br/>
                 с<span style={{color: '#4824ff'}}> красивым</span> дизайном</h2>
            </div>
      </div>

      <div className="service-block" draggable='false'>
            <h1 style={{fontSize: '52px'}}>Что есть</h1>
            <p style={{fontSize: '27px'}}>Это<span style={{color: '#4842ff'}}> статический
             сайт</span> в котором есть:</p>
        
        <div style={{display: 'flex'}}>
            <p className="tag"><p className="tag-icon"/>Баннеры</p>
            <p className="tag"><p className="tag-icon"/>Красивый дизайн</p>
            <p className="tag"><p className="tag-icon"/>Анимации</p>
            <p className="tag"><p className="tag-icon"/>Написать можно</p>
        </div>

        <div style={{display: 'flex', marginTop: '16px'}}>
            <p className="tag"><p className="tag-icon"/>Смена тем</p>
            <p className="tag"><p className="tag-icon"/>Ещё что-то</p>
        </div>

        <p style={{fontSize: '27px'}}>Вот такой у меня получился список. Также есть<span style={{color: '#4824ff', cursor: 'pointer'}} onClick={handleOpenModal}> связь</span>.</p>
        </div>

        <div className="portfolio-block">
            <div className="first-block">
                <h1 className="main-title">Портфолио</h1>
                <div style={{ position: 'absolute', marginLeft: '-660px' }}>
                    <p className="gradient-part-one"></p>
                    <p className="title-border">Портф</p>
                </div>
                <div style={{ position: 'absolute', marginLeft: '620px' }}>
                    <p className="gradient-part-two"></p>
                    <p className="title-border">Фолио</p>
                </div>
                <img className="arrow-icon" src="./icons/arrowBottom.png" alt="Arrow" draggable='false' />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <p className={`tag ${selectedCategory === 'All' ? 'selected' : ''}`} onClick={() => setSelectedCategory('All')}>Все работы</p>
                <p className={`tag ${selectedCategory === 'Banners' ? 'selected' : ''}`} onClick={() => setSelectedCategory('Banners')}>Баннеры</p>
                <p className={`tag ${selectedCategory === 'YouTubeThumbnails' ? 'selected' : ''}`} onClick={() => setSelectedCategory('YouTubeThumbnails')}>Превью Ютуб</p>
                <p className={`tag ${selectedCategory === 'YouTubeDesign' ? 'selected' : ''}`} onClick={() => setSelectedCategory('YouTubeDesign')}>Оформление Ютуб</p>
                <p className={`tag ${selectedCategory === 'InstagramStories' ? 'selected' : ''}`} onClick={() => setSelectedCategory('InstagramStories')}>Истории Инстаграм</p>
            </div>
            <div className="content" style={{ marginLeft: '-5vw', marginRight: '-5vw' }}>
                {renderComponent()}
            </div>
        </div>

        <div className="review-block">
          <h1>Отзывы</h1>
          <p className="description">Это блок отзывов
            <span className="selecting">он переводит на аккаунт</span>Телеграм. Всё работает! <br/></p>

          <div className="review-carausel">
            <div className="review-container" ref={containerRef}>
              {reviews.slice(-visibleReviews)}
              {reviews}
              {reviews.slice(0, visibleReviews)}
            </div>
          </div>

          <div style={{display: "flex", justifyContent: "center"}}>
            <p className="next-button" style={{transform: "rotate(180deg)"}}>
            <p className="array-next-icon" onClick={btnPrevReview}/></p>
            <p className="next-button">
            <p className="array-next-icon" onClick={btnNextReview}/></p>
          </div>
        </div>

        <div className="guarantees-block">
          <h1 style={{ fontSize: "52px", paddingBottom: "20px"}}>Гарантии</h1>
          <ol className="guarantees-points">
            <li className="point">Не ну гарантии <span style={{ color: "#4842ff"}}>ТОЧНО ЕСТЬ</span></li>
            <li className="point">Не ну гарантии <span style={{ color: "#4842ff"}}>ТОЧНО ЕСТЬ</span></li>
            <li className="point">Не ну гарантии <span style={{ color: "#4842ff"}}>ТОЧНО ЕСТЬ</span></li>
          </ol>
        </div>

        <div className="footer">Foot</div>

        <button className={scroll < 1960 ? "" : "btn-up"} onClick={upButton}></button>

    </>
  );
}

export default App
