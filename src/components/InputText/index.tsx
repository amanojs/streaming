import * as React from 'react';
import { TextField } from '@material-ui/core';

export interface InputTextProps {
  /** ラベル */
  label: string;
  /**プレースホルダ */
  placeholder?: string;
  /** インプットテキストの値 */
  value: string;
  /** エラー状態 */
  error: boolean;
  /** エラー時に表示するメッセージ */
  msg: string;
  /** インプットテキストの値が変更されるたびに実行される処理 */
  onChange: (value: string) => void;
}

/** ラベル付きのインプットテキスト */
export const InputText: React.FC<InputTextProps> = (props: InputTextProps) => {
  return (
    <div>
      <div style={{ color: '#606060', padding: '0 0 3px 0', fontSize: '13px', fontWeight: 'bold' }}>{props.label}</div>
      <TextField
        fullWidth
        error={props.error}
        helperText={props.msg}
        variant="outlined"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        color="secondary"
        placeholder={props.placeholder}
      />
    </div>
  );
};
