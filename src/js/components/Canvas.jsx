import { h, Component } from 'preact';
import { globals, store } from '../globals';
import { Provider } from 'preact-redux';
import Game from '../classes/Game';
import Score from './Score.jsx';



export default class Canvas extends Component {
  constructor() {
    super(); 

    this.state ={
      windowed: false
    };

    store.subscribe(() => {
      this.setState({
        windowed: store.getState().game.windowed
      });
    });
  }
  componentDidMount() {
    globals.canvas = document.querySelector('canvas');
    globals.context = document.querySelector('canvas').getContext('2d', { alpha: false });

    let game = new Game();
    game.init();

    if (self == top && store.getState().game.windowed) {
      this.setState({
        windowed: true
      });
    }
  }

  render() {
    return (<div class={`window ${this.state.windowed ? 'windowed' : ''}`}>
    <div class="border">
      <div class="titlebar">
        <button class="close" id="window">—</button>
        <div class="title">SkiFree</div>
        <div class="minmax">
          <button class="button" id="max">▲</button>
          <button class="button" id="min">▼</button>
        </div>
      </div>
      <div class="inner">
        <Provider store={store}>
          <Score store={store} />
        </Provider>
        <canvas id="canvas" width="100%" height="100%"></canvas>
      </div>
    </div>
  </div>)
  }
}
