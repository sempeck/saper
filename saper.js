var r = 8; //rozmiar planszy
var ileBomb = 20;
var pola = r*r; //ilość pól
var nr = -1;
var kwadrat = [];

    //matryca dla nowych kwadratów
function Kwadrat(pozycja,bomba,flaga,licznik,sasiedzi) {
      this.pozycja = pozycja; // potrzebne?
      this.bomba = bomba;
      this.flaga = flaga;
      this.licznik = licznik;
      this.sasiedzi = sasiedzi;
    }

function nowyKwadrat(nr,x,y) {
    kwadrat[nr] = new Kwadrat([x,y],false,false,0,[]);
// funkcja sasiedzi ... 
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


function sasiedzi () {
	kwadrat[1].sasiedzi = [0,3];
	kwadrat[0].sasiedzi = [0,3];
     
// pobierz id
// rozłóż na x,y
// wykonaj działania na x,y
// odrzuć x>7 i y>7 (czyli r-1)
// z powrotem do id
// umieść w tablicy kwadrat.sasiedzi

         
//              y-1
//              y    x-1, x, x+1
//              y+1 
      

//           -(r+1) -(r) -(r-1) 
//              -1   id     +1
//           +(r-1)  +r  +(r+1)

//    x + (y*r) = id
//    id div r = y
//    id - (y * r) = x
    
}

function licznik () {
	// pobierz kwadrat[id].sasiedzi
	// sprawdź czy bomba = true każdego sąsiada podstawiając w miejsce id
	// za każdy hit dodaj 1 do licznika

    kwadrat[5].licznik = 5;
    kwadrat[1].licznik = 3; //testowo
}

function klik(id) {
      document.getElementById(id).className = "odsloniety";

      if (kwadrat[id].licznik !== 0) {
      document.getElementById(id).innerHTML = kwadrat[id].licznik;
      }
      if (kwadrat[id].bomba === true) {
        document.getElementById(id).className += " bum";
     //pokazuje wszystkie bomby po wybuchu
        for (i=0;i<pola;i++) {
          if (kwadrat[i].bomba === true) {
        document.getElementById(i).className = "bum";
        document.getElementById(i).className += " odsloniety";
          }
        //zmienia tło klikniętej bomby
        document.getElementById(id).className += " odsloniety_granat";
        }
      }

      document.getElementById("test").innerHTML = "Numer: "+id+" Pozycja: "+kwadrat[id].pozycja+". Bomba: "+kwadrat[id].bomba+". Sąsiedzi: "+kwadrat[id].sasiedzi+". Licznik: "+kwadrat[id].licznik;
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
  licznik();

  }

