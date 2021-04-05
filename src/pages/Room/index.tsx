import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import roomModule, { RoomState } from '../../store/modules/roomModule';
import { State } from '../../store/store';
import { Presenter } from './Presenter';
import { PageProps } from '../../App';

const Room: React.FC<PageProps> = (props: PageProps) => {
  const [mount, mountKeeper] = React.useState(null);
  const room = useSelector((state: State) => state.room);
  const dispach = useDispatch();
  console.log(room);

  React.useEffect(() => {
    if (!room.roomId) {
      const socket = io.connect(process.env.REACT_APP_API_URL as string);
      socket.on('connect', () => {
        console.log('connected');
        dispach(roomModule.actions.setRoom({ roomId: 'iii' }));
      });
    }
  }, [mountKeeper]);

  return <Presenter />;
};

export default Room;
