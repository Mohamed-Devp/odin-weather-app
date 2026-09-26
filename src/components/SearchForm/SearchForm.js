import "./SearchForm.css";

import { createElement } from "../../utils.js";

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

    return searchForm;
}
