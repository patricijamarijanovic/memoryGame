
const BR_SLIKA = 8;
document.querySelector('.gotovo').classList.add('hidden');

let pocela = false;
let zavrsila = false;

// Funkcija za miješanje elemenata niza (Fisher-Yates algoritam)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function izaberi_slike(){

    // Kopiramo niz slika iz data.js
    const copiedImages = [...data];
    console.log("copied images:",copiedImages);

    indeksi = [];
    for (let i = 0; i < BR_SLIKA*2; i++){
        indeksi.push(i);
    }

    // Stvaramo prazan niz za odabrane slike
    const selectedImages = {};


    let polja = document.querySelectorAll(".tile");
    // U petlji odaberemo BR_SLIKA jedinstvenih slika
    let index1, index2;
    for (let i = 0; i < BR_SLIKA; i++) {
        shuffleArray(copiedImages); // Miješamo kopirani niz slika
        const selectedImage = copiedImages.pop(); // Odaberemo prvu sliku iz miješanog niza i dodamo je u niz odabranih slika
        
        shuffleArray(indeksi);
        index1 = indeksi.pop();
        index2 = indeksi.pop();

        // Stvaranje img elementa
        let img1 = document.createElement('img');
        let img2 = document.createElement('img');
 
        // Postavljanje atributa src na putanju slike
        img1.src = selectedImage;
        img2.src = selectedImage;
 
        // Dodavanje img elementa u div
        polja[index1].appendChild(img1);
        polja[index2].appendChild(img2);

        selectedImages[selectedImage] = [index1, index2];
    }

}

// stvaranje polja
for (let i = 0; i < BR_SLIKA*2; i++){
    let box = document.createElement('div');
    box.className = 'tile';
    document.querySelector('.game-container').appendChild(box);
}

izaberi_slike();

let odabran_prvi = false;
let prvi;
let br_pokusaja = 0;
let br_pogodenih = 0;
let provjera_pogotka = false;


let polja = document.querySelectorAll(".tile");
for (let el of polja){
    el.addEventListener("click", () => {
        if (el.classList.contains("disabled") || provjera_pogotka) {
            return; // Prekini izvršavanje ako je polje već odabrano
        }

        el.querySelector('img').style.display = "block";

        if (!odabran_prvi || el !== prvi){
            if (odabran_prvi == false){
                prvi = el;
                br_pokusaja++;
                odabran_prvi = true;
            }else{
                if (el.querySelector('img').src == prvi.querySelector('img').src){
                    el.classList.add("disabled");
                    prvi.classList.add("disabled");
                    odabran_prvi = false;
                    br_pogodenih++;
                    if (br_pogodenih === BR_SLIKA) {
                        document.querySelector('.gotovo').classList.remove('hidden');
                        document.querySelector('.game-container').classList.add('hidden');
                        document.querySelector('.naziv').classList.add('hidden');
                    }

                }else {
                    provjera_pogotka = true;
                    setTimeout(() => {
                        el.querySelector('img').style.display = 'none';
                        prvi.querySelector('img').style.display = 'none';
                        provjera_pogotka = false; 
                    }, 1000);
                    odabran_prvi = false;
                }
                
            }
        }
        
    })
}



