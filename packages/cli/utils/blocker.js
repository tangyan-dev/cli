class Blocker {
    detector(fn, delay = 500) {
        return new Promise(resolve => {
            this.timer = setInterval(() => {
                if (fn()) {
                    resolve({ ok: 1 })
                    clearInterval(this.timer);
                }
            }, delay);
        });
    }
}
module.exports = Blocker;