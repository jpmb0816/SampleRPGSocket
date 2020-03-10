let socket;
let player;
let otherPlayer;
let xposition;
let yposition;
let status;

function setup() {
	createCanvas(600, 400);
	player = new Player('HuntAndDestroy', 'Red', 0, 0);
	socket = io.connect('http://192.168.1.142:3000');
	socket.emit('player', player);
	socket.on('player', getNewPlayerData);
	xposition = document.getElementById('xposition');
	yposition = document.getElementById('yposition');
	status = document.getElementById('status');
}

function getNewPlayerData(data) {
	otherPlayer = data;
	status.innerText = data.name + ' player joined the game.';
}

function updatePlayer() {
	const name = document.getElementById('pname').value;
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
