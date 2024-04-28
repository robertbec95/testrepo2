// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const UserStocks = ({ userId }) => {
//     const [userStocks, setUserStocks] = useState(null);
//
//     useEffect(() => {
//
//     axios.get(`http://127.0.0.1:5000/user/${userId}`, {
//     withCredentials: true  // This needs to be set if your backend uses sessions
//     })
//     .then(response => {
//     console.log(response.data);
//     })
//     .catch(error => {
//     console.error('Error fetching data:', error);
// });
//
//
//     }, [userId]);
//
//
//
//     if (!userStocks) {
//         return <div>Loading user stocks...</div>;
//     }
//
//     return (
//         <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px' }}>
//             {userStocks.symbols.map((symbol, index) => (
//                 <div key={symbol} style={{ margin: 10, border: '1px solid black', padding: 20 }}>
//                     <h4>{symbol}</h4>
//                     <p>Weight: {userStocks.weights[index]}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
//
// export default UserStocks;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserStocks = ({ userId }) => {
    const [userStocks, setUserStocks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://mcsbt-integration1.ew.r.appspot.com/user/${userId}`, {
            withCredentials: true
        })
        .then(response => {
            setUserStocks(response.data); // Set the userStocks state to the entire response data
            setLoading(false); // Indicate that the loading process is complete
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(error); // Store any error that occurred during fetching
            setLoading(false);
        });
    }, [userId]);

    if (loading) {
        return <div>Loading user stocks...</div>;
    }

    if (error) {
        return <div>Error loading user stocks. Please try again later.</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px' }}>
                {userStocks.holdings.map((holding, index) => (
                    <div key={index} style={{ margin: 10, border: '1px solid black', padding: 20 }}>
                        <h4>{holding.symbol}</h4>
                        <p>Stock Value: ${holding.stock_value.toFixed(2)}</p> {/* Format the stock value to 2 decimal places */}
                    </div>
                ))}
            </div>
            <div style={{ padding: 20 }}>
                <h3>Total Stock Value: ${userStocks.total_stock_value.toFixed(2)}</h3> {/* Display the total stock value */}
            </div>
        </div>
    );
};

export default UserStocks;