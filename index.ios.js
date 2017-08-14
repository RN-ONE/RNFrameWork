/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';
import Index from './app/Index';

export default class FrameWork extends Component {
    render() {
        return (
            <Index/>
        )
    }
}


AppRegistry.registerComponent('FrameWork', () => FrameWork);
