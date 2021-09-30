import './App.css';
import {useState, useEffect} from 'react';
import Details from './Details.js';


function App() {
  const URL = 'https://newsapi.org/v2'
  const APIKEY = '43b63cdb1def4c3685d9107731a2fbf5';

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // valittu uutinen

  useEffect(() => {
    const criteria = 'top-headlines?country=us&catecory=entertainment';
    const address = URL + '/' + criteria + '&apikey=' + APIKEY;

    fetch(address)
    .then (res => res.json())
    .then (
      (result) => {
        setError(null);
        setIsLoaded(true);
        if (typeof result.articles === 'undefined') {
          setError({"message" : "Error retrieving news"});
        } else {
          setItems(result.articles);
        }
      }, (error) => {
        setError(error);
        setIsLoaded(true);
        setItems([]);
      }
    )
  }, [])

  function close() {
    setSelectedItem(null);
  }

  if (selectedItem != null) {
    return <Details 
      title={selectedItem.title}
      image={selectedItem.urlToImage}
      description={selectedItem.description}
      close={close}
    ></Details>;
  } else if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return <p>Loading...</p>
  } else {
    return (
    <div>
      {items.map(item => (
        <div key={item.title} onClick={e => setSelectedItem(item)}>
          <h3>{item.title}</h3>
          <img src={item.urlToImage}></img>
          <p>{item.description}</p>
        </div>
    ))}
    </div>
    )
  }
}

export default App;
