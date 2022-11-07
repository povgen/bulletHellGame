function getRadians(degrees) {
    return (Math.PI / 180) * degrees;
}
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hasCollision(obj1, obj2) {

    return ((obj1.position.x < obj2.position.x && obj2.position.x < (obj1.position.x + obj1.width))
            && (obj1.position.y < obj2.position.y && obj2.position.y < (obj1.position.y + obj1.height)) )
        || ((obj2.position.x < obj1.position.x && obj1.position.x < (obj2.position.x + obj2.width))
            && (obj2.position.y < obj1.position.y && obj1.position.y < (obj2.position.y + obj2.height)) );
}


