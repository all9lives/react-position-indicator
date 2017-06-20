import React, { Component } from 'react';

class ProgressBar extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			progress: 10,
			height: 1,
			position: null
		}

		this.updateWindowHeight = this.updateWindowHeight.bind(this);
		this.getViewPortPosition = this.getViewPortPosition.bind(this);
		this.getProgress = this.getProgress.bind(this);
		
	}

	componentDidMount() {
		this.updateWindowHeight();
		this.getViewPortPosition();
		this.getProgress();

		window.addEventListener('resize', () => {
			this.updateWindowHeight();
			this.getProgress();
		})
		
		window.addEventListener('scroll', () => {
			this.getViewPortPosition();
			this.getProgress();
		})
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowHeight);
	}

	updateWindowHeight() {
		let body = document.body,
				html = document.documentElement;

		let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
		this.setState({ height: height - window.innerHeight });
	}

	getViewPortPosition(){
		this.setState({ position: window.scrollY });
	}

	getProgress(){
		let progress =  parseInt((this.state.position / this.state.height) * 100, 10);
		this.setState({ progress:progress })
	}
 


  render() {

		let progressBarStyle = {
			background: this.props.color,
			position: 'fixed',
			top: 0,
			left: 0,
			right:0,
			width: this.state.progress + '%',
			height: this.props.height,
			WebkitTransition: 'all .2s ease-out',
			transition: 'all .2s ease-out'
		}


    return (
      <div className="ProgressBar">	
				<div className="progress-bar" style={ progressBarStyle }></div>
      </div>
    );
  }
}

ProgressBar.defaultProps = {
	color: 'purple',
	height: 10
}

export default ProgressBar;
