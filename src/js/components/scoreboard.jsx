import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {store} from '../globals';

export default class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0,
      speed: 0,
      distance: 0,
      score: 0
    };

    store.subscribe(() => {
      this.setState({
        elapsed: store.getState().game.elapsed,
        speed: store.getState().speed.y,
        distance: store.getState().game.distance,
        score: store.getState().game.score
      });
    });
  }

  render(props, store) {
    return <div className='score'>
      Time: {Math.floor(this.state.elapsed)}s<br/>
      Dist: {Math.floor(this.state.distance)}m<br/>
      Speed: {Math.floor(this.state.speed)}m/s<br/>
      Style: {Math.floor(this.state.score)}<br/>
    </div>
  }
}
