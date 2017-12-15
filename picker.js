'use strict';

import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'
import WheelCurvedPicker from './WheelCurvedPicker'
const PickerItem = WheelCurvedPicker.Item
import _ from 'lodash'

const styles = {
  picker: {
    backgroundColor: '#d3d3d3',
    height: 220,
    width: 50
  },
  picker__item: {
    color: '#333333',
    fontSize: 26
  }
}

export const Item = PickerItem

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.selectedValue
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedValue !== this.props.selectedValue) {
      this.setState({
        selectedValue: nextProps.selectedValue
      })
    }
  }

  static propTypes = {
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.any
  }

  render() {
    const { onValueChange, itemStyle, style, children, ...props } = this.props
    var viewHeight = (style && style.height) || styles.picker.height;
    var fontSize = (itemStyle && itemStyle.fontSize) || styles.picker__item.fontSize;
    var calcHeight = (viewHeight / 2) - (fontSize / 3.5);
    return (
      <View style={outerStyles.container}>
        <WheelCurvedPicker
          {...props}
          style={[styles.picker, style]}
          itemStyle={_.assign({}, styles.picker__item, itemStyle)}
          selectedValue={this.state.selectedValue}
          onValueChange={(value) => {
            this.setState({ selectedValue: value })
            onValueChange && onValueChange( value )
          }}
        >
          {children}
        </WheelCurvedPicker>
        {Platform.OS === 'android'? (
          <View pointerEvents={'none'} style={[outerStyles.blanker, outerStyles.top, {
            height: calcHeight,
            width: (style && style.width) || styles.picker.width
          }]} />
        ): null}
        {Platform.OS === 'android'? (
          <View pointerEvents={'none'} style={[outerStyles.blanker, outerStyles.bottom, {
            height: calcHeight,
            width: (style && style.width) || styles.picker.width
          }]} />
        ): null}
      </View>
    )
  }

  getValue() {
    return this.state.selectedValue
  }
}

const outerStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch'
  },
  blanker: {
    backgroundColor: 'white',
    opacity: 0.7,
    position: 'absolute'
  },
  top: {
    top: 0,
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 1
  },
  bottom: {
    bottom: 0,
    borderTopColor: '#aaaaaa',
    borderTopWidth: 1
  }
});