let socket;
let player;
let otherPlayer;
let xposition;
let yposition;

function setup() {
	createCanvas(600, 400);
	player = new Player("HuntAndDestroy", "Red", 0, 0);
	socket = io.connect('http://localhost:3000');
	socket.on('player', getNewPlayerData);
	//socket = io.connect('http://192.168.0.108:3000');
	xposition = document.getElementById('xposition');
	yposition = document.getElementById('yposition');
}

// function connectToSocket() {
// 	const ipaddress = document.getElementById('ipaddress');
// 	const port = document.getElementById('port');
// 	socket = io.connect('http://' + ipaddress.value + ':' + port.value);
// 	alert('Connected to ' + ipaddress.value + ':' + port.value);
// }

function getNewPlayerData(data) {
	otherPlayer = data;
}

function draw() {
	background(112, 146, 190);
	if (otherPlayer !== undefined) {
		noStroke();
		fill(255);
		rect(otherPlayer.position.x, otherPlayer.position.y, otherPlayer.width, otherPlayer.height);
	}
	player.update();
	player.draw();
	xposition.innerText = player.position.x;
	yposition.innerText = player.position.y;
}

function keyPressed() {
	player.move(1);
}

function keyReleased() {
	player.move(0);
}