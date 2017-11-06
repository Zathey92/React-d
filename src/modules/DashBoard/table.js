import React, { Component } from 'react';
import {css, StyleSheet} from 'aphrodite';
import { Table } from 'antd';
import 'antd/lib/table/style/css.js';

class DashTable extends Component {






    render() {
        const columns = [
            { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
            { title: 'Column 1', dataIndex: 'address', key: '1' },
            { title: 'Column 2', dataIndex: 'address', key: '2' },
            { title: 'Column 3', dataIndex: 'address', key: '3' },
            { title: 'Column 4', dataIndex: 'address', key: '4' },
            { title: 'Column 5', dataIndex: 'address', key: '5' },
            { title: 'Column 6', dataIndex: 'address', key: '6' },
            { title: 'Column 7', dataIndex: 'address', key: '7' },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => <a href="">action</a>,
            },
        ];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
        }];


        return (
            <div className={css(styles.co)}>
                <Table columns={columns} dataSource={data} scroll={{ x: 1200}} />
            </div>
        );
    }
}
const styles = StyleSheet.create({
    co: {

        width:'100%',
    },

});
export default DashTable;