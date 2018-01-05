// Setting consts
const start = document.getElementById('start'); // For submit botton
const grid = document.getElementById('pixel_canvas'); // For table

const picker = document.getElementById('colorPicker'); // For color picker

const gridHeight = document.getElementById('input_height'); // For number of rows
const gridWidth = document.getElementById('input_width'); // For number of columns

const heightValue = Math.floor((window.innerHeight - 90) / 20); // Calculate optimal number of rows according to viewport height
const widthValue = Math.floor((window.innerWidth - 40) / 20); // Calculate optimal number of columns according to viewport width


gridHeight.setAttribute("value", heightValue); // Set initial grid height value
gridWidth.setAttribute("value", widthValue); // Set initial grid width value


function makeGrid() { // Build canvas (table)

	for (let i = 0; i < gridHeight.value; i++) {

		// Add single row
		let row = grid.insertRow();

		for (let x = 0; x < gridWidth.value; x++) {
			// Add single cell
			row.insertCell()
		};
	};

};


(function () { // Change cell background-color when clicked or hover over with mouse button down

	let active = false;

	const paint = function (cell) {
		if (active) {
			if (cell.target.tagName === "TD") {
				cell.target.style.backgroundColor = picker.value;
			};
		}
	}

	grid.addEventListener('mousedown', function (e) {
		active = true;
		paint(e);
		addRecent();
	})

	grid.addEventListener('mouseleave', function () {
		active = false;
	})

	document.addEventListener('mouseup', function () {
		active = false;
	})

	grid.addEventListener('mouseover', paint);

})()


const recent = [];

function addRecent() {
	
	if (recent.length == 0) {
		recent.push(picker.value);
	} else {
		for (let i = 0; i < recent.length; i++) {
			if (recent[i] === picker.value) {
				recent.splice(i, 1);
			}
		}
		if (recent.length < 5) {
				recent.push(picker.value)
			} else if (recent.length >= 5) {
				recent.shift();
				recent.push(picker.value);
			}
	}
	
	for (let i = 0; i < recent.length; i++) {
		document.getElementById('recent' + i).style.backgroundColor = recent[i];
	}

}


start.addEventListener('click', function (event) { // To do on submit button click

	// Prevent submitting form
	event.preventDefault();


	// Reset table
	grid.innerHTML = '';

	// Create Grid
	makeGrid()

});
