import * as React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import './main.css';
import { DonutSmall } from '@material-ui/icons';
import { PlayListItem } from '.';

interface PresenterProps {
  socket: SocketIOClient.Socket;
  playList: PlayListItem[];
  isOpen: boolean;
  smartphone?: boolean;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  const playList = props.playList;
  const nowPlaying = playList[0];
  return (
    <React.Fragment>
      <div className="movieDetail">
        <div style={{ color: '#999', fontSize: '14px', paddingBottom: '4px' }}>now playing...</div>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <img
              src={nowPlaying.thumbnail}
              width="100%"
              alt="samune"
              style={{ objectFit: 'cover', verticalAlign: 'bottom' }}
            />
          </Grid>
          <Grid item xs={8}>
            <h4
              style={{
                margin: '0px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: '14px'
              }}
            >
              {nowPlaying.title}
            </h4>
            <p style={{ margin: '0px', fontSize: '14px', color: '#8f8f8f' }}>{nowPlaying.requester} がリクエスト</p>
          </Grid>
        </Grid>
      </div>
      <div className="movieList" style={{ height: props.isOpen ? '200px' : '0px' }}>
        {props.playList.map((movie, index) => {
          return index !== 0 ? (
            <Grid
              container
              className="movies"
              alignItems="center"
              style={{ background: '#fff', borderBottom: '1px solid #eee' }}
              key={index}
            >
              <Grid item xs={4} style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: '0 5px',
                    fontSize: '13px',
                    fontFamily: 'Noto Sans JP',
                    color: '#fff',
                    background: 'rgba(0,0,0,0.3)'
                  }}
                >
                  {index}
                </div>
                <img
                  src={movie.thumbnail}
                  width="100%"
                  alt="samu"
                  style={{ objectFit: 'cover', verticalAlign: 'bottom' }}
                />
              </Grid>
              <Grid item xs={8} style={{ padding: '0px 10px 0 10px' }}>
                <h4
                  style={{
                    margin: '0px',
                    fontSize: '14px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#3f3f3f'
                  }}
                >
                  {movie.title}
                </h4>
                <p style={{ margin: '0px', fontSize: '14px', color: '#8f8f8f' }}>{movie.requester} がリクエスト</p>
              </Grid>
            </Grid>
          ) : (
            false
          );
        })}
      </div>
    </React.Fragment>
  );
};
