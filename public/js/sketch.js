let socket;
let canPrint;
let player;
let otherPlayer;
let xposition;
let yposition;
let status;

function setup() {
	createCanvas(600, 400);
	canPrint = true;
	player = new Player('HuntAndDestroy', 'Red', 0, 0);
	socket = io.connect('http://192.168.1.142:3000');
	socket.emit('player', player);
	socket.on('player', getNewPlayerData);
	xposition = document.getElementById('xposition');
	yposition = document.getElementById('yposition');
	status = document.getElementById('status');
}

function insertLine(message) {
	const line = document.createElement('div');
	line.innerHTML = message;
	status.appendChild(line);
	setTimeout(function(){
		line.style.opacity = 0;
		line.style.transition = 'opacity 1000ms';
		setTimeout(function(){
			line.parentNode.removeChild(line);
		}, 1000);
	}, 2000);
}

function getNewPlayerData(data) {
	otherPlayer = data;
	if (canPrint) {
		insertLine(data.name + ' player joined the game.');
		canPrint = false;
	}
}

function updatePlayer() {
	let name = document.getElementById('pname').value;
	name = (name === undefined) ? "Noobie" : name;
	const color = document.getElementById('pcolor').value;

	player.name = name;
	player.color = color;
	socket.emit('player', player);
}

function draw() {
	background(112, 146, 190);
	player.update();
	player.draw();
	if (otherPlayer !== undefined) {
		noStroke();
		fill(otherPlayer.color);
		rect(otherPlayer.position.x, otherPlayer.position.y, otherPlayer.width, otherPlayer.height);
	}
	xposition.innerText = player.position.x;
	yposition.innerText = player.position.y;
}

function keyPressed() {
	player.move(1);
}

function keyReleased() {
	player.move(0);
}
