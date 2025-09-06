import React, { useState, useEffect } from 'react';
import { fetchShareholdersData } from '../services/api';
import ShareholderTable from '../components/ShareholderTable';
import ShareholderChart from '../components/ShareholderChart';
import './ShareholderStructure.scss';

interface Shareholder {
    holder: string;
    share_percent: number;
}

const ShareholderStructure: React.FC = () => {
    const [data, setData] = useState<Shareholder[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        const today = new Date();
        setCurrentDate(today.toLocaleDateString('ru-RU'));

        const fetchData = async () => {
            try {
                const response = await fetchShareholdersData();
                const sberData: Array<{ holder: string; share_percent: string }> = response.SBER;

                const uniqueHolders = new Map<string, number>();
                sberData.forEach((item) => {
                    if (!uniqueHolders.has(item.holder)) {
                        uniqueHolders.set(item.holder, parseFloat(item.share_percent));
                    }
                });

                const processedData: Shareholder[] = Array.from(uniqueHolders, ([holder, share_percent]) => ({
                    holder,
                    share_percent,
                }));

                setData(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="shareholder-structure">
            <h2>Структура акционеров</h2>

            <div className="content-wrapper">
                <ShareholderTable data={data} onUpdateDate={currentDate} />
                <hr />
                <ShareholderChart data={data} />
            </div>
        </div>
    );
};

export default ShareholderStructure;
