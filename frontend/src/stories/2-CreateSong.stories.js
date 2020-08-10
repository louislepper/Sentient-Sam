import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import 'react-awesome-button/dist/themes/theme-c137.css';

import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

// export const SingForMeBtn = () => (
  
// );


export const MainForm = () => (
  <form>
        <label>
          Sing me a song about:
          <input type="text"/>
        </label>
        <div>
          <AwesomeButton type="primary" onClick={action('clicked')}>Sing for me</AwesomeButton>
        </div>
  </form>
);