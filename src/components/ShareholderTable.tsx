import React from 'react';
import './ShareholderTable.scss';
import { Table } from 'antd';

interface Shareholder {
    holder: string;
    share_percent: number;
}

interface ShareholderTableProps {
    data: Shareholder[];
    onUpdateDate: string;
}

const ShareholderTable: React.FC<ShareholderTableProps> = ({ data, onUpdateDate }) => {
    const dataSource = data.map((row, index) => {
        return {
            key: index + 1,
            holder: row.holder,
            share_percent: row.share_percent + ' %',
        };
    });

    const columns = [
        {
            title: 'Держатель акции',
            dataIndex: 'holder',
            key: 'holder',
            className: 'first-col',
        },
        {
            title: '% Доли',
            dataIndex: 'share_percent',
            key: 'share_percent',
            className: 'second-col',
        },
    ];

    return (
        <div className="table-container">
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                className="custom-table"
                rowClassName={() => 'custom-row'}
            />
            <div className="update-date">Дата последнего обновления этой структуры: {onUpdateDate}</div>
        </div>
    );
};

export default ShareholderTable;
