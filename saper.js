var r = 8; //rozmiar planszy
var ileBomb = 20;
var pola = r*r; //ilość pól
var nr = -1; // numer pola
var kwadrat = []; // tablica z polami i ich wartościami

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
    sasiedzi(); 
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
   var sasiad = 0;
   var y = Math.floor(nr / r);
   var x = nr - (y * r); 

   for(var i=-1;i<2;i++){
       var yy = 0;
        yy = y+i;
        if (yy<r && yy>=0) {
          for(var j=-1;j<2;j++){
             var xx = 0;
              xx = x+j;
    			   if (xx<r && xx>=0) {
					sasiad = xx + (yy*r);
					if (sasiad != nr) { // wyklucza samą siebie z listy
					kwadrat[nr].sasiedzi.push(sasiad);
				                     }
                      }
               }
       }
   }
}

function licznik () {
  for (var i=0;i<pola;i++){
  	for (var j=0;j<kwadrat[i].sasiedzi.length;j++) {
         var z = kwadrat[i].sasiedzi[j];  		
  		if (kwadrat[z].bomba === true) {
  			kwadrat[i].licznik ++;
  		}
  	}
   }
  }

function klik(id) {
      document.getElementById(id).className = "odsloniety";

      if (kwadrat[id].licznik !== 0 && kwadrat[id].bomba !== true) {
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
