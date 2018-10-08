import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Button, Input } from '../../src/components/common';

storiesOf('Components', module)
  .add('Button', () => (
    <View style={{ padding: 10 }}>
      <Button>
        Button
      </Button>
    </View>
  ))
  .add('Input', () => (
    <View style={{ padding: 10 }}>
      <Input title={'Title'} />
    </View>
  ));
