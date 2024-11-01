document.getElementById("city").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'ab853dcecca4b673e158af22aa48528b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod === 200) {
            const timezoneOffset = data.timezone / 3600;
            const localTime = new Date(new Date().getTime() + (timezoneOffset * 3600 ));
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const formattedDate = localTime.toLocaleDateString('en-US', options);

            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById('date-time').innerHTML = `Date:   ${formattedDate}</strong>`;
            document.getElementById('city-name').innerHTML = `City:  ${data.name}</strong>`;
            document.getElementById('temperature').innerHTML = `Temperature:  ${data.main.temp} °C</strong>`;
            document.getElementById('weather-description').innerHTML = `
                Weather:  ${data.weather[0].description}</strong>
                <img src="${iconUrl}" alt="Weather Icon" style="vertical-align: middle; margin-left: 10px;">
            `;
            getAdvice();  
        } else {
            document.getElementById('weather-info').innerHTML = 'City not found!';
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = 'Error fetching data!';
        console.error('Error:', error);
    }
}

function getAdvice() {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const advice = data.slip.advice;
            document.getElementById('advice').innerText = advice;
        })
        .catch(error => {
            document.getElementById('advice').innerText = 'Could not fetch advice!';
            console.error('Error fetching advice:', error);
        });
}

function toggleAdvice() {
    const adviceSection = document.getElementById('advice-section');
    adviceSection.style.display = adviceSection.style.display === 'block' ? 'none' : 'block';
    if (adviceSection.style.display === 'block') {
        getAdvice();
    }
}