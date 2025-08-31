import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';

const SearchLocation = () => {
    const [searchQuery, setSearchQuery] = useState('delhi');
    const [data, setData] = useState('');
    const [debounceQuery, setDebounceQuery] = useState(searchQuery);
    // const condition = data.weather[0]?.main;

    async function fetchApi() {
        const API_KEY = "c80e9d04924ccbfe4545a95ad3b616d0";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${debounceQuery}&appid=${API_KEY}&units=metric`
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json();
                setData(data)
            }
        } catch (error) {
            console.log('Error fetching API' - error);

        }
    }

    useEffect(() => {
        fetchApi()
    }, [debounceQuery])

    useEffect(() => {
        const handler = setTimeout(() => setDebounceQuery(searchQuery), 500);
        return () => clearTimeout(handler)
    }, [searchQuery])

    console.log(data);
    console.log(debounceQuery);


    return (
        <div>
            <div class="hot div">

                <span class="sun"></span>
                <span class="sunx"></span>
            </div>

            <div class="cloudy div">
                <span class="cloud"></span>
                <span class="cloudx"></span>
            </div>

            <div class="stormy div">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <span class="snowe"></span>
                <span class="snowex"></span>
                <span class="stick"></span>
                <span class="stick2"></span>
            </div>

            <div class="breezy div">
                <ul>

                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <span class="cloudr"></span>


            </div>

            <div class="night div">
                <span class="moon"></span>
                <span class="spot1"></span>
                <span class="spot2"></span>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

            </div>
            <h1>Find Location</h1>


            <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className='border-2 p-3 border-orange-700 mx-3 w-3xl my-3.5' />
            <div className="weather-card flex flex-row mt-6">
                <div class="basis-100  flex flex-row gap-5">
                    <div class="basis-100  ">
                        
                        <h1 className=' basis-50'>{data.main?.temp} °C</h1></div>
                    <div class="basis-50 text-left">
                        <p>Wind : {data.wind?.speed}</p>
                        <p>Humidity : {data.main?.humidity}%</p>
                        <p>Feel like : {data.main?.feels_like} °C</p>
                    </div>
                </div>
                <div class="basis-100 text-end">
                    <h6>{data?.sys?.country}</h6>
                    <h1>{data.name}</h1>
                    <p>Sunrise: {new Date(data?.sys?.sunrise).toLocaleTimeString()} | Sunset: {new Date(data?.sys?.sunset).toLocaleTimeString()} </p>
                </div>
            </div>
            {debounceQuery &&
                <div className='map mt-5 border-4 border-sky-500'>
                    <iframe
                        src={`https://www.google.com/maps?q=${data.coord?.lat},${data.coord?.lon}+(${encodeURIComponent(data?.name)})&hl=en&z=14&output=embed`}
                        width="100%"
                        height="450"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            }


        </div>
    );
}

export default SearchLocation;
