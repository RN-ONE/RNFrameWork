'use strict';

import {PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';

var iface = {
    name: 'ProgressView',
    propTypes: {
        color: PropTypes.color,
        ...View.propTypes // 包含默认的View的属性
    },
};

module.exports = requireNativeComponent('AndroidProgressView', iface);
