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
