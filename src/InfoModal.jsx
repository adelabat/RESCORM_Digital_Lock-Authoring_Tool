import React, { Component } from 'react';

export default class InfoModal extends Component {

	render(){
		return <div className={this.props.show ? "modal" : "modal hidden"}>
			<div className="overlay"/>
			<div className="modal-body">
				<button className="modal-close" onClick={this.props.hide}>
				  <i className="material-icons">close</i>
				</button>
				<h2>About</h2>
				<br style={{clear: 'both'}}/>
				<div className="modal-content">
				This website allows you to customize your very own lock application and generate a SCORM package so you can upload it to your preferred LMS.				<h4>Author</h4>
					<hr/>
					This project was developed by <a href="http://github.com/adelabat" rel="noopener noreferrer" target="_blank">@adelabat</a> using <a rel="noopener noreferrer" target="_blank" href="https://github.com/agordillo/RESCORM">RESCORM</a>.

					</div>
				</div>
			</div>
		}

}
