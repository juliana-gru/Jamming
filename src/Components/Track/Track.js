import React, { useState, useEffect, useRef } from 'react';
import './Track.css';

const Track = props => {
  const [preview, setPreview] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

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

	const handlePreview = () => {
    console.log('1');
    if (!props.track.preview) {
			document.querySelector('.preview').innerHTML = 'No preview available';
			return;
    }

    if (isPlaying) {
      preview.pause();
      setIsPlaying(false);
    } else {
      setPreview(new Audio(props.track.preview));
      setIsPlaying(true);      
    }		
  };
  
  useEffect(() => {
    console.log('2');
    if (!preview) return;
    preview.play();
  }, [preview]);

	return (
		<div className='Track'>
			<div className='Track-information' key>
				<h3>{props.track.name}</h3>
				<p>
					{props.track.artist} | {props.track.album}
				</p>
				<span className='preview' onClick={handlePreview}>
					Preview
					<audio src={props.track.preview}></audio>
				</span>
			</div>
			{renderAction()}
		</div>
	);
};

export default Track;
