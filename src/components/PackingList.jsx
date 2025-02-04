import { useState } from "react";
import Item from "./Item";

function PackingList({items, setItems, onDeleteItem, onToggleItem}) {
  
    const [sortBy, setSortBy] = useState('input');
  
    function clearListItems () {
      
      if (window.confirm('Are you sure you want to delete all items?')) {
        setItems([]);
      }
    }
  
    let sortedItems;
    if(sortBy === 'input') sortedItems = items;
  
    if(sortBy === 'description') sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  
    if(sortBy === 'packed') sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));
  
    return (
      <div className="list">
        <ul>
        {sortedItems.map((item) => (
          <Item key={item.id} onDeleteItem={onDeleteItem} item={item} onToggleItem={onToggleItem}/>
          ))}
        </ul>
  
        <div className='actions' onChange={(e)=> setSortBy(e.target.value)}>
          <select value={sortBy}>
            <option value="input">Sorted by input order</option>
            <option value="description">Sorted by description</option>
            <option value="packed">Sorted by packed status</option>
          </select>
          <button onClick={clearListItems}>Clear list</button>
        </div>
      </div>  
    )
  }

  export default PackingList;