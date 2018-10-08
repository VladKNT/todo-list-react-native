import React from 'react';
import { addDecorator } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

require('./components');
