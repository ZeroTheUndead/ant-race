import { useState, MouseEventHandler } from "react";
import Header from './components/Header/Header';
import HandlerButton from './components/HandlerButton/HandlerButton';
import AppGrid from './components/AppGrid/AppGrid';
import './App.css';

function App() {
  const [dataLoadStarted, setDataLoadStarted] = useState<boolean>(false);

  const handler: MouseEventHandler<HTMLButtonElement> = () => {
    setDataLoadStarted(true);
  };

  const title = 'ANT-RACE';
  const headerSize = 'large';
  const buttonTitle = 'Load Ant Data!';
  
  return (
    <div className='App'>
      <Header 
        title = {title}
        size = {headerSize}
      />
      <HandlerButton
        handler = {handler}
        disabled = {dataLoadStarted}
        buttonTitle = {buttonTitle}
      />
      <AppGrid
        loadData = {dataLoadStarted}
      />
    </div>
  );
}

export default App;
