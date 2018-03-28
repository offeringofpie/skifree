import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {store} from '../globals';

const stor = store;

export default class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speed: 0,
      distance: 0
    };

    store.subscribe(() => {
      this.setState({
        speed: store.getState().speed.y,
        distance: parseInt(store.getState().game.distance)
      });
    });
  }

  render(props, store) {
    return <div className='score'>
      Time: 00:00:00<br/>
      Dist: {this.state.distance}m<br/>
      Speed: {this.state.speed}m/s<br/>
      Style: 0<br/>
    </div>
  }
}
