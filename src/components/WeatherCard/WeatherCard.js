import "./WeatherCard.css";

import { createElement } from "../../utils.js";
import createTempSwitch from "../../components/TempSwitch/TempSwitch.js";

const icons = {
    fog: import("@meteocons/svg-static/fill/fog.svg?raw"),
    rain: import("@meteocons/svg-static/fill/rain.svg?raw"),
    snow: import("@meteocons/svg-static/fill/snow.svg?raw"),
    cloudy: import("@meteocons/svg-static/fill/cloudy.svg?raw"),
    drizzle: import("@meteocons/svg-static/fill/drizzle.svg?raw"),
    overcast: import("@meteocons/svg-static/fill/overcast.svg?raw"),
    thunderstorms: import("@meteocons/svg-static/fill/thunderstorms.svg?raw"),
    "clear-day": import("@meteocons/svg-static/fill/clear-day.svg?raw"),
    "clear-night": import("@meteocons/svg-static/fill/clear-night.svg?raw"),
    "fog-day": import("@meteocons/svg-static/fill/fog-day.svg?raw"),
    "fog-night": import("@meteocons/svg-static/fill/fog-night.svg?raw"),
    "partly-cloudy-day":
        import("@meteocons/svg-static/fill/partly-cloudy-day.svg?raw"),
    "partly-cloudy-night":
        import("@meteocons/svg-static/fill/partly-cloudy-night.svg?raw"),
    "thunderstorms-night":
        import("@meteocons/svg-static/fill/thunderstorms-night.svg?raw"),
    "overcast-night":
        import("@meteocons/svg-static/fill/overcast-night.svg?raw"),
};

function createWeatherCardHeader(tempUnit, location, date) {
    const info = createElement("div", {
        className: "weather-card__info",
        children: [
            createElement("h2", {
                className: "weather-card__location",
                text: location,
            }),
            createElement("p", {
                className: "weather-card__date",
                text: date,
            }),
        ],
    });

    const header = createElement("div", {
        className: "weather-card__header",
        children: [info, createTempSwitch(tempUnit)],
    });

    return header;
}

function createWeatherCardSummary(iconDescription, conditions, temp) {
    const icon = createElement("img", {
        className: "weather-card__icon",
        attrs: { alt: conditions },
    });

    icons[iconDescription]
        ?.then(({ default: WeatherIcon }) => {
            icon.src = WeatherIcon;
        })
        .catch((error) => {
            console.error(error);
        });

    const tempPara = createElement("p", {
        className: "weather-card__temp",
        text: `${Math.round(temp)}°`,
    });

    const summary = createElement("div", {
        className: "weather-card__summary",
        children: [icon, tempPara],
    });

    return summary;
}

function createWeatherCardElement(label, value, unit) {
    const unitSpan = createElement("span", {
        className: "weather-card__unit",
        text: unit,
    });

    const element = createElement("div", {
        className: "weather-card__element",
        children: [
            createElement("p", {
                className: "weather-card__label",
                text: label,
            }),
            createElement("p", {
                className: "weather-card__value",
                text: Math.round(value),
                children: [unitSpan],
            }),
        ],
    });

    return element;
}

function createWeatherCardElements(windSpeed, humidity, precip) {
    const elements = createElement("div", {
        className: "weather-card__elements",
        children: [
            createWeatherCardElement("Wind Speed", windSpeed, "km/h"),
            createWeatherCardElement("Humidity", humidity, "%"),
            createWeatherCardElement("Precipitation", precip, "mm"),
        ],
    });

    return elements;
}

export default function createWeatherCard(
    tempUnit,
    { location, date, icon, conditions, temp, windSpeed, humidity, precip },
) {
    const weatherCard = createElement("article", {
        className: "weather-card",
        children: [
            createWeatherCardHeader(tempUnit, location, date),
            createWeatherCardSummary(icon, conditions, temp),
            createWeatherCardElements(windSpeed, humidity, precip),
        ],
    });

    return weatherCard;
}
