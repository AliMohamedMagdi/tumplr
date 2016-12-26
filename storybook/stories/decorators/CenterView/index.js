import React from 'react'
import { View } from 'react-native'
import style from './style'

export default function CenterView (props) {
  const { backgroundColor } = props
  return (
    <View style={[style.main, { backgroundColor }]}>
      {props.children}
    </View>
  )
}
