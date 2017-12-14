'use strict';

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
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
    pickerData: PropTypes.array,
    selectedValue: PropTypes.any
  }

  static defaultProps = {
    pickerData: []
  }

  render() {
    const { onValueChange, pickerData, itemStyle, style, ...props } = this.props
    var viewHeight = (style && style.height) || styles.picker.height;
    var fontSize = (itemStyle && itemStyle.fontSize) || styles.picker__item.fontSize;
    var calcHeight = (viewHeight / 2) - fontSize;
    return (
      <View style={outerStyles.container}>
        <View style={[outerStyles.blanker, outerStyles.top, {
          height: calcHeight,
          width: (style && style.width) || styles.picker.width
        }]} />
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
          {pickerData.map((data, index) => (
              <PickerItem key={index} value={parseInt('undefined' === typeof(data.value)? data: data.value)} label={('undefined' === typeof(data.label)? data: data.label).toString()} />
            )
          )}
        </WheelCurvedPicker>
        <View style={[outerStyles.blanker, outerStyles.bottom, calcHeight]} />
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