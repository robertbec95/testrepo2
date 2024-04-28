const fetchStockData = async (symbols) => {
    const fetchedStockData = await Promise.all(
      symbols.map((symbol) =>
        fetch(`https://mcsbt-integration1.ew.r.appspot.com/stock/${symbol}`)
          .then((response) => response.json())
          .catch((error) => console.error('Error:', error))
      )
    );
  
    return fetchedStockData;
  };
  
  export default fetchStockData;