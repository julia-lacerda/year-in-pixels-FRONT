//variáveis que precisamos usar em uma ou mais funções
let currentId;
let valorId;

//variáveis para botar no gráfico
let dataAtual;
let excelent = 0;
let good = 0;
let normal = 0;
let bad = 0;
let awful = 0;
let allData = [];

// * APARECE O CARD DE MOODS
function colorir() {
    let card = document.getElementsByClassName('moods');
    card.moods.style.display = "flex";
}

// * DESAPARECE CARD DE MOODS
function voltar() {
    let card = document.getElementsByClassName('moods');
    card.moods.style.display = 'none';
}

// * Armazena o id e a data para podermos usá-los na aplicação
function armazenaIdEData(id, data) {


    console.log(id)

    console.log(allData[id])

    valorId = id;

   let valorIdBD = id - 1;

    console.log(allData[valorIdBD])

    // let url = `http://localhost:8080/epixel?id=${id}`;
    let pixel = document.getElementById("texto");
    let mood1 = document.getElementById("excelent");
    let mood2 = document.getElementById("good");
    let mood3 = document.getElementById("normal");
    let mood4 = document.getElementById("bad");
    let mood5 = document.getElementById("awful");


    document.getElementById("texto").value = allData[valorIdBD].texto

    // texto = 


    console.log("all => ", allData[valorIdBD]);
    console.log(id)

    // fetch(url)
    // .then(res => res.json())
    // .then((data) => {
    // console.log(data.id, data.humor, data.texto)
    pixel.textContent = data.texto;




    if (allData[valorIdBD].humor == 1) {
        mood1.checked = true;
    } else if (allData[valorIdBD].humor == 2) {
        mood2.checked = true;
    } else if (allData[valorIdBD].humor == 3) {
        mood3.checked = true;
    } else if (allData[valorIdBD].humor == 4) {
        mood4.checked = true;
    } else if (allData[valorIdBD].humor == 5) {
        mood5.checked = true;

    } else if (allData[valorIdBD].humor == 0) {
        mood1.checked = false;
        mood2.checked = false;
        mood3.checked = false;
        mood4.checked = false;
        mood5.checked = false;
    }


    // })

    dataAtual = data;
    document.getElementById("date").innerHTML = dataAtual;
}

// * Pega o valor do humor
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

// * Insere o humor e texto dentro do banco de dados
function inserirDados() {
    let humor = coloreQuadrado();
    let texto = document.getElementById("texto").value;
    let url = `http://localhost:8080/epixel?id=${valorId}&humor=${humor}&data=${dataAtual}&texto=${texto}`
    let Putmeth = {
        method: 'PUT',
        body: url,
        headers: {
            'Content-type': 'application/json'
        }
    }

    console.log(humor)
    fetch(url, Putmeth)
    if (humor == undefined) {
        alert("Necessário escolher um humor :)", console.log(humor));
    } else {
        alert("Dia enviado com sucesso!", location.reload());
    }
}

// * Redefine o pixel
function redefinircelula() {

    let id = valorId; // valor que está dentro da função armazenaid()
    let x = parseInt(id);

    let url = `http://localhost:8080/epixel?id=${x}`

    let PostMeth = {
        method: 'POST',
        body: url,
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch(url, PostMeth)
    alert("Dia redefinido com sucesso!", location.reload());
}


function getData() {
    let url = 'http://localhost:8080/epixel'

    fetch(url)
        .then(res => res.json())
        .then(data => show(data));
}

function show(data) {
    console.log(data);

    allData = data;



    for (let i = 0; i <= data.length; i++) {
        let pixel = document.getElementById(i + 1);
        if (data[i].humor == 1) {
            console.log("aqui");
            pixel.style.backgroundColor = "#256A3E";
            excelent++;
        } else if (data[i].humor == 2) {
            pixel.style.backgroundColor = "#399e5a";
            good++;
        } else if (data[i].humor == 3) {
            pixel.style.backgroundColor = "#F2E86D";
            normal++;
        } else if (data[i].humor == 4) {
            pixel.style.backgroundColor = "#337CA0";
            bad++;
        } else if (data[i].humor == 5) {
            pixel.style.backgroundColor = "#E85F5C";
            awful++;
        }
    }

}

// * Isso é para aparecer o gráfico. É algo da internet
setTimeout(function teste() {
    let excelentDay = [excelent];
    let goodDay = [good];
    let normalDay = [normal];
    let badDay = [bad];
    let awfulDay = [awful];

    const labels = [
        '2022'
    ];

    const data = {
        labels: labels,
        datasets: [{
                label: '😀',
                data: excelentDay,
                backgroundColor: [
                    '#256a3eae',
                ],
                borderColor: [
                    '#256A3E',
                ],
                borderWidth: 1
            },
            {
                label: "🙂",
                data: goodDay,
                backgroundColor: [
                    '#399e5bac',
                ],
                borderColor: [
                    '#399e5a',
                ],
                borderWidth: 1
            },
            {
                label: "🙂",
                data: normalDay,
                backgroundColor: [
                    '#f2e76db3',
                ],
                borderColor: [
                    '#F2E86D',
                ],
                borderWidth: 1
            },
            {
                label: "😐",
                data: badDay,
                backgroundColor: [
                    '#337ca0a3',
                ],
                borderColor: [
                    '#337CA0',
                ],
                borderWidth: 1
            },
            {
                label: "😞",
                data: awfulDay,
                backgroundColor: [
                    '#e85e5cb0',
                ],
                borderColor: [
                    '#E85F5C',
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
}, 1000)