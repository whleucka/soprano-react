import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Shuffle,
    Repeat
} from 'react-feather';

const PlayerControls = () => {
  return (
  <section id="player-controls">
      <button className="btn"><Shuffle /></button>
      <button className="btn"><SkipBack /></button>
      <button className="btn"><Play /></button>
      <button className="btn"><SkipForward /></button>
      <button className="btn"><Repeat /></button>
  </section>
  );
};

export default PlayerControls;
