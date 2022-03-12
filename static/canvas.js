var canvas = document.querySelector('canvas');

canvas.width = 1000;
canvas.height = 1000;
console.log(canvas);

var lat = 100;
var long = 100;
var board;

fetch('localhost:8080/getBitBoard')
    .then(response => {
        return response.data();
    })
    .then(text => board = data)
    
var c = canvas.getContext('2d');
c.fillStyle = board;
c.fillRect(lat, long, 10, 10);

/*for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
        c.fillStyle = board[i]][j];
        c.fillRect(lat, long, 10, 10);
    }
}*/

/*for (var i = 0; i < 100; i++) {
    for (var j =0; j < 100; j++) {
        c.fillStyle = '#ffffff';
        c.fillRect(lat, long, 10, 10);
        lat = lat + 10;
    }
    long = long + 10;
    lat = 0;
}*/