import React from 'react';
import './Track.css';

const Track = props => {
	const addTrack = () => props.onAdd(props.track);
	const removeTrack = () => props.onRemove(props.track);

	const renderAction = () => {
		return props.isRemoval ? (
			<button className='Track-action' onClick={removeTrack}>
				-
			</button>
		) : (
			<button className='Track-action' onClick={addTrack}>
				+
			</button>
		);
	};
	
	const handlePreview = e => {	
		if (!props.track.preview) {
			e.target.children[1].innerText = 'No preview available';
			return;
		}
		if (e.target.parentNode.firstChild.paused) {
			e.target.parentNode.firstChild.play();
			e.target.innerText = 'Click to pause';
		}	
		else {
			e.target.parentNode.firstChild.pause();
			e.target.innerText = 'Preview'
		}					
	}

	return (
		<div className='Track'>
			<div className='Track-information' key>
				<h3>{props.track.name}</h3>
				<p>
					{props.track.artist} | {props.track.album}
				</p>
				<div className='preview' onClick={handlePreview}>					
					<audio src={props.track.preview}>Audio not supported</audio>
					<span>Preview</span>
				</div>
			</div>
			{renderAction()}
		</div>
	);
};

export default Track;
