
@import "modules/sample.js";
@import "modules/maps.js";


const windmill = {
	init() {
		// fast references
		this.content = window.find("content");

		Maps.draw({ name: "plus", el: window.find(".puzzle.p1") });
		Maps.draw({ name: "level1", el: window.find(".puzzle.p2") });
		// Maps.draw({ name: "exits", el: window.find(".puzzle.p2") });
		// Maps.draw({ gen: "4x3", el: window.find(".puzzle.p2") });

		let snake = [];
		snake.push(`<circle cx="91" cy="231" r="19"/>`);
		snake.push(`<line x1="91" y1="231" x2="91" y2="21"/>`);
		snake.push(`<line x1="91" y1="21" x2="131" y2="21"/>`);

		window.find(".puzzle.p1")
			.append(`<svg class="snake" viewBox="0 0 252 252">${snake.join("")}</svg>`);
	},
	dispatch(event) {
		switch (event.type) {
			case "window.init":
				break;
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = windmill;
