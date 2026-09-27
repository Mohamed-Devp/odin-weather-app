import "./TempSwitch.css";

import pubsub from "../../pubsub.js";
import { createElement } from "../../utils.js";

export default function createTempSwitch() {
    const tempSwitch = createElement("button", {
        className: "temp-switch",
        text: "°F",
        attrs: {
            role: "switch",
            "aria-checked": "false",
            "aria-label": "Fahrenheit (°F)",
        },
    });

    const switchTempUnit = () => {
        const isChecked = tempSwitch.getAttribute("aria-checked") === "true";

        const current = isChecked ? "fahrenheit" : "celsius";
        const next = current === "celsius" ? "fahrenheit" : "celsius";

        tempSwitch.setAttribute("aria-checked", String(next === "fahrenheit"));
        tempSwitch.textContent = next === "celsius" ? "°F" : "°C";

        pubsub.publish("temp-unit-changed", next);
    };

    tempSwitch.addEventListener("click", switchTempUnit);

    return tempSwitch;
}
