document.addEventListener('DOMContentLoaded', () => {
    const lettersContainer = document.getElementById('letters');
    const imagesContainer = document.getElementById('images');
    const feedbackElement = document.getElementById('feedback');
    const correctCountElement = document.getElementById('correct-count');
    const errorCountElement = document.getElementById('error-count');
    const timerElement = document.getElementById('timer');
    const popupElement = document.getElementById('popup');
    const timeSpentElement = document.getElementById('time-spent');
    const restartButton = document.getElementById('restart-button');


    const words = {
        'A': 'Abelha',
        'B': 'Bola',
        'C': 'Casa',
        'D': 'Dado',
        'E': 'Elefante',
        'F': 'Flor',
        'G': 'Gato',
        'H': 'Helicóptero',
        'I': 'Igreja',
        'J': 'Jacaré',
        'K': 'Kiwi',
        'L': 'Lápis',
        'M': 'Maçã',
        'N': 'Navio',
        'O': 'Ovelha',
        'P': 'Pato',
        'Q': 'Queijo',
        'R': 'Rato',
        'S': 'Sapo',
        'T': 'Tartaruga',
        'U': 'Urso',
        'V': 'Vaca',
        'W': 'Wifi',
        'X': 'Xícara',
        'Y': 'Yakisoba',
        'Z': 'Zebra'
    };

    const allLetters = Object.keys(words);
    let usedLetters = [];
    let correctCount = 0;
    let errorCount = 0;
    let matches = 0;
    let timer = 0;
    let timerInterval;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function getNextRound() {
        shuffle(allLetters);
        const roundLetters = allLetters.slice(0, 5);
        usedLetters = usedLetters.concat(roundLetters);
        return roundLetters;
    }

    function startTimer() {
        timer = 0;
        timerElement.textContent = timer;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer++;
            timerElement.textContent = timer;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function loadRound() {
        const roundLetters = getNextRound();
        lettersContainer.innerHTML = '';
        imagesContainer.innerHTML = '';
        feedbackElement.textContent = '';
        matches = 0;
        startTimer();

        // Embaralhar letras e imagens separadamente
        const shuffledLetters = [...roundLetters];
        const shuffledImages = [...roundLetters];
        shuffle(shuffledLetters);
        shuffle(shuffledImages);

        shuffledLetters.forEach(letter => {
            const letterElement = document.createElement('div');
            letterElement.className = 'letter';
            letterElement.textContent = letter;
            letterElement.draggable = true;
            letterElement.ondragstart = (event) => {
                event.dataTransfer.setData('text', letter);
            };
            lettersContainer.appendChild(letterElement);
        });

        shuffledImages.forEach(letter => {
            const imageElement = document.createElement('div');
            imageElement.className = 'image';
            const img = document.createElement('img');  
            img.src = `../static/image/alfabeto/${words[letter].toLowerCase()}.png`;
            img.alt = words[letter];
            imageElement.appendChild(img);
            imageElement.ondragover = (event) => {
                event.preventDefault();
            };
            imageElement.ondrop = (event) => {
                const droppedLetter = event.dataTransfer.getData('text');
                if (droppedLetter === letter) {
                    feedbackElement.textContent = 'Correto! A palavra começa com a letra ' + letter + '.';
                    feedbackElement.style.color = 'green';
                    imageElement.style.backgroundColor = '#45a049';
                    correctCount++;
                    matches++;
                    // Travar letra e imagem
                    const letterElement = [...document.querySelectorAll('.letter')].find(el => el.textContent === droppedLetter);
                    letterElement.classList.add('locked');
                    imageElement.classList.add('locked');
                    if (matches === 5) {
                        stopTimer();
                        timeSpentElement.textContent = timer;
                        setTimeout(() => {
                            popupElement.classList.remove('hidden');
                        }, 500);
                    }
                } else {
                    feedbackElement.textContent = 'Tente novamente.';
                    feedbackElement.style.color = 'red';
                    errorCount++;
                }
                correctCountElement.textContent = correctCount;
                errorCountElement.textContent = errorCount;
            };
            imagesContainer.appendChild(imageElement);
        });
    }

    restartButton.addEventListener('click', () => {
        usedLetters = [];
        correctCount = 0;
        errorCount = 0;
        correctCountElement.textContent = correctCount;
        errorCountElement.textContent = errorCount;
        popupElement.classList.add('hidden');
        loadRound();
    });

    loadRound();
});
