import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';



function App() {
  const [weather, setWather] = useState({});
  const [degrees, setDegrees] = useState(true);
  const centigrade = weather.main?.temp - 273.15;
  const fahrenheit = (9 * centigrade) / 5 + 32;



  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=69ce8ce871dfaf27947a2a30a7ed2c0d`)
        .then(res => setWather(res.data));
    }
    navigator.geolocation.getCurrentPosition(success)

  }, [])
  console.log(weather)
  console.log(weather.weather?.[0].icon)

  const colors = [
    "#845EC2", "#D65DB1", "#FF6F91",
    "#FF9671", "#FFC75F", "#F9F871"
  ];
 
  const changeColor = Math.floor(Math.random() * colors.length);
  
  
  
  return (
    <>
      <div className='dad' style={{background: colors[changeColor]}}>
        <h1 className='title'>Custom weather</h1>
        <h2>Cristián Narvaez</h2>
        <div className='place'>
          {weather.name} {'- '}
          {weather.sys?.country}
        </div>
        <div className='icon'>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" className='iconOne' />
         
          <p className='paragraph'>
            {weather.weather?.[0].description}
          </p>
        </div >
        <p className='parag'>TEMPERATURE: </p> {' '}
        <b className='buttonDegrees'>{degrees
          ? Math.round(centigrade) : Math.round(fahrenheit)
        }
        </b>{' '}
        {degrees ? <img src="../src/assets/img/celsius.png" alt="" className='imgCen' />
          : <img src="../src/assets/img/fahrenheit.png" alt="" className='imgFah' />} <br />
        <button className='buttonChange' onClick={() => setDegrees(!degrees)}> Change to {degrees ? 'Fahrenheit' : 'Centigrade'}  </button>

      </div>
    </>
  )
}

export default App
