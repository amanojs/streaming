import * as React from 'react';
import { Presenter } from './Presenter';

export interface ContainerProps {
  width: string;
}

export const CreateForm: React.FC<ContainerProps> = (props: ContainerProps) => {
  return <Presenter width={props.width} />;
};
