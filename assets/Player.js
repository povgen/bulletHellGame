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
