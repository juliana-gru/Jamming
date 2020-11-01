import React from 'react';
import './Track.css';

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
	const addTrack = () => onAdd(track);
	const removeTrack = () => onRemove(track);

	const renderAction = () => {
		return isRemoval ? (
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
		if (!track.preview) {
			e.target.innerText = 'No preview available';
			return;
		}
		
		const audioElement = e.target.parentNode.querySelector("audio");

		if (audioElement.paused) {			
			audioElement.play();
			e.target.innerText = 'Click to pause';
		}	
		else {
			audioElement.pause();
			e.target.innerText = 'Preview'
		}					
	}

	return (
		<div className='Track'>
			<div className='Track-information' key>
				<h3>{track.name}</h3>
				<p>
					{track.artist} | {track.album}
				</p>
				<div className='preview' onClick={handlePreview}>					
					<audio src={track.preview}>Audio not supported</audio>
					<span>Preview</span>
				</div>
			</div>
			{renderAction()}
		</div>
	);
};

export default Track;
