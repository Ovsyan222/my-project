import React, {useState} from "react";
import ModalWindow from './ModalWindow.jsx';
import AllGallery from './AllGallery.jsx';
import Banners from './Banners.jsx';
import YouTubeDesign from './YouTubeDesign.jsx';
import YouTubeThumbnails from './YouTubeThumbnails.jsx';
import InstagramStories from './InstagramStories.jsx';

import "./index.css";

const App =() => {
  const [showModal, setShowModal] = useState(false);
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <header>
        <div className="menu">
          <a>Обо мне</a>
          <a>Что есть</a>
          <a>Портфолио</a>
        </div>

        <button onClick={handleOpenModal} className="btn">Связаться</button>
        <ModalWindow show={showModal} onClose={handleCloseModal}>
          <h2 style={{color: "#4824ff", fontSize: "40px"}}>Контакты</h2>
          <p style={{fontSize: "22px"}}>Вы можете связаться со мной в тг <br/> или в инст</p>
        </ModalWindow>

        <a href="" target="_blank" 
        className="icon telegram"/>
        <a href="" target="_blank" 
        className="icon instagram"/>

        <div className="switch">
          <div className="theme light"></div>
        </div>
      </header>

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

        

    </>
  )
}

export default App
