import * as React from 'react';
import { useSnackbar } from 'notistack';
import { Presenter } from './Presenter';

/**
 * URLをクリップボードにコピーするボタン
 */
export const CopyRoomIdButton: React.FC = () => {
  const [url] = React.useState<string>(window.location.href);
  const urlInputRef = React.useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const onClick = (): void => {
    // 選択
    console.log(!!urlInputRef.current);
    urlInputRef.current?.select();

    // クリップボードにコピー
    document.execCommand('copy');

    // 通知
    enqueueSnackbar('招待URLをコピーしました。', {
      variant: 'info',
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
      autoHideDuration: 2000
    });
  };
  return <Presenter url={url} inputRef={urlInputRef} onClick={onClick} />;
};
