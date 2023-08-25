
let Particles = {
	init() {
		this.cvs = witney.content.find(".particles");
		this.ctx = this.cvs[0].getContext("2d", { willReadFrequently: true });
		// update dimensions
		this.cvs.attr({
			width: this.cvs.prop("offsetWidth"),
			height: this.cvs.prop("offsetHeight"),
		});
	},
	draw(opt) {
		let path = [],
			cW = this.cvs.attr("width"),
			cH = this.cvs.attr("height"),
			color = opt.el.cssProp("--snake"),
			unit = parseInt(opt.el.cssProp("--unit"), 10),
			segment = unit * 4,
			cell = unit * 5,
			oX = +opt.el.prop("offsetLeft") + (unit / 2) + .5,
			oY = +opt.el.prop("offsetTop") + (unit / 2) + .5,
			radius = 5,
			tau = Math.PI * 2;

		this.ctx.fillStyle = "#f00"; // color
		this.ctx.strokeStyle = "#f00";
		this.ctx.clearRect(0, 0, cW, cH);
		this.ctx.translate(oX, oY)
		this.ctx.beginPath();

		// loop path
		opt.path.split(";").map(point => {
			let [x,y,type] = point.split(","),
				pX = x * cell,
				pY = y * cell;
			switch (type) {
				case "N": this.ctx.moveTo(pX, pY); break;
				default:  this.ctx.lineTo(pX, pY);
			}
			// save for later use
			path.push([pX,pY]);
		});

		this.ctx.stroke();

		// temp
		this.moveAlongPath(path, .25);

	},
	moveAlongPath(path, percentage) {
		let dist = (x1, y1, x2, y2) => Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2)),
			getPosOnLine = (x1, y1, x2, y2, perc) => [ x1 * (1.0 - perc) + x2 * perc, y1 * (1.0 - perc) + y2 * perc ],
			total = 0,
			measure = 0,
			target,
			x, y,
			radius = 5,
			tau = Math.PI * 2;
		// calculate total line segment
		path.slice(0,-1).map((e, i) => total += dist(...path[i], ...path[i+1]));
		target = total * percentage;
		// calculate percentage position on line segment
		for (let i=0, il=path.length-1; i<il; i++) {
			let d = dist(...path[i], ...path[i+1]);
			if (measure + d < target) {
				measure += d;
			} else {
				let p = (target - measure) / d;
				[x, y] = getPosOnLine(...path[i], ...path[i+1], p);
				break;
			}
		}
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, tau, true);
		this.ctx.fill();
	},
	update() {
		
	},
	render() {
		
	}
};
