class PubSub {
    constructor() {
        this.events = {};
        this.currentId = 0;
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        const id = this.currentId++;

        const sub = { id, callback };
        this.events[event].push(sub);

        return id;
    }
}

export default new PubSub();
