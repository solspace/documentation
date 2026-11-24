import Player from 'react-player';

import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import type { ComponentType } from 'react';
import type { Props } from '@theme/Admonition';
import { DangerIcon, InfoIcon, TipIcon, WarningIcon } from './BannerIcons';

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

function withIcon(Admonition: ComponentType<Props>, Icon: ComponentType) {
  return function AdmonitionWithIcon(props: Props) {
    return <Admonition icon={<Icon />} {...props} />;
  };
}

const InfoAdmonition = withIcon(DefaultAdmonitionTypes.info, InfoIcon);

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  info: InfoAdmonition,
  note: InfoAdmonition,
  secondary: InfoAdmonition,
  important: withIcon(DefaultAdmonitionTypes.important, InfoIcon),
  warning: withIcon(DefaultAdmonitionTypes.warning, WarningIcon),
  caution: withIcon(DefaultAdmonitionTypes.caution, WarningIcon),
  danger: withIcon(DefaultAdmonitionTypes.danger, DangerIcon),
  tip: withIcon(DefaultAdmonitionTypes.tip, TipIcon),
  success: withIcon(DefaultAdmonitionTypes.success, TipIcon),
  youtube: YoutubeAdmonition,
};

export default AdmonitionTypes;
