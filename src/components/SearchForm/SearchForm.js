import "./SearchForm.css";

import pubsub from "../../pubsub.js";
import { createElement } from "../../utils.js";

const API_KEY = "MLYBZJSEEVCZWDP7ABYL6MARV";

export default function createSearchForm() {
    const searchField = createElement("input", {
        className: "search-form__field",
        attrs: {
            type: "search",
            placeholder: "Search for a place...",
            "aria-label": "Location",
        },
    });

    const submitBtn = createElement("button", {
        className: "search-form__submit-btn",
        text: "Search",
    });

    const searchForm = createElement("form", {
        className: "search-form",
        children: [searchField, submitBtn],
        attrs: { novalidate: "novalidate" },
    });

    const fetchWeatherData = async (location) => {
        const baseURL =
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

        const parameters = `?key=${API_KEY}&elements=datetime,temp,humidity,precip,windspeed&unitGroup=metric`;

        const response = await fetch(`${baseURL}/${location}${parameters}`);

        if (!response.ok) {
            pubsub.publish("results-not-found", location);
            throw new Error(`HTTP Error: ${response.status}.`);
        }

        const data = await response.json();
        pubsub.publish("weather-data-fetched", data);
    };

    return searchForm;
}
