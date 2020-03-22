import React, { Component } from 'react';
import i18n from './locales/i18n';

export default class App extends Component {

	render(){
		const options = [
			{ name: "title", value: this.props.title, type: "text", callback: (e) => {this.props.onConfigChange("title", e.target.value)}},
			{ name: "timeout", value: this.props.timeout, type: "number", min: 0, callback: (e) => {this.props.onConfigChange("timeout", parseInt(e.target.value))}},
			{ name: "theme", value: this.props.theme, type: "select", options: ["cerulean", "journal", "sketchy", "darkly", "cyborg", "cosmo", "flatly", "lumen", "litera", "lux", "materia", "minty", "pulse", "sandstone", "simplex", "slate", "solar", "spacelab", "superhero", "united", "yeti"], callback: (e) => {this.props.onConfigChange("theme", e.target.value)}},
			{ name: "mode", value: this.props.mode, type: "select", options:["Symbol", "AlphaNumeric", "Pattern", "CombinationLock", "Padlock"], callback: (e) => {
				this.props.onConfigChange("mode", e.target.value);
				if (this.props.embeddedInEscapp) {
					const erId = this.props.escapeRoomId || this.props.erOptions[0].id;
					const puzzle = this.props.puzzleOptions[erId][0];
					const puzzleId = puzzle.id;

					this.props.onConfigChange("escapeRoomId", erId)
					this.props.onConfigChange("puzzleId", puzzleId)
					if (this.props.mode === "Padlock" || this.props.mode === "CombinationLock") {
						this.props.onConfigChange("answer", puzzle.answer);
					} else {
						this.props.onConfigChange("puzzleLength", puzzle.answer.length);
						this.props.onConfigChange("answer", undefined);
					}
				}
			}},
			{ name: "tip", value: this.props.tip, type: "text", callback: (e) => {this.props.onConfigChange("tip", e.target.value)}},
		];


		if (this.props.escapp) { 
			if (this.props.embeddedInEscapp) {
				options.push({ name: "escapp", value: this.props.escapp, type: "checkbox", callback: () => {this.props.onConfigChange("escapp", !this.props.escapp)}});
				options.push({ name: "escapeRoomId",  value: this.props.escapeRoomId || this.props.erOptions[0].id, type: "select", options: this.props.erOptions || [], callback: (e) => {
					const erId = parseInt(e.target.value)
					const puzzle = this.props.puzzleOptions[erId][0];
					const puzzleId = puzzle.id;

					this.props.onConfigChange("escapeRoomId", erId)
					this.props.onConfigChange("puzzleId", puzzleId)
					if (this.props.mode === "Padlock" || this.props.mode === "CombinationLock") {
						this.props.onConfigChange("answer", puzzle.answer);
					} else {
						this.props.onConfigChange("puzzleLength", puzzle.answer.length);
						this.props.onConfigChange("answer", undefined);

					}

				}});
				options.push({ name: "puzzleId", friendlyName: "puzzleId", value: this.props.puzzleId || this.props.puzzleOptions[this.props.escapeRoomId || this.props.erOptions[0].id][0].id, type: "select", options: this.props.puzzleOptions[this.props.escapeRoomId] || [], callback: (e) => {
					const puzzleId = parseInt(e.target.value);
					this.props.onConfigChange("puzzleId", puzzleId);
					const puzzle = this.props.puzzleOptions[this.props.escapeRoomId || this.props.erOptions[0].id].find(p=>p.id === puzzleId);
					if (this.props.mode === "Padlock" || this.props.mode === "CombinationLock") {
						this.props.onConfigChange("answer", puzzle.answer);
					} else {
						this.props.onConfigChange("puzzleLength", puzzle.answer.length);
						this.props.onConfigChange("answer", undefined);

					}
				}});
			} else {
				options.push({ name: "escapeRoomId", value: this.props.escapeRoomId, type: "number", min: 0, callback: (e) => {this.props.onConfigChange("escapeRoomId", parseInt(e.target.value))}})
				options.push({ name: "puzzleId", value: this.props.puzzleId, type: "number", min: 0, callback: (e) => {this.props.onConfigChange("puzzleId", parseInt(e.target.value))}})
				if (this.props.mode === "Padlock" || this.props.mode === "CombinationLock") {
					options.push({ name: "answer", value: this.props.answer, type: "text", callback: (e) => {this.props.onConfigChange("answer", e.target.value)}});
				} else {
					options.push({ name: "puzzleLength", value: this.props.puzzleLength, type: "number", min: 0, callback: (e) => {this.props.onConfigChange("puzzleLength", parseInt(e.target.value))}})
					
				}
			}
			
		} else {
			options.push({ name: "escapp", value: this.props.escapp, type: "checkbox", callback: () => {this.props.onConfigChange("escapp", !this.props.escapp)}});
			options.push({ name: "showUsername", value: this.props.escapp ? false : this.props.showUsername , type: "checkbox", callback: (e) => {this.props.onConfigChange("showUsername", !this.props.showUsername,)}});
			options.push({ name: "answer", value: this.props.answer, type: "text", callback: (e) => {this.props.onConfigChange("answer", e.target.value)}});
			options.push({ name: "good", value: this.props.good, type: "text", callback: (e) => {this.props.onConfigChange("good", e.target.value)}});
			options.push({ name: "bad", value: this.props.bad, type: "text", callback: (e) => {this.props.onConfigChange("bad", e.target.value)}});
		}
		if (this.props.mode === "CombinationLock") {
			options.splice(5, 0, { name: "CombinationLockImage", value: undefined, type: "file", callback: (e) => {this.readFile(e.target.files[0], res => this.props.onConfigChange("CombinationLockImage", res),true) }});
		} else if (this.props.mode === "Padlock") {
			options.splice(5, 0, { name: "nonMetallic", value: !this.props.nonMetallic, type: "checkbox", callback: () => {this.props.onConfigChange("nonMetallic", !this.props.nonMetallic)}});
		}


		return <div className="config">
			{options.map((opt, i)=>{
				return opt ? [<div className="form-group" key={opt.name}>
				<label htmlFor={opt.name}><b>{i18n.t("config." + opt.name)}</b></label>
				{opt.type === "select" ?
				<select name={opt.name} onChange={opt.callback} value={opt.value}>
					{opt.options.map(op=>{
						if (typeof op === "string") {

							return <option key={op} value={op} >{i18n.t(op)}</option>
						} else {
							return <option key={op.id} value={op.id} >{op.name}</option>

						}
				})}
				</select>:
				<input name={opt.name} type={opt.type} value={opt.type === "file"? undefined: opt.value} min={opt.min} checked={opt.value} onChange={opt.callback}/>
				}
			</div>, opt.noBreak ? null: <br key={"br-"+i}/>] : null

			})}
			<br/>

			<br/>
			{this.props.embeddedInEscapp && this.props.escapp ? null : <div className="form-group">
				<label htmlFor="scormVersion"><b>{i18n.t("scormVersion")}:</b></label><p/>
				<label htmlFor="scormVersion">{"SCORM 1.2"}</label>
				<input name="scormVersion" type="radio" value={"1.2"} checked={this.props.scormVersion === "1.2"} onChange={(e) => {this.props.onConfigChange("scormVersion", "1.2")}}/>
				<label htmlFor="scormVersion">{"SCORM 2004"}</label>
				<input name="scormVersion" type="radio" value={"1.2"} checked={this.props.scormVersion === "2004"} onChange={(e) => {this.props.onConfigChange("scormVersion", "2004")}}/>
			</div>}
		</div>
	}

	readFile(file, callback) {
		try {
			const reader = new FileReader()
			reader.onload = event => callback(event.target.result);
			reader.onerror = error => callback("");
			reader.readAsDataURL(file);
		} catch (e) {
			callback("");
		}
	}
}
