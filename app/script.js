import React from 'react';
import { render } from 'react-dom';

const formatTime = time => {
  let minutes = Math.floor(time/60);
  let seconds = time%60;
  if(minutes < 10) {
    minutes = '0' + minutes;
  }
  if(seconds < 10) {
    seconds = '0' + seconds;
  }
  const parsedTime = minutes + ':' + seconds;

  return parsedTime;
};



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      status: 'off',
    };
  };

  render() {

    const {status, time} = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    );
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });
  };

  step = () => {
    this.setState({
      time: this.state.time - 1,
    });

    let actualTime = this.state.time;
    let bell = new Audio('sounds/bell.wav');

    if(actualTime < 0){
      switch (this.state.status){
        
        case 'off':
          this.setState(
            {
              status: 'off',
              time: 1200,              
            }            
          );
          bell.play();
          break

        case 'work':
          this.setState(
            {
              status: 'rest',
              time: 20,              
            }
          );
          bell.play();
          break

        case 'rest':
          this.setState(
            {
              status: 'work',
              time: 1200,              
            }
          );
          bell.play();
          break
      };
    };
  };  

  stopTimer = () => {
    clearInterval(this.state.timer)
    this.setState({
      time: 0,
      status: 'off',
    });
  };  

  closeApp() {
    window.close();
  };
};

render(<App />, document.querySelector('#app'));
