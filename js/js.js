var y = 10;
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var activo = true;

//Cuando carga la página:
window.onload = function(){
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	//Empezar a mover la nave:
	start();
}

function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
    activo = true;
}

function stop(){
	clearInterval(timer);
    activo = false;
}

function reiniciar(){
		stop();
    y = 10;
    v = 0;
    g = 1.622;
    a = g;
    dt = 0.016683;
    timer=null;
    timerFuel=null;
    fuel=100;
    activo = true;
		motorOff();
    document.getElementById("fin").style.display="none";
    document.getElementById("fin_juego").innerHTML="¡Juego finalizado!";
    document.getElementById("game").innerHTML="Game over! Inténtalo de nuevo para mejorar y poder ganar. ¡Que la suerte te acompañe!";
    document.getElementById("showmenu").style.display="block";
		start();
    document.getElementById("fuel").innerHTML=fuel.toFixed(2);
}
function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=(72-y).toFixed(2);

	if (y<72){
		document.getElementById("nave").style.top = y+"%";
	} else {
        if(v<5){
            document.getElementById("showmenu").style.display="none";
            document.getElementById("fin_juego").innerHTML="¡Bien hecho!";
            document.getElementById("game").innerHTML="You win this time! Juega otra vez para asegurarte de que eres realmente bueno.";
        } else{
            document.getElementById("showmenu").style.display="none";
            document.getElementById("cohete").src="img/explosion.png";
        }
		stop();
        fin();
	}
}
function motorOn(){
    if (activo){
        a=-g;
        if (timerFuel==null)
        timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
        document.getElementById("cohete").src="img/nave_on.png";
    }
}
function motorOff(){
	if(activo){
    a=g;
	clearInterval(timerFuel);
	timerFuel=null;
    document.getElementById("cohete").src="img/nave_off.png";
    }
}
function actualizarFuel(){
    if (activo) {
        if(y<=72){
            fuel -= 0.2;
            if (fuel<=0){
                fuel = 0;
                motorOff();
            }
        }
    }
	document.getElementById("fuel").innerHTML=fuel.toFixed(3);
}
function pausar(){
    stop();
    document.getElementById("c").style.display="inline-block";
}
function reanudar(){
    document.getElementById("c").style.display="none";
    start();
}
function fin(){
    document.getElementById("fin").style.display="block";
    activo = false;
}
