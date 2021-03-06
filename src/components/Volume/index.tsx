import * as React from 'react';
import { Presenter } from './Presenter';

export interface VolumeProps {
  isMute: boolean;
  volume: number;
  onChange: (e: React.ChangeEvent<any>, value: number | number[]) => void;
  onClick: () => void;
}

export const Volume: React.FC<VolumeProps> = (props: VolumeProps) => {
  /** スマートフォンからのアクセスかどうかの判定 */
  const isSmartPhone = (): boolean => {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Presenter
      onClick={props.onClick}
      onChange={props.onChange}
      isMute={props.isMute}
      volume={props.volume}
      isSmartPhone={isSmartPhone}
    />
  );
};
