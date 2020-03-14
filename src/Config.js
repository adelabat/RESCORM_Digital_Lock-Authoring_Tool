import React, { Component } from 'react';

export default class App extends Component {

	render(){
		const options = [
			{ name: "title:", value: this.props.title, type: "text", callback: (e) => {this.props.onConfigChange("title", e.target.value)}},
			{ name: "showUsername",  noBreak: true, value: this.props.showUsername, type: "checkbox", callback: (e) => {this.props.onConfigChange("showUsername", !this.props.showUsername,)}},
			{ name: "Timeout", friendlyName: "Timeout", value: this.props.timeout, type: "number", min: 0, callback: (e) => {this.props.onConfigChange("timeout", parseInt(e.target.value))}},
			{ name: "Theme", value: this.props.theme, type: "select", options: ["cerulean", "journal", "sketchy", "darkly", "cyborg", "cosmo", "flatly", "lumen", "litera", "lux", "materia", "minty", "pulse", "sandstone", "simplex", "slate", "solar", "spacelab", "superhero", "united", "yeti"], callback: (e) => {this.props.onConfigChange("theme", e.target.value)}},
			{ name: "Puzzle Type", value: this.props.theme, type: "select", options:["Symbol", "AlphaNumeric", "Pattern", "CombinationLock", "Padlock"], callback: (e) => {this.props.onConfigChange("mode", e.target.value)}},
			{ name: "Tip", value: this.props.tip, type: "text", callback: (e) => {this.props.onConfigChange("tip", e.target.value)}},
			{ name: "Using Escapp??", value: this.props.escapp, type: "checkbox", callback: () => {this.props.onConfigChange("escapp", !this.props.escapp)}},
		];

		if (this.props.escapp) { 
			options.push({ name: "EscapeRoomId", friendlyName: "Escape Room Id", value: this.props.escapeRoomId, type: "number", min: 0, callback: (e) => {this.props.onConfigChange("escapeRoomId", parseInt(e.target.value))}})
			options.push({ name: "PuzzleId", friendlyName: "Puzzle Id", value: this.props.puzzleId, type: "number", min: 0, callback: (e) => {this.props.onConfigChange("puzzleId", parseInt(e.target.value))}})
			if (this.props.mode === "Padlock" || this.props.mode === "CombinationLock") {
				options.push({ name: "Solution", value: this.props.answer, type: "text", callback: (e) => {this.props.onConfigChange("answer", e.target.value)}});
			} else {
				options.push({ name: "PuzzleLength", friendlyName: "Puzzle Length", value: this.props.puzzleLength, type: "number", min: 0, callback: (e) => {this.props.onConfigChange("puzzleLength", parseInt(e.target.value))}})
			}
		} else {
			options.push({ name: "Solution", value: this.props.answer, type: "text", callback: (e) => {this.props.onConfigChange("answer", e.target.value)}});
			options.push({ name: "Success Message:", value: this.props.good, type: "text", callback: (e) => {this.props.onConfigChange("good", e.target.value)}});
			options.push({ name: "Fail Message:", value: this.props.bad, type: "text", callback: (e) => {this.props.onConfigChange("bad", e.target.value)}});
		}
		if (this.props.mode === "CombinationLock") {
			options.splice(5, 0, { name: "CombinationLockImage", value: undefined, type: "file", callback: (e) => {this.readFile(e.target.files[0], res => this.props.onConfigChange("CombinationLockImage", res),true) }});
		} else if (this.props.mode === "Padlock") {
			options.splice(5, 0, { name: "Metalic effect", value: !this.props.nonMetallic, type: "checkbox", callback: () => {this.props.onConfigChange("nonMetallic", !this.props.nonMetallic)}});
		}


		return <div className="config">
			{options.map((opt, i)=>{
				return opt ? [<div className="form-group" key={opt.name}>
				<label htmlFor={opt.name}><b>{opt.friendlyName || this.humanize(opt.name)}</b></label>
				{opt.type === "select" ?
				<select name={opt.name} onChange={opt.callback} value={opt.value}>
					{opt.options.map(op=><option key={op} value={op} >{this.humanize(op)}</option>)}
				</select>:
				<input name={opt.name} type={opt.type} value={opt.type === "file"? undefined: opt.value} min={opt.min} checked={opt.value} onChange={opt.callback}/>
				}
			</div>, opt.noBreak ? null: <br key={"br-"+i}/>] : null

			})}
			<br/>

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
