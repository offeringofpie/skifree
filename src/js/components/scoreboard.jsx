import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import store from '../globals';

const stor = store;

export default class Scoreboard extends Component {
  render (props, store) {
    return <div className='score'>
      Time: 00:00:00<br/>
      Dist: 0m<br/>
      Speed: {stor}m/s<br/>
      Style: 0<br/>
    </div>
  }
}
