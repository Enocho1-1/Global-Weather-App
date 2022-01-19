
// DOM Elements
const userInput = document.getElementById('inputVal'),
      loader = document.getElementById('loader'),
      cityName = document.getElementById('city'),
      currWeather = document.getElementById('currTemp'),
      realFeel = document.getElementById('realFeel'),
      description = document.getElementById('descrip'),
      tempHL = document.getElementById('highLow'),
      wind = document.getElementById('wind'),
      humidity = document.getElementById('humid'),
      pressure = document.getElementById('pressure'),
      output =''


// Weather class
class Weather {
  //Prototype Methods

  // HTTP GET Request
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => {
        if(!response.ok){
          throw Error( `Error: ${response.status}`)
        } else {
          return response.json()
        }
      })
      .then(data => resolve(data))
      .catch(error => reject(error))
    })
  }

  // Clear Input function 
  clearInput() {
    userInput.value = ''
  }

  // Clear loader
  clearLoader() {
    loader.style.display = 'none'
  }

  // Validation
  errorMsg(msg) {
    // Create error div
    const errorDiv = document.createElement('div')
    errorDiv.className = 'errorPop'
    errorDiv.appendChild(document.createTextNode(msg))
    // Parent Container
    const parent = document.querySelector('div.primary-container'),
          inputDiv = document.querySelector('div.input-group ')
    parent.insertBefore(errorDiv, inputDiv)

    setTimeout( () => {
     errorDiv.style.display = 'none'
     loader.style.display = 'none'
    }, 2000)
  }
}

// getWeather function expression
const getWeather = () => {
 
  const weather = new Weather
  // Input Field Check
  switch(userInput.value){
    case '':
      weather.errorMsg('Please Enter a city or state')
      break
    default:
      // Weather Class function call
      weather.get(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&units=imperial&appid=38a098307656f7defaf84b8fc7e288bc`)
      .then(data => {
         cityName.textContent = data.name
         currWeather.textContent = `${parseInt(data.main.temp)}°`
         realFeel.textContent = `${parseInt(data.main.feels_like)}°`
         description.textContent = data['weather'][0]['description']
         tempHL.textContent = `${parseInt(data.main.temp_max)}° / ${parseInt(data.main.temp_min)}°`
         wind.innerHTML = `
         <li>${data.wind.speed} mph</li> 
         <li>Degree: ${data.wind.deg}</li>
         <li>Gust: ${data.wind.gust}</li>`
         humidity.textContent = `${data.main.humidity}%`
         pressure.textContent = `${data.main.pressure}`
       
      })
      .catch(error => reject(error))
       weather.clearInput()
       weather.clearLoader()
  }
}

// Button Event Listener
  document.getElementById('button-addon2').addEventListener('click', e => {

    loader.style.display = 'block'
    setTimeout(getWeather, 2000)
    e.preventDefault()
  })

      
    