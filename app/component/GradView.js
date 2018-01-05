/**
 * @Author:hgq
 * @Date:2017/11/22
 * @Describe:
 */
import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ListView, ViewPropTypes} from 'react-native';

const propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    style: ViewPropTypes.style,
    itemsPerRow: PropTypes.number,
    onEndReached: PropTypes.func,
    scrollEnabled: PropTypes.func,
    pageSize: PropTypes.number
};

const GridView = ({
                      items,
                      renderItem,
                      style,
                      itemsPerRow,
                      onEndReached,
                      scrollEnabled,
                      pageSize
                  }) => {
    const groupItems = (renderItems, renderItemsPerRow) => {
        const itemsGroups = [];
        let group = [];
        renderItems.forEach((item) => {
            if (group.length === renderItemsPerRow) {
                itemsGroups.push(group);
                group = [item];
            } else {
                group.push(item);
            }
        });
        if (group.length > 0) {
            itemsGroups.push(group);
        }
        return itemsGroups;
    };

    const renderGroup = (group, sectionID, rowID) => {
        let itemViews = [];
        for (let i = 0; i < group.length; i++) {
            itemViews.push(renderItem(group[i], i + rowID * itemsPerRow + 1));
        }

        return <View style={styles.group}>{itemViews}</View>;
    };

    const groups = groupItems(items, itemsPerRow);

    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
        <ListView
            initialListSize={1}
            dataSource={ds.cloneWithRows(groups)}
            renderRow={renderGroup}
            style={style}
            onEndReached={onEndReached}
            scrollEnabled={scrollEnabled}
            pageSize={pageSize || 1}
            enableEmptySections
        />
    );
};

const styles = StyleSheet.create({
    group: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

GridView.propTypes = propTypes;

GridView.defaultProps = {
    items: [],
    renderItem: null,
    style: undefined,
    itemsPerRow: 1,
    onEndReached: undefined
};

export default GridView;