import { Provider } from 'preact-redux';
import { h, render } from 'preact';
import { store } from './globals';
import Score from './components/Score.jsx';
import Canvas from './components/Canvas.jsx';


render(
  <div>
    <Provider store={store}>
      <Score />
    </Provider>
    <Canvas />
  </div>,
  document.querySelector('#root')
);
