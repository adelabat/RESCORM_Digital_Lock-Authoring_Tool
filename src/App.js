import React, { Component } from 'react';
import Config from './Config';
import InfoModal from './InfoModal';
import './App.css';
import {generatePackage} from './generatePackage';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "DIGITAL LOCK",
      showUsername:"true",
      timeout:"",
      answer:"01",
      tip:"Select the top 3 points starting from the left",
      CombinationLockImage:"./../assets/images/CajaFuerte.png",
      modes:["Symbol", "AlphaNumeric", "Pattern", "CombinationLock"],
      mode:"Pattern",
      themes:["dark", "lux", "cerulean", "cyborg", "pulse", "sketchy", "superhero"],
      theme:"sketchy",
      good:"Enhorabuena, lo has logrado!!",
      bad:"Lo siento, se acabó tu tiempo",
      escapp: true,
      puzzleId: 5,
      escapeRoomId: 1,
      puzzleLength: 4,
      scormVersion: "1.2",

    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <button className="info" onClick={()=>{this.setState({showInfoModal: true})}}>
            <i className="material-icons">???</i>
          </button>
          <h1><i className="material-icons">lock</i>
          DIGITAL LOCK
          </h1>
          </header>
        <div className="content">

          <div className="content-col left">
            <h1>Configuration</h1>
            <Config {...this.state} onConfigChange={(prop,value)=>{this.setState({[prop]:value}); this.preview();}}/>


              <button onClick={this.download.bind(this)}>
                <i className="material-icons">cloud_download</i>Dowload
              </button>

          </div>

          <div className="content-col right">
            {/*<h2>Preview</h2>*/}
            <iframe id="visor" title="app" />
          </div>
        </div>
        <InfoModal show={this.state.showInfoModal} hide={()=>{this.setState({showInfoModal: false})}}/>
      </div>

    );
  }
  preview(){
    fetch("scorm12/index.html").then(res=>res.text()).then(response=>{
        this.onloadend(response);
    })

  }

  onloadend(res) {
    let content = res.replace('<div id="root"></div>',`
      <div id='root'></div>
      <script>
        window._babelPolyfill = false;
        window.config=JSON.parse('${JSON.stringify({...this.state, dev: true})}');
      </script>`)
    content = content.replace("bundle.js","scorm12/bundle.js")
    let el = document.getElementById('visor')
    el.contentWindow.document.open();
    el.contentWindow.document.write(content);
    el.contentWindow.document.close();
  }
  download() {
    generatePackage(this.state);
  }
  componentDidMount(){
    this.preview();
  }

}

export default App;
