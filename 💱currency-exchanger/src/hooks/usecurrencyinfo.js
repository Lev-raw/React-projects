import { useEffect, useState } from 'react';

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`);
                const result = await response.json();
                setData(result[currency] || {});
            } catch (error) {
                console.error('Failed to fetch currency data:', error);
                setData({});
            }
        };

        if (currency) {
            fetchCurrencyData();
        }
    }, [currency]);

    return data;
}

export default useCurrencyInfo;