
/** position 	- начальные координаты снаряда(x,y)
 * 	direction 	- направление выстрела в радинах
 *	speed		- скорость полёта снаряда
 */
function Bullet(x, y, direction, speed = 1000)
{
    this.position = {x,y};
    this.position.x = x;
    this.position.y = y;
    this.direction = direction;
    this.speed = speed;
    this.fly = function(dt) {
        this.position.x += dt * Math.sin(this.direction) * this.speed;
        this.position.y += dt * Math.cos(this.direction) * this.speed;
    }
}
var bullets = [];
var enemyBullets = [];

function FirstAid(x,y,value = 50)
{
    this.width = 25,
        this.height = 25,
        this.position = {x,y};
    this.position.x = x;
    this.position.y = y;
    this.value = value;
}

var firstAidList = [];

function Ammo(x,y,value = 15)
{
    this.width = 25,
        this.height = 25,
        this.position = {x,y};
    this.position.x = x;
    this.position.y = y;
    this.value = value;
}

var ammoList = [];

function shoot(x,y) {
    if (0 >= player.currentAmmo)
        return;

    player.currentAmmo--;
    let xDelta = (x - player.position.x);
    let yDelta = (y - player.position.y);
    let dir    = Math.atan2(xDelta, yDelta);
    bullets.push(new Bullet(player.position.x, player.position.y, dir));
}

function shootToPlayer(x,y) {
    let xDelta = (player.position.x +15 - x );
    let yDelta = (player.position.y +20 - y);
    let dir    = Math.atan2(xDelta, yDelta);
    enemyBullets.push(new Bullet(x, y, dir));
}



var target = {
    position: { x:1000.0, y:300.0 },
    height: 50,
    width: 25,
    health: 100,
    speed: 150,
}

var player = {
    position: { x:50, y:50 },
    height: 50,
    width: 30,
    speed: 150,
    ammo:150,
    currentAmmo: 5,
    capacity: 100,
    score: 0,
    kills: 0,
    health: 100,
    stamina : 1000,
};


var canvas = document.getElementById("example"),
    ctx     = canvas.getContext('2d');


function handleInput(dt) {

    let acceleration = 1;

    if(input.isDown('SHIFT')) {
        if(player.stamina > 0) {
            acceleration = 2;
            player.stamina -= 3;
        }
    } else if (player.stamina < 1000) {
        if (!input.isDown('SPACE'))
            player.stamina += 10;

    }

    let playerSpeed = player.speed * acceleration;


    if(input.isDown('DOWN') || input.isDown('s')) {
        player.position.y += playerSpeed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        player.position.y -= playerSpeed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        player.position.x -= playerSpeed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.position.x += playerSpeed * dt;
    }

    if (input.isDown('R')) {
        if (player.ammo > 0)
        {
            let delta = player.capacity - player.currentAmmo;
            let ammoLoad = delta <= player.ammo ? delta : player.ammo;

            player.currentAmmo += ammoLoad;
            player.ammo -= ammoLoad;
        }
    }
}

var frameNum = 0;
var countShoot = 0;
var isShooting = true;
var targetIsMoveUp = false;







var obj = {
    position: { x:300, y:300 },
    height: 100,
    width: 100,
    color: 'orange',
}

var objects = [
    new BaseObject(300, ),
    new BaseObject(100, 200),
    new Btn(300, 300)
]
function update(dt)
{
    objects.forEach(el => el.update());
    // if(player.health <= 0) {
    //     alert('Game over');
    //     location.reload();
    // }

    /** перемещение персонажа */
    if(player.health > 0)
        handleInput(dt);

    /** Стрельба */
    if(player.health > 0)
        if (mouseInput.isClicked && frameNum % 5 > 3) {shoot(mouseInput.position.x, mouseInput.position.y);}

    if (countShoot > 2) isShooting = false;
    if (countShoot == 0) isShooting = true;

    if (frameNum % 5 > 3 && target.health > 0) {
        if (isShooting) {
            shootToPlayer(target.position.x, target.position.y);
            countShoot++;
        } else if(frameNum % 20 > 18)
            countShoot--;
    }


    let damage = 7;
    /** расчёт полёта снарядов */
    bullets.forEach((bullet, index) => {
        bullet.fly(dt);
        if(hasCollision(bullet, target) && target.health > 0) {
            target.health -= target.health - damage >= 0 ? damage : target.health;
            player.score+=3;
            bullets.splice(index, 1);

            if (target.health == 0) {
                player.kills++;
                if(getRndInteger(0,2) === 0)
                    firstAidList.push(new FirstAid(getRndInteger(0,canvas.width), getRndInteger(0,canvas.height)));

                ammoList.push(new Ammo(getRndInteger(0,canvas.width), getRndInteger(0,canvas.height)));

            }
        }



        if (bullet.position.x > canvas.width || bullet.position.x < 0 || bullet.position.y > canvas.height ||  bullet.position.y < 0)
            bullets.splice(index, 1);
    });

    enemyBullets.forEach((bullet, index) => {

        bullet.fly(dt);

        if(hasCollision(bullet, player) && player.health > 0) {
            player.health -= player.health - damage >= 0 ? damage : player.health;
            player.score-=1;
        }

        if (bullet.position.x > canvas.width || bullet.position.x < 0 || bullet.position.y > canvas.height ||  bullet.position.y < 0)
            enemyBullets.splice(index, 1);
    });

    firstAidList.forEach((item, index) => {
        if (hasCollision(item, player)) {
            if(player.health < 100) {
                player.health += (player.health+item.value) < 100 ? item.value : (100 - player.health);
                firstAidList.splice(index, 1);
            }
        }
    });

    ammoList.forEach((item, index) => {
        if (hasCollision(item, player)) {
            player.ammo += item.value;
            ammoList.splice(index, 1);
        }
    });

    if (target.health > 0)
    {
        if (targetIsMoveUp && (target.position.y +target.speed) > 500)
            targetIsMoveUp = false;

        if (!targetIsMoveUp && (target.position.y +target.speed) < 200)
            targetIsMoveUp = true;

        if (targetIsMoveUp)
            target.position.y += target.speed*dt;
        else
            target.position.y -= target.speed*dt;
    }

    if ( frameNum > 60)
        frameNum = 0;
    else
        frameNum++;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach(el => el.render());

    ctx.fillStyle = "orange";

    ctx.fillRect(obj.position.x, obj.position.y, obj.width, obj.height);
    ctx.fillRect(target.position.x, target.position.y, target.width, target.height);
    ctx.fillStyle = "red";

    firstAidList.forEach(item => {
        ctx.fillRect(item.position.x, item.position.y, item.width, item.height);
        ctx.strokeRect(item.position.x, item.position.y, item.width, item.height);
    });
    ctx.fillStyle = "green";

    ammoList.forEach(item => {
        ctx.fillRect(item.position.x, item.position.y, item.width, item.height);
        ctx.strokeRect(item.position.x, item.position.y, item.width, item.height);
    });
    ctx.fillStyle = "red";

    ctx.fillRect(target.position.x -35, target.position.y -20, target.health, 10);
    ctx.strokeRect(target.position.x -35, target.position.y -20, 100, 10);


    ctx.fillRect(player.position.x -35, player.position.y -35, player.health, 10);
    ctx.strokeRect(player.position.x -35, player.position.y -35, 100, 10);

    ctx.fillStyle = "green";

    ctx.fillRect(player.position.x -35, player.position.y -20, player.stamina/10, 10);
    ctx.strokeRect(player.position.x -35, player.position.y -20, 100, 10);

    ctx.fillStyle = "black";



    ctx.fillRect(player.position.x, player.position.y, player.width, player.height);



    bullets.forEach( item => {
        ctx.beginPath();
        ctx.arc(item.position.x, item.position.y, 4, 0, getRadians(360));
        ctx.fill();
    });

    enemyBullets.forEach( item => {
        ctx.beginPath();
        ctx.arc(item.position.x, item.position.y, 4, 0, getRadians(360));
        ctx.fill();
    });
    ctx.font = '30px serif';
    ctx.fillText('Боезапас ' + player.ammo + ' / ' + player.currentAmmo , canvas.width -500, 100);
    ctx.fillText('Счёт: ' +player.score +' Убийств: ' + player.kills, canvas.width -500, 50);


}



/** Игровой цикл */
/** объект для взаимодействия с игровым циклом */
class GameLoop {
    static lastTime = Date.now();
    static isStop;

    static start () {
        GameLoop.isStop = false;
        GameLoop.lastTime = Date.now();
        this.main();
    };

    static stop () {
        GameLoop.isStop = true;
    }

    static main() {
        if (GameLoop.isStop) return;

        let acceleration = 1;
        if(input.isDown('SPACE')) {
            if(player.stamina > 0) {
                acceleration = .2;
                player.stamina -= 5;
                player.speed = 300;
            }else {
                player.speed =150;}
        } else if (player.stamina < 1000) {
            if (!input.isDown('SHIFT'))
                player.stamina += 10;

            player.speed =150;
        }
        let now = Date.now();
        let dt = (now - GameLoop.lastTime) * 0.001*acceleration; //1000.0;
        update(dt);
        render();

        GameLoop.lastTime = now;
        requestAnimationFrame(GameLoop.main);
    };

}
