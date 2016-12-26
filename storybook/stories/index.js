import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { storiesOf, action } from '@kadira/react-native-storybook'

import Welcome from './Welcome'
import CenterView from './decorators/CenterView'

import { Button, LikeButton, ReblogButton } from '../../components/Buttons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome />
  ))

import loginButtonStyles from './Button/styles'
storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default button', () => (
    <Button onPress={action('clicked-default-button')}>
      <Text style={loginButtonStyles.withText.text}>Click me!</Text>
    </Button>
  ))
  .add('Tumblr login button', () => (
    <Button
      style={StyleSheet.flatten(loginButtonStyles.withText.container)}
      onPress={action('clicked-button-with-icon')}>
      <EntypoIcon name='tumblr' color='white' style={loginButtonStyles.withText.text}>
        <Text> Log in to Tumblr </Text>
      </EntypoIcon>
    </Button>
  ))
  .add('like button', () => (
    <LikeButton onPress={action('clicked-button-with-icon')} />
  ))
  .add('reblog button', () => (
    <ReblogButton onPress={action('clicked-button-with-icon')} />
  ))

