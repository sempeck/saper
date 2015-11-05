//rozmiar planszy
var r = 8;
var rowIndex = 0;
var cellIndex = 0;
var nr = -1;
var kwadrat = [];

    //matryca dla nowych kwadratów
function Kwadrat(numer,pozycja,bomba,flaga) {
      this.numer = numer;
      this.pozycja = pozycja;
      this.bomba = bomba;
      this.flaga = flaga;
    }

function plansza() {

  var body    = document.getElementsByTagName("body")[0];
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");

 
  for (var x = 0; x < r; x++) {
    var row = document.createElement("tr");
      for (var y = 0; y < r; y++) {
		      var cell = document.createElement("td");
		        rowIndex = x;
            cellIndex = y;
            nr++;
            kwadrat[nr] = new Kwadrat(nr,[x,y],false,false);

            cell.onclick = function () {
            	// click(); 
            	
              this.style.backgroundColor = "#C97A5B";

            }

		      var cellText = document.createTextNode(kwadrat[nr].numer);
		      
		      cell.appendChild(cellText);
		      row.appendChild(cell);
      }
    tblBody.appendChild(row);
  }
 tbl.appendChild(tblBody);
 body.appendChild(tbl);

}

function click () {
  document.write("test");
  // tbl[i,j].style.backgroundColor = "#C97A5B";
  // var ind = document.getElementsByTagName("tbody").rows[1].cells[1];
  // document.write(ind);
}

function test () {
  // document.write("test: ", kwadrat[3].pozycja);
  document.getElementById("test").innerHTML = kwadrat[0].numer;

}

