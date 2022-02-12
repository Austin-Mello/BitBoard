function main() {
	let canv = document.querySelector("#BitBoard");
	let glWindow = new GLWindow(canv);

	if (!glWindow.ok()) return;

	let bitboard = new BitBoard(glWindow);
	bitboard.initConnection();

	let gui = GUI(canv, glWindow, bitboard);
}

const GUI = (canv, glWindow, bitboard) => {
	let clr = new Uint8Array([0,0,0]);
	let dragDown = false;
	let lastMovePos = {x:0,y:0};
	let touchStartTime;

	const colorField = document.querySelector("#color-field");
	const colorSwatch = document.querySelector("#color-swatch");

	// ***************************************************
	// ***************************************************
	// Event Listeners
	//
	document.addEventListener("keydown", ev => {
		switch (ev.keyCode) {
		case 189:
		case 173:
			ev.preventDefault();
			zoomOut();
			break;
		case 187:
		case 61:
			ev.preventDefault();
			zoomIn();
			break;
		}
	});

	window.addEventListener("wheel", ev => {
		let zoom = glWindow.getZoom();
		if (ev.deltaY > 0) {
				zoom /= 1.05;
			} else {
				zoom *= 1.05;
			}
		glWindow.setZoom(zoom);
		glWindow.draw();
	});

	document.querySelector("#zoomIn").addEventListener("click", () => {
		zoomIn();
	});

	document.querySelector("#zoomOut").addEventListener("click", () => {
		zoomOut();
	});

	window.addEventListener("resize", ev => {
		glWindow.updateViewScale();
		glWindow.draw();
	});

	canv.addEventListener("mousedown", (ev) => {
		switch (ev.button) {
		case 0:
			dragdown = true;
			lastMovePos = {x:ev.clientX, y:ev.clientY};
			break;
		case 1:
			pickColor({x:ev.clientX,y:ev.clientY});
			break;
		case 2:
			if (ev.ctrlKey) {
				pickColor({x:ev.clientX,y:ev.clientY});
			} else {
				drawPixel({x:ev.clientX,y:ev.clientY}, color);
			}
		}
	});

	document.addEventListener("mouseup", (ev) => {
		dragdown = false;
		document.body.style.cursor = "auto";
	});

	document.addEventListener("mousemove", (ev) => {
		const movePos = {x:ev.clientX, y:ev.clientY};
		if (dragdown) {
			glWindow.move(movePos.x - lastMovePos.x, movePos.y - lastMovePos.y);
			glWindow.draw();
			document.body.style.cursor = "grab";
		}
		lastMovePos = movePos;
	});

	canv.addEventListener("touchstart", (ev) => {
		touchstartTime = (new Date()).getTime();
		lastMovePos = {x:ev.touches[0].clientX, y:ev.touches[0].clientY};
	});

	document.addEventListener("touchend", (ev) => {
		let elapsed = (new Date()).getTime() - touchstartTime;
		if (elapsed < 100) {
			drawPixel(lastMovePos, color);
		}
	});

	document.addEventListener("touchmove", (ev) => {
		let movePos = {x:ev.touches[0].clientX, y:ev.touches[0].clientY};
		glWindow.move(movePos.x - lastMovePos.x, movePos.y - lastMovePos.y);
		glWindow.draw();
		lastMovePos = movePos;
	});

	canv.addEventListener("contextmenu", () => {return false;});

	colorField.addEventListener("change", ev => {
		let hex = colorField.value.replace(/[^A-Fa-f0-9]/g, "").toUpperCase();
		hex = hex.substring(0,6);
		while (hex.length < 6) {
			hex += "0";
		}
		color[0] = parseInt(hex.substring(0,2), 16);
		color[1] = parseInt(hex.substring(2,4), 16);
		color[2] = parseInt(hex.substring(4,6), 16);
		hex = "#" + hex;
		colorField.value = hex;
		colorSwatch.style.backgroundColor = hex;
	});

	// ***************************************************
	// ***************************************************
	// Helper Functions
	//
	const pickColor = (pos) => {
		color = glWindow.getColor(glWindow.click(pos));
		let hex = "#";
		for (let i = 0; i < color.length; i++) {
			let d = color[i].toString(16);
			if (d.length == 1) d = "0" + d;
			hex += d;
		}
		colorField.value = hex.toUpperCase();
		colorSwatch.style.backgroundColor = hex;
	}

	const drawPixel = (pos, color) => {
		pos = glWindow.click(pos);
		if (pos) {
			const oldColor = glWindow.getColor(pos);
			for (let i = 0; i < oldColor.length; i++) {
				if (oldColor[i] != color[i]) {
					place.put(pos.x, pos.y, color);
					break;
				}
			}
		}
	}
	
	const zoomIn = () => {
		let zoom = glWindow.getZoom();
		glWindow.setZoom(zoom * 1.2);
		glWindow.draw();
	}
	
	const zoomOut = () => {
		let zoom = glWindow.getZoom();
		glWindow.setZoom(zoom / 1.2);
		glWindow.draw();
	}
}