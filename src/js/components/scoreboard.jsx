import {h, Component} from 'preact';


export default class Scoreboard extends Component {

  render (props) {
    return <div className='score'>
      Time: 00:00:00<br/>
      Dist: 0m<br/>
      Speed: 00m/s<br/>
      Style: 0<br/>
    </div>
  }
}
