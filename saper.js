var r = 8; //rozmiar planszy
var nr = -1;
var kwadrat = [];

    //matryca dla nowych kwadratów
function Kwadrat(numer,pozycja,bomba,flaga) {
      this.numer = numer;
      this.pozycja = pozycja;
      this.bomba = bomba;
      this.flaga = flaga;
    }

function nowyKwadrat(nr,x,y) {
    kwadrat[nr] = new Kwadrat(nr,[x,y],false,false);
} 

function bomby () {
    kwadrat[6].bomba = true;
    document.getElementById(6).innerHTML = "Bum!";
}

function klik(id) {
      document.getElementById(id).style.backgroundColor = "#C97A5B";
      document.getElementById("test").innerHTML = "Numer: "+id;

    }

function plansza() {
  var body    = document.getElementsByTagName("body")[0];
  var tbl     = document.createElement("table");
  tbl.id = "table";
  var tblBody = document.createElement("tbody");

  for (var y = 0; y < r; y++) {
    var row = document.createElement("tr");
      for (var x = 0; x < r; x++) {
		      var cell = document.createElement("td");
            nr++;
            nowyKwadrat(nr,x,y);
            cell.id = nr;

            cell.onclick = function() {
            	klik(this.id);
            };
           
		      // var cellText = document.createTextNode(kwadrat[nr].numer);
		      // cell.appendChild(cellText);

		      row.appendChild(cell);
      }
    tblBody.appendChild(row);
  }
 tbl.appendChild(tblBody);
 body.appendChild(tbl);


dodanie_klikania();
bomby();   

}


function test () {
	var t = 6;
  // document.getElementById(t).innerHTML = "Bum!";
  document.getElementById("test").innerHTML = "Numer: "+kwadrat[t].numer + ". Pozycja x,y: " + kwadrat[t].pozycja+". Bomba: "+kwadrat[t].bomba;

}

