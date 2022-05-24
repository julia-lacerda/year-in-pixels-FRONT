let currentId;
let valorid;
let valordata;
let nome;
let a = 0;
let b = 0;
let c = 0;
let d = 0;
let e = 0;


let teste2;
let teste3 = parseInt(teste2)


function colorir() {
    let card = document.getElementsByClassName('moods');
    card.moods.style.display = "flex";
}

function voltar() {
    let card = document.getElementsByClassName('moods');
    card.moods.style.display = 'none';
}

function coloreQuadrado() {

    let x = document.getElementsByName("mood")
    let currentMood;

    for (i = 0; i < x.length; i++) {

        if (x[i].checked === true) {
            currentMood = x[i].value;
        }
    }


    return (currentMood)

}

function armazenaid(id) {
    valorid = id;
    let url = `http://localhost:8080/epixel?id=${id}`;
    let pixel = document.getElementById("texto");
    let mood1 = document.getElementById("super-happy");
    let mood2 = document.getElementById("happy");
    let mood3 = document.getElementById("neutral");
    let mood4 = document.getElementById("sad");
    let mood5 = document.getElementById("super-sad");

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data.id, data.humor, data.texto)
            pixel.textContent = data.texto;
            if (data.humor == 1) {
                mood1.checked = true;
            } else if (data.humor == 2) {
                mood2.checked = true;
            } else if (data.humor == 3) {
                mood3.checked = true;
            } else if (data.humor == 4) {
                mood4.checked = true;
            } else if (data.humor == 5) {
                mood5.checked = true;

            } else if (data.humor == 0) {
                mood1.checked = false;
                mood2.checked = false;
                mood3.checked = false;
                mood4.checked = false;
                mood5.checked = false;
            }


        })

}

function armazenadata(data) {
    valordata = data;
    document.getElementById("name").innerHTML = nome;
    document.getElementById("date").innerHTML = valordata;
}

function inserirDados() {

    let humor = coloreQuadrado();
    let texto = document.getElementById("texto").value;
    let url2 = `http://localhost:8080/epixel?id=${valorid}&humor=${humor}&data=${valordata}&texto=${texto}`
    let Putmeth = {
        method: 'PUT',
        body: url2,
        headers: {
            'Content-type': 'application/json'
        }
    }
    console.log(humor)
    fetch(url2, Putmeth)
    if (humor == undefined) {
        alert("Necessário escolher um humor :)", console.log(humor));
    } else {
        alert("Dia enviado com sucesso!", location.reload());

    }


}

function redefinircelula() {

    let id = valorid;
    let x = parseInt(id);


    let url3 = `http://localhost:8080/epixel?id=${x}`


    let PostMeth = {
        method: 'POST',
        body: url3,
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch(url3, PostMeth)
    alert("Dia redefinido com sucesso!", location.reload());
}

function alterarnome() {

    nome = window.prompt("Como você gostaria de ser chamado?", "nome", nome);
    let url5 = `http://localhost:8080/epixel?id=${367}&nome=${nome}`
    let Delmeth = {
        method: 'PATCH',
        body: url5,
        headers: {
            'Content-type': 'application/json'
        }

    }
    fetch(url5, Delmeth)
    location.reload();

}

function consultanome() {
    let url5 = `http://localhost:8080/epixel?id=${367}`;
    fetch(url5)
        .then(res => res.json())
        .then((data) => {
            nome = data.nome;
        })
}

function preencherquadrado() {

    for (let i = 1; i <= 365; i++) {
        let url = `http://localhost:8080/epixel?id=${i}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                let button = document.getElementById(data.id);
                if (data.humor == 1) {
                    button.style.backgroundColor = "rgb(58, 96, 65)";
                } else if (data.humor == 2) {
                    button.style.backgroundColor = "green";
                } else if (data.humor == 3) {
                    button.style.backgroundColor = "yellow";
                } else if (data.humor == 4) {
                    button.style.backgroundColor = "orange";
                } else if (data.humor == 5) {
                    button.style.backgroundColor = "red";
                }

            })

    }

}

async function preenchergraf() { //!! o que cada função faz

    for (let i = 1; i <= 365; i++) {
        let url = `http://localhost:8080/epixel?id=${i}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                if (data.humor == 1) {
                    a++;
                } else if (data.humor == 2) {
                    b++;
                } else if (data.humor == 3) {
                    c++;
                } else if (data.humor == 4) {
                    d++;
                } else if (data.humor == 5) {
                    e++;
                }

            })

    }

}


 setTimeout(function teste() {
    let dados1 = [a];
    let dados2 = [b];
    let dados3 = [c];
    let dados4 = [d];
    let dados5 = [e];

    const labels = [
        '2022'
    ];

    const data = {
        labels: labels,
        datasets: [{
                label: '😀',
                data: dados1,
                backgroundColor: [
                    'rgba(0,191,255, 0.2)',
                ],
                borderColor: [
                    'rgb(0,191,255)',
                ],
                borderWidth: 1
            },
            {
                label: "🙂",
                data: dados2,
                backgroundColor: [
                    'rgba(0,100,0, 0.3)',
                ],
                borderColor: [
                    'rgb(34,139,34)',
                ],
                borderWidth: 1
            },
            {
                label: "🙂",
                data: dados3,
                backgroundColor: [
                    'rgba(255,255,0, 0.3)',
                ],
                borderColor: [
                    'rgb(255,255,0)',
                ],
                borderWidth: 1
            },
            {
                label: "😐",
                data: dados4,
                backgroundColor: [
                    'rgba(255,140,0, 0.3)',
                ],
                borderColor: [
                    'rgb(255,140,0)',
                ],
                borderWidth: 1
            },
            {
                label: "😞",
                data: dados5,
                backgroundColor: [
                    'rgba(255,0,0, 0.3)',
                ],
                borderColor: [
                    'rgb(255,0,0)',
                ],
                borderWidth: 1
            }
        ]
    }

    const config = {
        type: 'bar',
        data: data,
        options: {}
    };


    const myChart = new Chart(
        document.getElementById('grafico'),
        config
    );
}, 10000)
