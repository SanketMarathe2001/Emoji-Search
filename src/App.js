import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let api_key = process.env.REACT_APP_API
  let [data,setData] = useState([])
  let [search, setSearch] = useState('')
  useEffect(()=>{
    fetch(`https://emoji-api.com/emojis?access_key=${api_key}`)
    .then(res => res.json())
    .then(res=> setData(res))
  },[])

  let heandleSearch = (e)=>{
    setSearch(e.target.value)
  }
  let handleSubmit = ()=>{
      if(search!==''){
        fetch(`https://emoji-api.com/emojis?search=${search}&access_key=${api_key}`)
        .then(res => res.json())
        .then(res=> { 
          if (res){
            setData(res) 
          } else{
            setData([])
          }
        })
      }
  }
  return (
    <div className="App">
      <div className='menu'>
        <div className='menu_text'>
        <h1>Emoji Search</h1>
        <p>A Simple Emoji Search</p>
          <div>
          <input type="text" placeholder="Search" value={search} onChange={(e)=> heandleSearch(e)}/>
          <button className='search' onClick={()=> handleSubmit()}>Search</button>
          </div>
        </div>
      </div>
      <div className='container'>
        {
          // eslint-disable-next-line
          data.map((e,i)=>
            <div className='card' key={e.slug}>
            <p className='emo'>{e.character}</p>
            <p className='name'>{e.unicodeName}</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
