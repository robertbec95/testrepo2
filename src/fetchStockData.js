const fetchStockData = async (symbols) => {
    const fetchedStockData = await Promise.all(
      symbols.map((symbol) =>
        fetch(`http://localhost:5000/stock/${symbol}`)
          .then((response) => response.json())
          .catch((error) => console.error('Error:', error))
      )
    );
  
    return fetchedStockData;
  };
  
  export default fetchStockData;