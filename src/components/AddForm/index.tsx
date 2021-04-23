import * as React from 'react';
import { Presenter } from './Presenter';

interface AddFormProps {
  socket: SocketIOClient.Socket;
}

export const AddForm: React.FC<AddFormProps> = (props: AddFormProps) => {
  const socket = props.socket;
  const [videoId, setVideoId] = React.useState('');

  const onChange = (value: string) => {
    setVideoId(value);
  };

  const addMovieHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('youtube_add_movie', videoId);
    setVideoId('');
  };

  return <Presenter {...{ videoId, onChange, addMovieHandler }} />;
};
