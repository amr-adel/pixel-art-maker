// Setting consts
const picker = document.getElementById('colorPicker'); // For color picker

const grid = document.getElementById('pixel_canvas'); // For table
const start = document.getElementById('start'); // For submit botton

const gridHeight = document.getElementById('input_height'); // For number of rows
const gridWidth = document.getElementById('input_width'); // For number of columns


function makeGrid() {

	for (var i = 0; i < gridHeight.value; i++) {

		// Add single row
		var row = grid.insertRow();

		for (var x = 0; x < gridWidth.value; x++) {
			// Add single cell
			row.insertCell()
		};
	};

	grid.addEventListener('click', function (event) {
		if (event.target.tagName === "TD") {
			event.target.style.backgroundColor = picker.value;
		}
	});

};


// To do on submit button click
start.addEventListener('click', function (event) {

	// Prevent submitting form
	event.preventDefault();


	// Reset table
	grid.innerHTML = '';

	// Create Grid
	makeGrid()

});
