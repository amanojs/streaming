import * as React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import './main.css';
import { DonutSmall } from '@material-ui/icons';

interface PresenterProps {
  socket: SocketIOClient.Socket;
  isOpen: boolean;
  smartphone?: boolean;
}

export const Presenter: React.FC<PresenterProps> = (props: PresenterProps) => {
  return (
    <React.Fragment>
      <div className="movieDetail">
        <div style={{ color: '#999', fontSize: '14px', paddingBottom: '4px' }}>now playing...</div>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <img
              src="https://i.ytimg.com/vi/yXZd7xVdpJ0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDHNimifYTYq87xR0I4wezrpY5taQ"
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
              優里 - ドライフラワー / THE FIRST TAKE
            </h4>
            <p style={{ margin: '0px', fontSize: '14px', color: '#8f8f8f' }}>amanojs がリクエスト</p>
          </Grid>
        </Grid>
      </div>
      <div className="movieList" style={{ height: props.isOpen ? '200px' : '0px' }}>
        <Grid
          container
          className="movies"
          alignItems="center"
          style={{ background: '#fff', borderBottom: '1px solid #eee' }}
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
              1
            </div>
            <img
              src="https://i.ytimg.com/vi/Qa9PkDZkyHg/maxresdefault.jpg"
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
              米津玄師 MV「メトロノーム」
            </h4>
            <p style={{ margin: '0px', fontSize: '14px', color: '#8f8f8f' }}>amanojs がリクエスト</p>
          </Grid>
        </Grid>

        {[0, 0, 0, 0, 0, 0, 0, 0].map((val, index) => {
          return (
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
                  {index + 2}
                </div>
                <img
                  src="https://i.ytimg.com/vi/bjhahucrOHM/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCCjgzCrFq1_QChnPFH523yY2fl7Q"
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
                  Mr.Children「タガタメ」from Stadium Tour 2015 未完
                </h4>
                <p style={{ margin: '0px', fontSize: '14px', color: '#8f8f8f' }}>amanojs がリクエスト</p>
              </Grid>
            </Grid>
          );
        })}
      </div>
    </React.Fragment>
  );
};
