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

    unsubscribe(event, id) {
        if (!this.events[event]) return false;

        this.events[event] = this.events[event].filter((sub) => {
            return sub.id !== id;
        });

        return true;
    }
}

export default new PubSub();
