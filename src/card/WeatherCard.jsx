import './style.css'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';



function WeatherCard() {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("patna");
    const [loading, setloading] = useState(true)



    const fetchApi = () => {


        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=343ea17456187ffa5ef8c30fc78d82b1`;
        fetch(url)
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => {
                setData(data);
                setloading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    useEffect(() => {
        // You can fetch data when the component mounts
        fetchApi();
    }, []);

    const handleSearchClick = () => {
        // Call the API when the button is clicked
        fetchApi();
    }


    const getWeatherImage = () => {
        if (data && data.main && data.main.temp - 273.15 > 20) {
            return "https://cdn-icons-png.flaticon.com/128/1163/1163661.png"; // Sunny image
        } else {
            return "https://cdn-icons-png.flaticon.com/128/1146/1146869.png"; // Cloudy image
        }
    }



    return (
        <>
            <div className="container">
                <div className="weather_card">
                    <div className="search">
                        <input type="text" placeholder='Enter Your City' onChange={(e) => setQuery(e.target.value)} />
                        <Button variant="contained" endIcon={<SearchIcon />} size="small" onClick={handleSearchClick}>
                            Search
                        </Button>
                    </div>
                    {loading && (
                        <div className='error-message'>
                            Please allow us few second to fetch data 
                        </div>
                    ) }
                    {data.cod == '404' && (
                        <div className="error-message">
                            City not found. Please enter a valid city name.
                        </div>
                    )}


                    {!loading && data && data.cod !== '404' && (
                        <div className="weatherInfo">



                            <div className='Image'>

                                <img src={getWeatherImage()} />
                            </div>


                            <div className="cityName">
                                <h1>{(data?.main?.temp - 273.15).toFixed(2)}°C</h1>
                            </div>

                            <div className='placename'>
                                {data?.name}
                            </div>



                            <div className='temprature'>
                                <span>Feels Like : </span>
                                <span>{(data?.main?.feels_like - 273.15).toFixed(2)}°C</span>
                            </div>


                            <div className='temprature'>
                                <span>Humidity : </span>
                                <span>{data?.main?.humidity}%</span>
                            </div>


                            <div className='temprature'>
                                <span>Wind : </span>
                                <span>{data?.wind?.speed} {" "}km/h</span>
                            </div>





                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default WeatherCard;