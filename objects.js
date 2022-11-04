function draw(pos, w, h, c = 'black', bc = null) {
    ctx.fillStyle = c;
    ctx.fillRect(pos.x, pos.y, w, h);

    if (bc) {
        ctx.strokeStyle = bc;
        ctx.strokeRect(pos.x, pos.y, w, h);
    }
}

class BaseObject {
    height      = 100;
    width       = 100;
    color       = 'black';
    borderColor = null;

    constructor(x = 0, y = 0) {
        this.position = {x, y};
    }

    render() { draw(this.position, this.width, this.height, this.color, this.borderColor); }

    update (dt) {    }
}

class Player extends BaseObject {
    width       = 30;
    height      = 50;
    speed       = 150;
    ammo        = 150;
    currentAmmo = 5;
    capacity    = 100;
    score       = 0;
    kills       = 0;
    health      = 100;
    stamina     = 1000;

    render () {
        super.update();
        draw({x: this.position.x - 35, y: this.position.y -35}, this.health, 10, 'red', 'black');
        draw({x: this.position.x - 35, y: this.position.y -25}, this.stamina/10, 10, 'green', 'black');

        ctx.font = '30px serif';
        ctx.fillText('Боезапас ' + this.ammo + ' / ' + this.currentAmmo , canvas.width -500, 100);
        ctx.fillText('Счёт: ' +this.score +' Убийств: ' + this.kills, canvas.width -500, 50);
    }

    update(dt) {
        /** перемещение персонажа */
        if(this.health > 0) handleInput(dt, this);

        /** Стрельба */
        if(this.health > 0)
            if (mouseInput.isClicked && frameNum % 5 > 3) {shoot(mouseInput.position.x, mouseInput.position.y);}
    }
}

class Btn extends BaseObject {
    color = 'orange'
    update() {
        if (hasCollision(player, obj))
        {
            if (target.health <= 0)
                target.health = 100;
        }
    }
}

// var player = {
//     position: { x:50, y:50 },
//     height: 50,
//     width: 30,
//     speed: 150,
//     ammo:150,
//     currentAmmo: 5,
//     capacity: 100,
//     score: 0,
//     kills: 0,
//     health: 100,
//     stamina : 1000,
// };
