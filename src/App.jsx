import "./index.css";

function App() {
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

        <button className="btn">Связаться</button>

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
