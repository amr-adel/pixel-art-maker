(function () {
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
	const recentList = document.getElementById('recent');



	function rgbToHex(rgb) { // Convert rgb into hexadecimal ==================================================================
		var a = rgb.split("(")[1].split(")")[0].split(",");
		return "#" + a.map(function (x) {
			x = parseInt(x).toString(16);
			return (x.length == 1) ? "0" + x : x;
		}).join("");
	}


	const recent = []; // Add recent color ====================================================================================

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


	function recolor() { // Update recent colors and picker placeholder =======================================================
		pickerPh.style.backgroundColor = picker.value;

		document.getElementById('selPaint').click();

		for (let i = 0; i < recent.length; i++) {
			document.getElementById('recent' + i).style.backgroundColor = recent[i];
		}
	};


	recentList.addEventListener('click', function (e) { // Pick color from recently used colors when clicked ==================
		if (e.target.tagName === "LI" && e.target.style.backgroundColor != 0) {
			picker.value = rgbToHex(e.target.style.backgroundColor);
			recolor();
		}
	});


	pickerPh.addEventListener('click', function () { // Simulate color picker click ===========================================
		picker.focus();
		picker.click();
	})

	picker.addEventListener('change', recolor) // Update recent colors when picker color changed ==============================


	let active = false; // Paint ==============================================================================================

	const paint = function (cell) { // Paint ==================================================================================
		if (active) {
			if (cell.target.tagName === "TD") {
				cell.target.style.backgroundColor = picker.value;
			};
		}
	}

	const erase = function (cell) { // Erase ==================================================================================
		if (active) {
			if (cell.target.tagName === "TD") {
				cell.target.style.backgroundColor = "";
			};
		}
	}

	const pick = function (cell) { // Pick ====================================================================================
		if (cell.target.tagName === "TD" && cell.target.style.backgroundColor != 0) {
			picker.value = rgbToHex(cell.target.style.backgroundColor);
			recolor();
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
		} else if (tool === "pick") {
			pick(e);
		}
	})

	grid.addEventListener('mouseleave', function () {
		active = false;
	})

	document.addEventListener('mouseup', function () {
		active = false;
	})

	grid.addEventListener('mouseover', function (e) { // Paint or erase on mouse over =========================================

		let tool = document.querySelector('input[name="tool"]:checked').value;

		if (tool === "paint") {
			paint(e);
		} else if (tool === "erase") {
			erase(e);
		}
	});



	function makeGrid() { // Build canvas (table) =============================================================================

		for (let i = 0; i < gridHeight.value; i++) {

			// Add single row
			let row = grid.insertRow();

			for (let x = 0; x < gridWidth.value; x++) {
				// Add single cell
				row.insertCell()
			};
		};

	};


	document.getElementById('add-top').addEventListener('click', function () { // Add row to the top ==========================
		const tds = document.querySelector('#canvas-grid tr').innerHTML;
		grid.insertRow(0).setAttribute('id', 'temp');
		document.getElementById('temp').innerHTML = tds;
		document.querySelectorAll('#temp td').forEach(function (td) {
			td.removeAttribute('style');
		});
		document.getElementById('temp').removeAttribute('id');
	});

	document.getElementById('add-bottom').addEventListener('click', function () { // Add row to the bottom ====================
		const tds = document.querySelector('#canvas-grid tr').innerHTML;
		grid.insertRow(-1).setAttribute('id', 'temp');
		document.getElementById('temp').innerHTML = tds;
		document.querySelectorAll('#temp td').forEach(function (td) {
			td.removeAttribute('style');
		});
		document.getElementById('temp').removeAttribute('id');
	});

	document.getElementById('add-right').addEventListener('click', function () { // Add column to the rigth ===================
		document.querySelectorAll('#canvas-grid tr').forEach(function (tr) {
			tr.insertCell(-1);
		});
	});

	document.getElementById('add-left').addEventListener('click', function () { // Add column to the left =====================
		document.querySelectorAll('#canvas-grid tr').forEach(function (tr) {
			tr.insertCell(0);
		});
	});


	document.getElementById('remove-top').addEventListener('click', function () { // Reomve a row from the top =================
		grid.deleteRow(0);
	});

	document.getElementById('remove-bottom').addEventListener('click', function () { // Reomve a row from the bottom ===========
		grid.deleteRow(-1);
	});

	document.getElementById('remove-right').addEventListener('click', function () { // Remove column from the rigth ===========
		document.querySelectorAll('#canvas-grid tr').forEach(function (tr) {
			tr.deleteCell(-1);
		});
	});

	document.getElementById('remove-left').addEventListener('click', function () { // Remove column from the left =============
		document.querySelectorAll('#canvas-grid tr').forEach(function (tr) {
			tr.deleteCell(0);
		});
	});







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
