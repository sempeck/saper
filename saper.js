function saper () {
	r = 8; //rozmiar planszy
	ileBomb = 10;
	ileFlag = ileBomb;
	pola = r*r; //ilość pól
	nr = -1; // numer pola
	kwadrat = []; // tablica z polami i ich wartościami
	wybuch = false;
	pierwszy = true;

  plansza();
  bomby(); 
  licznik();
  zegar();

}

function klik(id) {
      if (pierwszy) {
    	// start zegara;
      	if (kwadrat[id].bomba) {
      		while (kwadrat[id].bomba) {
	      		for (var i=0;i<pola;i++) {
	      			kwadrat[i].bomba = false;
	      			kwadrat[i].licznik = 0;
	      		}	
	      		bomby();
	      		licznik();
           }
    	}
    }
	  pierwszy = false;
	  if (!kwadrat[id].flaga && !wybuch){
      odkryty(id);
    }

// test
      document.getElementById("test").innerHTML = "Numer: "+id+" Flaga: "+kwadrat[id].flaga+". Bomba: "+kwadrat[id].bomba+". Sąsiedzi: "+kwadrat[id].sasiedzi+". Licznik: "+kwadrat[id].licznik+". Odkryty: "+kwadrat[id].odkryty;
    }

    //matryca dla nowych kwadratów
function Kwadrat(odkryty,bomba,flaga,licznik,sasiedzi) {
      this.odkryty = odkryty;
      this.bomba = bomba;
      this.flaga = flaga;
      this.licznik = licznik;
      this.sasiedzi = sasiedzi;
    }

function nowyKwadrat(nr) {
    kwadrat[nr] = new Kwadrat(false,false,false,0,[]);
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

function flaga (id) {
	 if (!kwadrat[id].odkryty) { 
	 	     if(kwadrat[id].flaga) {
				   	kwadrat[id].flaga = false;
				   	document.getElementById(id).className = "zakryty";
				   	ileFlag ++;
				   }
				 else {
				   kwadrat[id].flaga = true;
				   document.getElementById(id).className = "flaga";
            ileFlag --;
				     }
    zegar1.innerHTML = ileFlag;
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

function odkryty (id) {

    kwadrat[id].odkryty = true;

    document.getElementById(id).className = "odkryty";

    // if któryś z sąsiadów ma licznik 0 to odsłoń go
    // przejdź do sąsiada i sprawdź czy któryś z sąsiadów ma licznik 0


      if (kwadrat[id].licznik !== 0 && kwadrat[id].bomba !== true) {
      document.getElementById(id).innerHTML = kwadrat[id].licznik;
      }
      if (kwadrat[id].bomba) {
        document.getElementById(id).className += " bum";
        wybuch = true;
        // stop zegara
     
     //pokazuje wszystkie bomby po wybuchu
        for (var i=0;i<pola;i++) {
          if (kwadrat[i].bomba && !kwadrat[i].flaga) {
        document.getElementById(i).className = "bum";
        document.getElementById(i).className += " odkryty";
          }

          if (kwadrat[i].flaga && !kwadrat[i].bomba) {
        document.getElementById(i).className = "odkryty flaga_zle";
          }
        //zmienia tło klikniętej bomby
        document.getElementById(id).className += " odkryty_granat";
        }
      }
}

function zegar () {
	  var zegar_div = document.getElementById("zegar");

  	  zegar = document.createElement("div");
        zegar.className = "zegar";	    

		    zegar1 = document.createElement("div");
		    zegar1.className = "zegar1";
		    zegar1.innerHTML = ileFlag;
		    zegar.appendChild(zegar1);

				zegar2 = document.createElement("div");
				zegar2.className = "zegar2";
				zegar2.innerHTML = "SAPER";
				zegar2.onclick = function () {location.reload();}
		    zegar.appendChild(zegar2);
	      
	      zegar3 = document.createElement("div");
				zegar3.className = "zegar3";
				zegar3.innerHTML = "000";  
	   		zegar.appendChild(zegar3);

	  zegar_div.appendChild(zegar);
}

function plansza() {
	
  var plansza = document.getElementById("plansza");
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");

  tbl.id = "table";
  
  for (var y = 0; y < r; y++) {
    var row = document.createElement("tr");
      for (var x = 0; x < r; x++) {
		      var cell = document.createElement("td");
            nr++;
            nowyKwadrat(nr);
            cell.id = nr;

// nie działa w safari
            cell.oncontextmenu = function() {
            	flaga(this.id);
            	return false;
            };

            cell.onclick = function() {
            	klik(this.id);
            };

		      row.appendChild(cell);
      }
       tblBody.appendChild(row);
    }
     tbl.appendChild(tblBody);
   plansza.appendChild(tbl);

  }
