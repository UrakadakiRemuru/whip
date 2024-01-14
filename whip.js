window.addEventListener('load',main,false);
function main() { 
	
	var N = document.getElementById('Num').value; 
	var a = document.getElementById('DIST').value; 
	var fps = document.getElementById('FPS').value; 
	var bm,dt,cm; 
	
	const pause_button = document.getElementById('Pause')

	prt = []; 
	var l_right, l_left, vx_dot, vy_dot;
	var sp = 1; 
	var flag = 0; 
	 
	var time = 0;
	
	var ctx = cnv.getContext('2d');
	var h = cnv.height;
	var w = cnv.width;
	

	function switchdt() {
		switch (flag) {
			case 0: {
				flag = 1;
				sp = 0;
				pause_button.value = '▶'
				break;
			}
			case 1: {
				flag = 0;
				sp = 1;
				pause_button.value = '||'
			}
		}
	}	


	Pause.onclick = function () { switchdt();}
	

	reload.onclick = function() {
		clearInt(interv);
		Update();
	}
	

	function Update() { 
		N = parseInt(document.getElementById('Num').value);
		cm = parseFloat(document.getElementById('CM').value);
		a = parseFloat(document.getElementById('DIST').value);
		dt0 = 0.01;
		bm = parseFloat(document.getElementById('B').value);
		fps = parseInt(document.getElementById('FPS').value);
		count(N, a);
		time = 0;
		a = Math.pow(Math.pow(prt[2].y - prt[1].y, 2) + Math.pow(prt[2].x - prt[1].x, 2), 1/2);
		interv = setInterval(control, 1000 / fps);
	}
	
	function count(NUM, dist) {
		var len = (NUM - 1) * dist;
		for (var i = 0; i < N; i++) { 
			el = [];
			el.x = 250 + dist * i; 
			el.y = 100;
			el.vx = 0;
			el.vy = 0;
			el.vx_dot = 0;
			el.vy_dot = 0;
			el.m = (NUM - i) / 10;
			prt[i] = el; 
			console.log(i, prt)
		}
	}
		
	function Euler() {  
		dt = dt0 * sp;
		for (var i = 4; i < N; i++) { 
			if(time < 300 * dt) 
			{
				prt[0].y = prt[1].y = prt[2].y = prt[3].y = 100 - 30 * Math.cos(4 * time); 
			}
			if(i == N - 1) {
				l_left = Math.pow(Math.pow(prt[i].x - prt[i - 1].x, 2) + Math.pow(prt[i].y - prt[i - 1].y, 2), 1/2);
			} else {
				l_right = Math.pow(Math.pow(prt[i + 1].x - prt[i].x, 2) + Math.pow(prt[i + 1].y - prt[i].y, 2), 1/2); 
				l_left = Math.pow(Math.pow(prt[i].x - prt[i - 1].x, 2) + Math.pow(prt[i].y - prt[i - 1].y, 2), 1/2); 
			}
			del_l_right = (l_right - a);
			del_l_left = (l_left - a);

			if (i == N - 1) {
				vx_dot = cm / prt[i].m * (-del_l_left * (prt[i].x - prt[i - 1].x) / l_left) - bm / prt[i].m * prt[N - 1].vx; 
				vy_dot = cm / prt[i].m * (-del_l_left * (prt[i].y - prt[i - 1].y) / l_left) - bm / prt[i].m * prt[N - 1].vy; 
			} else {
				vx_dot = cm / prt[i].m * (del_l_right * (prt[i + 1].x - prt[i].x) / l_right - del_l_left * (prt[i].x - prt[i - 1].x) / l_left) - bm / prt[i].m * prt[i].vx; 
				vy_dot = cm / prt[i].m * (del_l_right * (prt[i + 1].y - prt[i].y) / l_right - del_l_left * (prt[i].y - prt[i - 1].y) / l_left) - bm / prt[i].m * prt[i].vy; 
			}
			prt[i].vx_dot = vx_dot;
			prt[i].vy_dot = vy_dot;
			prt[i].vx += vx_dot * dt;
			prt[i].vy += vy_dot * dt;
		}

		for (var i = 0; i < N; i++) { 
			prt[i].x += prt[i].vx * dt;
			prt[i].y += prt[i].vy * dt;
		}
		time += dt;		
	}
	
	// Функция отрисовки
	function draw() { 
		ctx.clearRect(0, 0, w, h);
		for (var i = 0; i < N; i++) { 
			ctx.beginPath();
			ctx.arc(prt[i].x, prt[i].y, 5, 0, 2 * Math.PI);
			ctx.stroke();
		}
	}
	
	
	function control() { 
		Euler(); 
		draw();
	}


	function clearInt(intrv) { 
		clearInterval(intrv);
	}


	FPS.oninput = function () { 
		fps = parseInt(document.getElementById('FPS').value);
		clearInt(interv);
	}

	
	function UpdateCoeffs() {
		N = parseInt(document.getElementById('Num').value);
		cm = parseFloat(document.getElementById('CM').value);
		a = parseFloat(document.getElementById('DIST').value);
		dt0 = 0.01;
		bm = parseFloat(document.getElementById('B').value);
	}
	UpdateCoeffs();
	Update();

}