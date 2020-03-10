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
			{ name: "Theme", value: this.props.theme, type: "select", options:["dark","lux","cerulean","cyborg","pulse","sketchy","superhero"], callback: (e) => {this.props.onConfigChange("theme", e.target.value)}},
			{ name: "Quest Type", value: this.props.theme, type: "select", options:["Symbol", "AlphaNumeric", "Pattern", "CombinationLock"], callback: (e) => {this.props.onConfigChange("mode", e.target.value)}}
		];

		let info;
		let escapp;
		if(this.props.mode === "CombinationLock"){
			info= <div>
					  <label htmlFor="CombinationLockImage"><b>Combination Lock Image: </b></label>
						<input name="CombinationLockImage:" type="file" value={undefined} onChange={(e) => {this.readFile(e.target.files[0], res => this.props.onConfigChange("CombinationLockImage", res),true)}}/>
						<br/><br/>
						<label htmlFor="answer"><b>Combination Lock Answer:</b></label>
					 	<input name="Answer:" type="text" value={this.props.answer} onChange={(e) => {this.props.onConfigChange("answer", e.target.value)}}/>
					 	<br/>
						</div>
		}
		if(this.props.mode === "Pattern"){
			info= <div>
					  <label htmlFor="tip"><b>Tip:</b> </label> 
						<input name="Tip:" type="text" value={this.props.tip} onChange={(e) => {this.props.onConfigChange("tip", e.target.value)}}/>
						</div>
		}
		if(this.props.escapp){
			escapp= <div><br/>
						<label htmlFor="puzzleId"><b>Puzzle Id:</b></label>&nbsp;
						<input name="puzzleId:" type="number" value={this.props.puzzleId} onChange={(e) => {this.props.onConfigChange("puzzleId", e.target.value)}}/>&nbsp;
						<label htmlFor="escapeRoomId"><b>Escape Room Id:</b></label>&nbsp;
						<input name="escapeRoomId:" type="number" value={this.props.escapeRoomId} onChange={(e) => {this.props.onConfigChange("escapeRoomId", e.target.value)}}/>
						<p/><label htmlFor="puzzleLength"><b>Answer Length:</b></label>&nbsp;
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
				{opt.type == "select" ? 
				<select name={opt.name} onChange={opt.callback}>
					{opt.options.map(op=><option value={op} selected={op===opt.value}>{this.humanize(op)}</option>)}
				</select>:
				<input name={opt.name} type={opt.type} value={opt.type === "file"? undefined: opt.value} min={opt.min} checked={opt.value} onChange={opt.callback}/>
				}
			</div>, opt.noBreak ? null: <br/>]

			})}
			<br/>
			{info}
			{escapp}

			
			<br/>
			<div className="form-group">
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
