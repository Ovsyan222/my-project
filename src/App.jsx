import React, {useState} from "react";
import ModalWindow from './ModalWindow.jsx'

import "./index.css";

const App =() => {
  const [showModal, setShowModal] = useState(false);

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
          <a>Услуги</a>
          <a>Портфолио</a>
          <a>Отзывы</a>
          <a>Гарантии</a>
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
    </>
  )
}

export default App
