function Player (name, color, x, y) {
	this.name = name;
	this.color = color;
	this.width = 32;
	this.height = 32;
	this.speed = 4;
	this.position = {
		x: x,
		y: y
	};
	this.velocity = {
		x: 0,
		y: 0
	};
	this.isMoving = false;

	this.update = function() {
		if (this.isMoving) {
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			this.sendPositionToServer();
		}
	};

	this.draw = function() {
		noStroke();
		fill(this.color);
		rect(this.position.x, this.position.y, this.width, this.height);
	};

	this.sendPositionToServer = function() {
		if (socket !== undefined) {
			socket.emit('player', this);
		}
	}

	this.move = function(event) {
		switch(keyCode) {
			case 37:
			case 65:
				this.velocity.x = (event == 1) ? -this.speed : 0;
				this.isMoving = (event == 1);
			break;
			case 38:
			case 87:
				this.velocity.y = (event == 1) ? -this.speed : 0;
				this.isMoving = (event == 1);
			break;
			case 39:
			case 68:
				this.velocity.x = (event == 1) ? this.speed : 0;
				this.isMoving = (event == 1);
			break;
			case 40:
			case 83:
				this.velocity.y = (event == 1) ? this.speed : 0;
				this.isMoving = (event == 1);
			break;
		}
	};
}