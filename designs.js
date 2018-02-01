(function() {
	const gridHeight = document.getElementById('input-height'); // For number of rows
	const gridWidth = document.getElementById('input-width'); // For number of columns

	const heightValue = Math.floor((window.innerHeight - 240) / 20); // Calculate optimal number of rows according to viewport height
	const widthValue = Math.floor((window.innerWidth - 40) / 20); // Calculate optimal number of columns according to viewport width


	gridHeight.setAttribute("value", heightValue); // Set initial grid height value
	gridWidth.setAttribute("value", widthValue); // Set initial grid width value
	
	const main = document.getElementById('container');
	const grid = document.getElementById('canvas-grid'); // For table
	const start = document.getElementById('start'); // For submit botton
	
	const reset = document.getElementById('reset');	

	
	const picker = document.getElementById('picker');
	const pickerPh = document.getElementById('picker-ph');
	

	pickerPh.addEventListener('click', function() {
		picker.focus();
		picker.click();
	})

	picker.addEventListener('change', function() {
		pickerPh.style.backgroundColor = picker.value;
		
		for (let i = 0; i < recent.length; i++) {
			document.getElementById('recent' + i).style.backgroundColor = recent[i];
		}
	})

	
	
	
	
	let active = false; // Paint **************************************************************************************

	const paint = function (cell) {
		if (active) {
			if (cell.target.tagName === "TD") {
				cell.target.style.backgroundColor = picker.value;
			};
		}
	}
	
	const erase = function (cell) {
		if (active) {
			if (cell.target.tagName === "TD") {
				cell.target.style.backgroundColor = "";
			};
		}
	}

	grid.addEventListener('mousedown', function (e) {
		active = true;
		let tool = document.querySelector('input[name="tool"]:checked').value;
		
		if (tool === "paint") {
			paint(e);
			addRecent();
		} else if (tool === "erase") {
			erase(e);
		}
	})

	grid.addEventListener('mouseleave', function () {
		active = false;
	})

	document.addEventListener('mouseup', function () {
		active = false;
	})

	grid.addEventListener('mouseover', function(e) {
		
		let tool = document.querySelector('input[name="tool"]:checked').value;
		
		if (tool === "paint") {
			paint(e);
		} else if (tool === "erase") {
			erase(e);
		}
	});
	
	
	
	
	
	const recent = []; // Add recent color ***********************************************************************************
	
	
	function addRecent() {

		if (recent.length == 0) {
			recent.unshift(picker.value);
		} else {
			for (let i = 0; i < recent.length; i++) {
				if (recent[i] === picker.value) {
					recent.splice(i, 1);
				}
			}
			if (recent.length < 5) {
				recent.unshift(picker.value)
			} else if (recent.length >= 5) {
				recent.pop();
				recent.unshift(picker.value);
			}
		}

	}
	
	
	function makeGrid() { // Build canvas (table) ****************************************************************************************

		for (let i = 0; i < gridHeight.value; i++) {

			// Add single row
			let row = grid.insertRow();

			for (let x = 0; x < gridWidth.value; x++) {
				// Add single cell
				row.insertCell()
			};
		};

	};



	
	
	
	
	
	
	
	
	
	
	

	start.addEventListener('click', function (event) { // To do on submit button click ****************************************************************************************

		// Prevent submitting form
		event.preventDefault();


		// Reset table
		grid.innerHTML = '';

		main.classList.add('canvas');

		// Create Grid
		makeGrid()

	});


	reset.addEventListener('click', function () { // Reset Canvas  ****************************************************************************************
		main.classList.remove('canvas');
	})

}());


/*

// Setting consts


const picker = document.getElementById('colorPicker'); // For color picker





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








//=======================================================================

const bgPicker = document.getElementById('bg-picker');
const bgPickerPh = document.getElementById('bg-picker-ph');
const canBgPickerPh = document.getElementById('can-bg-picker-ph');

bgPickerPh.addEventListener('click', function() {
	bgPicker.focus();
	bgPicker.click();
})

canBgPickerPh.addEventListener('click', function() {
	bgPicker.focus();
	bgPicker.click();
})

bgPicker.addEventListener('change', function() {
	bgPickerPh.style.backgroundColor = bgPicker.value;
	canBgPickerPh.style.backgroundColor = bgPicker.value;
})

//=======================================================================





*/