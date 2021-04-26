import * as React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../store/modules/roomModule';
import { State } from '../../store/store';
import { Presenter } from './Presenter';

export const UserList: React.FC = () => {
  const userList: User[] = useSelector((state: State) => state.room.userList);
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const userListMock = (): User[] => {
  //   const list: User[] = [];
  //   for (let i = 0; i < 100; i++) {
  //     list.push({ id: `id${i}`, name: `user${i}` });
  //   }
  //   return list;
  // };

  /** 画面幅を取得 */
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  /** 画面サイズの変更を検知 */
  React.useEffect(() => {
    window.addEventListener(`resize`, updateWidth, {
      capture: false,
      passive: true
    });

    return () => window.removeEventListener(`resize`, updateWidth);
  }, []);

  /** 画面サイズの判定 */
  const isSmallScreen = (): boolean => {
    return width <= 900;
  };

  /** クリック時の処理 */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /** 閉じる処理 */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Presenter
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
      userList={userList}
      isSmallScreen={isSmallScreen}
    />
  );
};
