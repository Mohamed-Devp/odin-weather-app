import "./TempSwitch.css";

import { createElement } from "../../utils.js";

export default function createTempSwitch() {
    const tempSwitch = createElement("button", {
        className: "temp-switch",
        text: "°C",
        attrs: {
            role: "switch",
            "aria-checked": "false",
            "aria-label": "Fahrenheit (°F)",
        },
    });

    return tempSwitch;
}
