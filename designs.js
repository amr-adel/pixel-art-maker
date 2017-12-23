// Setting consts
const picker = $('#colorPicker'); // For color picker

const grid = $('#pixel_canvas'); // For table
const start = $('#start'); // For submit botton

const gridHeight = $('#input_height'); // For number of rows
const gridWidth = $('#input_width'); // For number of columns


function makeGrid() {

	// Create a string of cells markup to append it in the rows loop
	let cells = '';
	for (let x = 0; x < gridWidth.val(); x++) {
		cells += "<td></td>";
	};

	// Create rows of table and cells markup inside
	for (let i = 0; i < gridHeight.val(); i++) {
		grid.append("<tr>" + cells + "</tr>");
	};

	// Change background color of the cell when mouse over and down
	let paint = function (cell) {
		$(cell).css('background', picker.val());
	};

	let mouse = false;

	grid.on('mousedown', function () {
		paint(event.target);
		mouse = true;
	});

	grid.on('mouseleave mouseup', function () {
		mouse = false;
	});

	grid.on('mouseover', function () {
		if (mouse) {
			paint(event.target);
		};
	});

};


// To do on submit button click
start.click(function (event) {

	// Prevent submitting form
	event.preventDefault();

	// Reset table
	grid.empty();

	// Create Grid
	makeGrid();

});
