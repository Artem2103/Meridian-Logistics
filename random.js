dataPoints = []

const buttos = document.getElementById("btn-add");

buttos.addEventListener('click', function(event){
    dataPoints.push(Math.floor(Math.random()*100)+1)
    console.log(dataPoints)
});

const lielement = document.getElementById("element")
const lis = document.getElementById("data-list")
console.log(lis)