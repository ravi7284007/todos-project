import { useState, useEffect } from 'react';

const SearchLocation = () => {
    const [searchQuery, setSearchQuery] = useState('delhi');
    const [data, setData] = useState('');
    const [debounceQuery, setDebounceQuery] = useState(searchQuery);

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

    return (
        <div>
            <div className="hot div">

                <span className="sun"></span>
                <span className="sunx"></span>
            </div>

            <div className="cloudy div">
                <span className="cloud"></span>
                <span className="cloudx"></span>
            </div>

            <div className="stormy div">
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
                <span className="snowe"></span>
                <span className="snowex"></span>
                <span className="stick"></span>
                <span className="stick2"></span>
            </div>

            <div className="breezy div">
                <ul>

                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <span className="cloudr"></span>


            </div>

            <div className="night div">
                <span className="moon"></span>
                <span className="spot1"></span>
                <span className="spot2"></span>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

            </div>
            <h1>Weather Around You</h1>
            <p>Know the sky, wherever you are.</p>
            <br/>
            <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className='capitalize border-2 p-3 border-orange-700 mx-3 w-3xl my-3.5' />
            <div className="weather-card flex flex-row mt-6">
                <div className="basis-100  flex flex-row gap-5">
                    <div className="basis-100  ">
                        <h1 className=' basis-90 text-left'><small><sup>🌡</sup></small>{data.main?.temp}°C</h1></div>
                    <div className="basis-100 text-left">
                       {data && <><p>⛅ {data.weather[0]?.description}</p>
                        <p>💨 Wind {data?.wind?.speed} m/s</p>
                        <p>🌫 Humidity {data?.main?.humidity}%</p>
                        <p>⛄ {data.main?.feels_like} °C</p>
                        </>
                        }
                    </div>
                </div>
                <div className="basis-100 text-end">
                    <h6>{data?.sys?.country}</h6>
                    <h1>{data.name}</h1>
                    <p> {`🌄 Sunrise: ${new Date(data?.sys?.sunrise * 1000).toLocaleTimeString()}`} |  {`🌇 Sunset: ${new Date(data?.sys?.sunset * 1000).toLocaleTimeString()}`} </p>
                </div>
            </div>
            {debounceQuery &&
                <div className='map mt-5 border-4 border-sky-500'>
                    <iframe
                        src={`https://www.google.com/maps?q=${data.coord?.lat},${data.coord?.lon}+(${encodeURIComponent(data?.name)})&hl=en&z=14&output=embed`}
                        width="100%"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            }


        </div>
    );
}

export default SearchLocation;
