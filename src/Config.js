import React, { Component } from 'react';

export default class App extends Component {

	render(){
		const options = [
			{ name: "title:", value: this.props.title, type: "text", callback: (e) => {this.props.onConfigChange("title", e.target.value)}},
			{ name: "showUsername",  noBreak: true, value: this.props.showUsername, type: "checkbox", callback: (e) => {this.props.onConfigChange("showUsername", !this.props.showUsername,)}},
			{ name: "timeout", friendlyName: "Timeout", value: this.props.timeout, type: "number", callback: (e) => {this.props.onConfigChange("timeout", parseInt(e.target.value))}},
			{ name: "successMessage:", value: this.props.good, type: "text", callback: (e) => {this.props.onConfigChange("good", e.target.value)}},
			{ name: "failMessage:", value: this.props.bad, type: "text", callback: (e) => {this.props.onConfigChange("bad", e.target.value)}},
			{ name: "Using Escapp??", value: this.props.escapp, type: "checkbox", callback: (e) => {this.props.onConfigChange("escapp", !this.props.escapp,)}},
		];

		let info;
		let escapp;
		if(this.props.mode === "CombinationLock"){
			info= <div>
					  <label htmlFor="CombinationLockImage"><b>CombinationLockImage:</b></label><p/>
						<input name="CombinationLockImage:" type="file" value={undefined} onChange={(e) => {this.readFile(e.target.files[0], res => this.props.onConfigChange("CombinationLockImage", res),true)}}/>
						<p/><label htmlFor="answer"><b>CombinationLockAnswer:</b></label><p/>
					 	<input name="Answer:" type="text" value={this.props.answer} onChange={(e) => {this.props.onConfigChange("answer", e.target.value)}}/>
						</div>
		}
		if(this.props.mode === "Pattern"){
			info= <div>
					  <label htmlFor="tip"><b>Tip:</b></label><p/>
						<input name="Tip:" type="text" value={this.props.tip} onChange={(e) => {this.props.onConfigChange("tip", e.target.value)}}/>
						</div>
		}
		if(this.props.escapp){
			escapp= <div><br/>
						<label htmlFor="puzzleId"><b>PuzzleId:</b></label>&nbsp;
						<input name="puzzleId:" type="number" value={this.props.puzzleId} onChange={(e) => {this.props.onConfigChange("puzzleId", e.target.value)}}/>&nbsp;
						<label htmlFor="escapeRoomId"><b>EscapeRoomId:</b></label>&nbsp;
						<input name="escapeRoomId:" type="number" value={this.props.escapeRoomId} onChange={(e) => {this.props.onConfigChange("escapeRoomId", e.target.value)}}/>
						<p/><label htmlFor="puzzleLength"><b>PuzzleLength:</b></label>&nbsp;
						<input name="puzzleLength:" type="number" value={this.props.puzzleLength} onChange={(e) => {this.props.onConfigChange("puzzleLength", e.target.value)}}/>
						</div>
		}else{
			if(this.props.mode === "Pattern" || "AlphaNumeric" || "Symbol"){
				escapp= <div>
				<p/><label htmlFor="answer"><b>Answer:</b></label><p/>
				<input name="Answer:" type="text" value={this.props.answer} onChange={(e) => {this.props.onConfigChange("answer", e.target.value)}}/></div>
			}

		}



		return <div className="config">
			{options.map(opt=>{
				return [<div className="form-group" >
				<label htmlFor={opt.name}><b>{opt.friendlyName || this.humanize(opt.name)}</b></label>
				<input name={opt.name} type={opt.type} value={opt.type === "file"? undefined: opt.value} min={opt.min} checked={opt.value} onChange={opt.callback}/>
			</div>, opt.noBreak ? null: <br/>]
			})}

			<div className="form-group">
				<label htmlFor="mode"><b>Quest Type:</b></label><p/>
				<label htmlFor="mode">{"Symbol"}</label>
				<input name="mode" type="radio" value={"Symbol"} checked={this.props.mode === "Symbol"} onChange={(e) => {this.props.onConfigChange("mode", "Symbol")}}/>
				<label htmlFor="mode">{"AlphaNumeric"}</label>
				<input name="mode" type="radio" value={"AlphaNumeric"} checked={this.props.mode === "AlphaNumeric"} onChange={(e) => {this.props.onConfigChange("mode", "AlphaNumeric")}}/>
				<p/><label htmlFor="mode">{"Pattern"}</label>
				<input name="mode" type="radio" value={"Pattern"} checked={this.props.mode === "Pattern"} onChange={(e) => {this.props.onConfigChange("mode", "Pattern")}}/>
				<label htmlFor="mode">{"CombinationLock"}</label>
				<input name="mode" type="radio" value={"CombinationLock"} checked={this.props.mode === "CombinationLock"} onChange={(e) => {this.props.onConfigChange("mode", "CombinationLock")}}/>
			</div>
			<p/>
			{info}
			{escapp}



			<div className="form-group">
				<label htmlFor="theme"><b>Theme:</b></label><p/>
				<label htmlFor="theme">{"Dark"}</label>
				<input name="theme" type="radio" value={"dark"} checked={this.props.theme === "dark"} onChange={(e) => {this.props.onConfigChange("theme", "dark")}}/>
				<label htmlFor="theme">{"Lux"}</label>
				<input name="theme" type="radio" value={"lux"} checked={this.props.theme === "lux"} onChange={(e) => {this.props.onConfigChange("theme", "lux")}}/>
				<label htmlFor="theme">{"Cerulean"}</label>
				<input name="theme" type="radio" value={"cerulean"} checked={this.props.theme === "cerulean"} onChange={(e) => {this.props.onConfigChange("theme", "cerulean")}}/>
				<label htmlFor="theme">{"Cyborg"}</label>
				<input name="theme" type="radio" value={"cyborg"} checked={this.props.theme === "cyborg"} onChange={(e) => {this.props.onConfigChange("theme", "cyborg")}}/>
				<label htmlFor="theme">{"Pulse"}</label>
				<input name="theme" type="radio" value={"pulse"} checked={this.props.theme === "pulse"} onChange={(e) => {this.props.onConfigChange("theme", "pulse")}}/>
				<label htmlFor="theme">{"Sketchy"}</label>
				<input name="theme" type="radio" value={"sketchy"} checked={this.props.theme === "sketchy"} onChange={(e) => {this.props.onConfigChange("theme", "sketchy")}}/>
				<label htmlFor="theme">{"Superhero"}</label>
				<input name="theme" type="radio" value={"superhero"} checked={this.props.theme === "superhero"} onChange={(e) => {this.props.onConfigChange("theme", "superhero")}}/>

				<br/><br/>
				<select name="menu">
				  <option name="theme" value={"dark"} checked={this.props.theme === "dark"} onChange={(e) => {this.props.onConfigChange("theme", "dark")}}> Dark </option>
				  <option name="theme" value={"lux"} checked={this.props.theme === "lux"} onChange={(e) => {this.props.onConfigChange("theme", "lux")}}> Lux </option>
					<option name="theme" value={"cerulean"} checked={this.props.theme === "cerulean"} onChange={(e) => {this.props.onConfigChange("theme", "cerulean")}}> Cerulean </option>
					<option name="theme" value={"cyborg"} checked={this.props.theme === "cyborg"} onChange={(e) => {this.props.onConfigChange("theme", "cyborg")}}> Cyborg </option>
					<option name="theme" value={"pulse"} checked={this.props.theme === "pulse"} onChange={(e) => {this.props.onConfigChange("theme", "pulse")}}> Pulse </option>
					<option name="theme" value={"sketchy"} checked={this.props.theme === "sketchy"} onChange={(e) => {this.props.onConfigChange("theme", "sketchy")}}> Sketchy </option>
					<option name="theme" value={"superhero"} checked={this.props.theme === "superhero"} onChange={(e) => {this.props.onConfigChange("theme", "superhero")}}> Superhero </option>
				</select>
			</div>
			<div className="form-group"><br/>
				<label htmlFor="scormVersion"><b>SCORM Version:</b></label><p/>
				<label htmlFor="scormVersion">{"SCORM 1.2"}</label>
				<input name="scormVersion" type="radio" value={"1.2"} checked={this.props.scormVersion === "1.2"} onChange={(e) => {this.props.onConfigChange("scormVersion", "1.2")}}/>
				<label htmlFor="scormVersion">{"SCORM 2004"}</label>
				<input name="scormVersion" type="radio" value={"1.2"} checked={this.props.scormVersion === "2004"} onChange={(e) => {this.props.onConfigChange("scormVersion", "2004")}}/>

			</div>


		</div>
	}

	readFile(file, callback, isImage) {
		try {
			const reader = new FileReader()
			reader.onload = event => callback(event.target.result);
			reader.onerror = error => callback("");
			reader.readAsDataURL(file);
		} catch (e) {
			callback("");
		}

	}

	humanize(str) {
		return str
		    .replace(/([A-Z])/g, ' $1')
		    .replace(/^./, function(str){ return str.toUpperCase(); })
	}
}
