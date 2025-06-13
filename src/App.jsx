import React, {useState, useEffect, useRef} from "react";
import ModalWindow from './ModalWindow.jsx';
import AllGallery from './AllGallery.jsx';
import Banners from './Banners.jsx';
import YouTubeDesign from './YouTubeDesign.jsx';
import YouTubeThumbnails from './YouTubeThumbnails.jsx';
import InstagramStories from './InstagramStories.jsx';
import Review from './Review.jsx';
import Theme from "./Theme.jsx";
import ModalMenu from "./ModalMenu.jsx";
import "./index.css";
import Resize from "./Resize.jsx";

const App =() => {
  const isPortrait = Resize();

  //Смена темы
  const {theme, setTheme} = Theme();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    if (isDarkTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const lightTheme = () => {
    setTheme('light');
  }

  const darkTheme = () => {
    setTheme('dark');
  }
  
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

  const [showModal, setShowModal] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

//Модальное окно
  const handleOpenModal = () => { 
    setShowModal(true);
  };

  const handleCloseModal = () => { 
    setShowModal(false);
  };

  const handleOpenModalMenu = () => { 
    setShowModalMenu(true);
  };

  const handleCloseModalMenu = () => { 
    setShowModalMenu(false);
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
        {isPortrait ? (
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
            
              <a href="" target="_blank" className={theme === 'light' ? "icon telegram light" : "icon telegram dark"}/>
              <a href="" target="_blank" className={theme === 'light' ? "icon instagram light" : "icon instagram dark"}/>

              <div className="switch" onClick={toggleTheme}>
                <div className={theme === 'light' ? "theme light" : "theme dark"} 
                style={{transform: isDarkTheme ? 'translateX(34px)' : 'translate(0)'}}></div>
              </div>
              </div>
            </div>)
          : 
          (  <div className="navigation">
              <div className="switch switch-mobile" onClick={toggleTheme}>
                <div className={theme === 'light' ? "theme theme-mobile light" 
                                                    : "theme theme-mobile dark"} 
                style={{transform: isDarkTheme ? 'translateX(8.6vw)' : 'translate(0)'}}></div>
              </div>
            <div className="header-buttons-mobile">
              <a href="" target="_blank" className={theme === 'light' ? "icon icon-mobile telegram light" : "icon icon-mobile telegram dark"}/>
              <a href="" target="_blank" className={theme === 'light' ? "icon icon-mobile instagram light" : "icon icon-mobile instagram dark"}/>

              <a onClick={handleOpenModalMenu} className={theme === 'light' ? "icon-menu light" : "icon-menu dark"}/>

              </div>
            </div>
          )}
      </header>

            <ModalMenu show={showModalMenu} onClose={handleCloseModalMenu}>
              <a onClick={upButton}>Обо мне</a>
              <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="700">Услуги</a>
              <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="1230">Портфолио</a>
              <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="1920">Отзывы</a>
              <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="2600">Гарантии</a>
            </ModalMenu>

            <ModalWindow show={showModal} onClose={handleCloseModal}>
              <h2 style={{color: "#4824ff", fontSize: isPortrait ? "40px" : "15vw",
                                            marginTop: isPortrait ? '' : '0'
              }}>Контакты</h2>
              {isPortrait ? (
                <p style={{fontSize: "22px"}}>Вы можете связаться со мной в тг <br/> или в инст</p>
              )
            :(
              <p style={{fontSize: "33px"}}>Вы можете связаться со мной в тг <br/> или в инст</p>
            )}
            </ModalWindow>

      {isPortrait ? (<div className="welcome-block">
            <div className="first-block">
                <h1>Мой<span className="title"> сайт</span></h1>
                <h2 style={{marginBottom: '7%', marginTop: '7%'}}>Это<span style={{color: '#4824ff'}}> топовый</span> сайт<br/>
                 с<span style={{color: '#4824ff'}}> красивым</span> дизайном</h2>
            </div>
      </div> )
          :
          (
        <div className="welcome-block mobile">
            <div className="first-block mobile">
                <h1>Мой<span className="title"> сайт</span></h1>
                <h2 style={{marginBottom: '7%', marginTop: '7%'}}>Это<span style={{color: '#4824ff'}}> топовый</span> сайт<br/>
                 с<span style={{color: '#4824ff'}}> красивым</span> дизайном</h2>
                 <button onClick={handleOpenModal} className="btn mobile">Связаться</button>
            </div>
        </div>
      )}

      <div className={isPortrait ? "service-block" : "service-block mobile"} draggable='false'>
            <h1 style={{fontSize: isPortrait ? '52px' : '10vw'}}>Что есть</h1>
            <p style={{fontSize: isPortrait ? '27px' : '6vw'}}>Это<span style={{color: '#4842ff'}}> статический
             сайт</span> в котором есть:</p>
        
        <div style={{display: isPortrait ? 'flex' : ''}}>
            <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light"}${isPortrait ? '' : 'mobile'}`}/>Баннеры</p>
            <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light"}${isPortrait ? '' : 'mobile'}`}/>Красивый дизайн</p>
            <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light"}${isPortrait ? '' : 'mobile'}`}/>Анимации</p>
            <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light"}${isPortrait ? '' : 'mobile'}`}/>Написать можно</p>
        </div>

        <div style={{display: isPortrait ? 'flex' : '', marginTop: isPortrait ? '16px' : ''}}>
            <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'}${isPortrait ? '' : 'mobile'}`}/>Смена тем</p>
            <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light"}${isPortrait ? '' : 'mobile'}`}/>Ещё что-то</p>
        </div>

        <p style={{fontSize: isPortrait ? '27px' : '6vw'}}>Вот такой у меня получился список. Также есть<span style={{color: '#4824ff', cursor: 'pointer'}} onClick={handleOpenModal}> связь</span>.</p>
        </div>

        <div className="portfolio-block">
            <div className={isPortrait ? "first-block" : "first-block mobile"}>
                <h1 className={isPortrait ? "main-title" : "main-title mobile"}>Портфолио</h1>
                <div style={{ position: 'absolute', marginLeft: isPortrait ? '-660px' : '-75vw'}}>
                    <p className={ isPortrait ? "gradient-part-one" : "gradient-part-one mobile"}></p>
                    {isPortrait ? (<p className="title-border">Портф</p>)
                                : (<p className="title-border mobile">Порт</p>)}
                </div>
                <div style={{ position: 'absolute', marginLeft: isPortrait ? '620px' : '75vw' }}>
                    <p className={ isPortrait ? "gradient-part-two" : "gradient-part-two mobile"}></p>
                    {isPortrait ? (<p className="title-border">фолио</p>)
                                : (<p className="title-border mobile">лио</p>)}
                </div>
                <img className={ isPortrait ? "arrow-icon" : "arrow-icon mobile"} src="./icons/arrowBottom.png" alt="Arrow" draggable='false' />
            </div>
            <div className={isPortrait ? "" : "filter-scrollbar"}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <p className={`tag ${selectedCategory === 'All' ? 'selected' : ''}${isPortrait ? '' : 'mobile'}`} onClick={() => setSelectedCategory('All')}>Все работы</p>
                <p className={`tag ${selectedCategory === 'Banners' ? 'selected' : ''}${isPortrait ? '' : 'mobile'}`} onClick={() => setSelectedCategory('Banners')}>Баннеры</p>
                <p className={`tag ${selectedCategory === 'YouTubeThumbnails' ? 'selected' : ''}${isPortrait ? '' : 'mobile'}`} onClick={() => setSelectedCategory('YouTubeThumbnails')}>Превью Ютуб</p>
                <p className={`tag ${selectedCategory === 'YouTubeDesign' ? 'selected' : ''}${isPortrait ? '' : 'mobile'}`} onClick={() => setSelectedCategory('YouTubeDesign')}>Оформление Ютуб</p>
                <p className={`tag ${selectedCategory === 'InstagramStories' ? 'selected' : ''}${isPortrait ? '' : 'mobile'}`} onClick={() => setSelectedCategory('InstagramStories')}>Истории Инстаграм</p>
              </div>
            </div>
            <div className="content" style={{ marginLeft: '-5vw', marginRight: '-5vw' }}>
                {renderComponent()}
            </div>
        </div>

        <div className={isPortrait ? "review-block" : "review-block mobile"}>
          <h1 style={{fontSize: isPortrait ? '50px' : '10vw'}}>Отзывы</h1>
          <p className={isPortrait ? "description" : "description mobile"}>Это блок отзывов
            <span className="selecting">он переводит на аккаунт</span>Телеграм. Всё работает! <br/></p>

          <div className={isPortrait ? "review-carausel" : "review-carausel"}>
            <div className={isPortrait ? "review-container" : "review-container"} ref={containerRef}>
              {reviews.slice(-visibleReviews)}
              {reviews}
              {reviews.slice(0, visibleReviews)}
            </div>
          </div>

          <div style={{display: "flex", justifyContent: "center"}}>
            <p className={isPortrait ? "next-button" : "next-button mobile"} style={{transform: "rotate(180deg)"}}>
            <p className="array-next-icon" onClick={btnPrevReview}/></p>
            <p className={isPortrait ? "next-button" : "next-button mobile"}>
            <p className="array-next-icon" onClick={btnNextReview}/></p>
          </div>
        </div>

        <div className={isPortrait ? "guarantees-block" : "guarantees-block mobile"}>
          <h1 style={{ fontSize: isPortrait ? "52px" : "10vw", paddingBottom: isPortrait ? "20px" : "0"}}>Гарантии</h1>
          <ol className={isPortrait ? "guarantees-points" : "guarantees-points mobile"}>
            <li className="point">Не ну гарантии <span style={{ color: "#4842ff"}}>ТОЧНО ЕСТЬ</span></li>
            <li className="point">Не ну гарантии <span style={{ color: "#4842ff"}}>ТОЧНО ЕСТЬ</span></li>
            <li className="point">Не ну гарантии <span style={{ color: "#4842ff"}}>ТОЧНО ЕСТЬ</span></li>
          </ol>
        </div>

        <div className="footer">Foot</div>

        <button className={scroll < 1960 ? "" : isPortrait ? "btn-up" : "btn-up mobile"} onClick={upButton}></button>

    </>
  );
}

export default App
