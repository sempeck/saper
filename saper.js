var r = 8; //rozmiar planszy
var ileBomb = 10;
var pola = r*r; //ilość pól
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
	  var losowane = []
	  while(losowane.length < ileBomb){
	  	var los = Math.floor((Math.random() * pola));
	  	var found = false;
	    	for (var i=0;i<ileBomb;i++) {
	    		if(losowane[i]==los) {
	    			found=true;
	    			break
	    		}
	    	}
	    	if(!found) {
	    		losowane[losowane.length]=los;
		      kwadrat[los].bomba = true;
            }
  	  }
	  }

function klik(id) {
      document.getElementById(id).style.backgroundColor = "#C97A5B";
      if (kwadrat[id].bomba === true) {
        document.getElementById(id).innerHTML = "Bum!";
     //pokazuje wszystkie bomby po wybuchu
        for (i=0;i<pola;i++) {
          if (kwadrat[i].bomba === true) {
        document.getElementById(i).innerHTML = "Bum!";
        document.getElementById(i).style.backgroundColor = "#C97A5B";
          }
        //zmienia tło klikniętej bomby
        document.getElementById(id).style.backgroundColor = "#48345C";
        }
      }

      document.getElementById("test").innerHTML = "Numer: "+id+" Pozycja: "+kwadrat[id].pozycja+". Bomba: "+kwadrat[id].bomba;
    }

function plansza() {
  var body    = document.getElementsByTagName("body")[0];
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");
  tbl.id = "table";
  
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

		      row.appendChild(cell);
      }
       tblBody.appendChild(row);
    }
     tbl.appendChild(tblBody);
   body.appendChild(tbl);

  bomby();   

  }


