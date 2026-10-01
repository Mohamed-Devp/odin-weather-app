import "./Main.css";

import pubsub from "../../pubsub.js";
import { createElement } from "../../utils.js";
import createSearchForm from "../SearchForm/SearchForm.js";
import createWeatherCard from "../WeatherCard/WeatherCard.js";

export default function createMain() {
    const notFoundMsg = createElement("p", {
        className: "main__msg",
        attrs: { role: "status", "aria-live": "polite" },
    });

    const main = createElement("main", {
        className: "main",
        children: [createSearchForm(), notFoundMsg],
    });

    let weatherData;
    let tempUnit = "celsius";

    const getLocaleDateString = (date, timeZone) => {
        const localeString = date.toLocaleString("en-US", {
            timeZone,
            dateStyle: "full",
        });

        const [weekDay, monthAndDay, _] = localeString.split(", ");
        const [month, day] = monthAndDay.split(" ");

        return `${weekDay.slice(0, 3)}, ${month.slice(0, 3)} ${day}`;
    };

    const displayWeatherData = () => {
        const { currentConditions: current } = weatherData;

        const date = getLocaleDateString(
            new Date(current.datetimeEpoch * 1000),
            weatherData.timezone,
        );

        const temp =
            tempUnit === "celsius" ? current.temp : current.temp * (9 / 5) + 32;

        const weatherCard = createWeatherCard(tempUnit, {
            ...current,
            date,
            temp,
            location: weatherData.resolvedAddress,
            windSpeed: current.windspeed,
        });

        if (main.childNodes.length > 2) {
            main.removeChild(main.lastChild);
        }
        main.appendChild(weatherCard);
    };

    const displayNotFoundMsg = (query) => {
        if (main.childNodes.length > 2) {
            main.removeChild(main.lastChild);
        }

        notFoundMsg.textContent = `No results found for "${query}".`;
    };

    const clearNotFoundMsg = () => {
        notFoundMsg.textContent = "";
    };

    pubsub.subscribe("weather-data-fetched", (data) => {
        weatherData = data;
        displayWeatherData();
        clearNotFoundMsg();
    });

    pubsub.subscribe("temp-unit-changed", (newUnit) => {
        tempUnit = newUnit;
        displayWeatherData();
    });

    pubsub.subscribe("results-not-found", displayNotFoundMsg);

    return main;
}
