
import Header from './Header';
import AddItem from './AddItem';
import Square from './Square';
import ColorInput from './ColorInput';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react'

function App() {

  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState(
    []
    // JSON.parse(localStorage.getItem('shoppinglist')) || []
  );

  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);

  const [newItem, setNewItem] = useState('')
  const [colorValue, setColorValue] = useState('')
  const [hexValue, setHexValue] = useState('')
  const [isDarkText, setIsDarkText] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // localStorage.setItem('shoppinglist', JSON.stringify(items));
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not recieve expected data')
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);

      } catch (err) {
        setFetchError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);

  }, [
    // items
  ])


  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }


  return (
    <div className="App">
      <Header title="Groceries new" />


      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p> }
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(
            item => ((item.item).toLowerCase()
            ).includes(search.toLowerCase())
          )}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Square
        colorValue={colorValue}
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <ColorInput
        colorValue={colorValue}
        setColorValue={setColorValue}
        setHexValue={setHexValue}
        isDarkText={isDarkText}
        setIsDarkText={setIsDarkText}
      />
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
