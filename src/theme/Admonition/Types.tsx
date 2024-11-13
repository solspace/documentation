import Player from 'react-player';

import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

function YoutubeAdmonition(props) {
  return (
    <div className="text-sm text-gray-400 flex flex-wrap gap-2">
      <div className="border-[#6f42c1] border-2 border-solid rounded-[10px] w-full player-wrapper">
        <Player
          width="100%"
          height="100%"
          className="react-player"
          url={`https://www.youtube.com/watch?v=${props.title}`}
        />
      </div>
      {props.children}
    </div>
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,

  // Add all your custom admonition types here...
  // You can also override the default ones if you want
  youtube: YoutubeAdmonition,
};

export default AdmonitionTypes;
