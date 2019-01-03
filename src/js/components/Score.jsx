import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { store } from '../globals';

export default class Score extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0,
      speed: 0,
      distance: 0,
      score: 0,
      paused: 0,
      debug: 0
    };

    store.subscribe(() => {
      this.setState({
        elapsed: store.getState().game.elapsed,
        speed: store.getState().speed.y,
        distance: store.getState().game.distance,
        score: store.getState().game.score,
        paused: store.getState().game.started
      });
    });
  }

  pause() {
    const started = store.getState().game.started;
    store.dispatch({ type: 'GAME_PAUSE', payload: !started });
    store.dispatch({ type: 'PLAYER_MOVE', payload: 1 * !started });
  }

  debug() {
    const debug = store.getState().game.debug;
    store.dispatch({ type: 'DEBUG_MODE', payload: !debug });
  }

  reset() {
    const reset = store.getState().game.reset;
    store.dispatch({ type: 'GAME_RESET', payload: !reset });
  }

  render(props, store) {
    return (
      <div className="score">
        Time: {Math.floor(this.state.elapsed)}s<br />
        Dist: {Math.floor(this.state.distance)}m<br />
        Speed: {Math.floor(this.state.speed)}m/s<br />
        Style: {Math.floor(this.state.score)}
        <br />
        <button onClick={this.pause}>play/pause (P)</button>
        <button onClick={this.reset}>reset (R)</button>
        <label for="debug">
          <input type="checkbox" id="debug" name="debug" value={this.state.debug} onChange={this.debug} /> debug mode 
        </label>
      </div>
    );
  }
}
