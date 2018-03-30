import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {store} from '../globals';

const stor = store;

export default class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      started: 0,
      speed: 0,
      distance: 0
    };

    store.subscribe(() => {
      this.setState({
        elapsed: store.getState().game.elapsed,
        speed: store.getState().speed.y,
        distance: parseInt(store.getState().game.distance)
      });
    });
  }

  render(props, store) {
    return <div className='score'>
      Time: {Math.floor(this.state.elapsed)}s<br/>
      Dist: {this.state.distance}m<br/>
      Speed: {this.state.speed}m/s<br/>
      Style: 0<br/>
    </div>
  }
}
