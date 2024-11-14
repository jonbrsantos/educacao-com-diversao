document.addEventListener('DOMContentLoaded', () => {
    const playSoundButton = document.getElementById('play-sound');
    const imagesContainer = document.getElementById('images');
    const feedbackElement = document.getElementById('feedback');
    const correctCountElement = document.getElementById('correct-count');
    const errorCountElement = document.getElementById('error-count');
    const timerElement = document.getElementById('timer');
    const popupElement = document.getElementById('popup');
    const finalCorrectCountElement = document.getElementById('final-correct-count');
    const finalErrorCountElement = document.getElementById('final-error-count');
    const restartButton = document.getElementById('restart-button');


    const words = [
        { audio: '../static/audio/rimas/gato.mp3', correct: 'PATO', options: ['PATO', 'BOLA', 'ASA'], images: ['../static/image/rimas/pato.png', '../static/image/rimas/bola.png', '../static/image/rimas/asa.png'] },
        { audio: '../static/audio/rimas/escola.mp3', correct: 'BOLA', options: ['GATO', 'BOLA', 'ASA'], images: ['../static/image/rimas/gato.png', '../static/image/rimas/bola.png', '../static/image/rimas/asa.png'] },
        { audio: '../static/audio/rimas/casa.mp3', correct: 'ASA', options: ['PATO', 'ASA', 'OVELHA'], images: ['../static/image/rimas/pato.png', '../static/image/rimas/asa.png', '../static/image/rimas/ovelha.png'] },
        { audio: '../static/audio/rimas/abelha.mp3', correct: 'OVELHA', options: ['CASA', 'ESCOLA', 'OVELHA'], images: ['../static/image/rimas/casa.png', '../static/image/rimas/escola.png', '../static/image/rimas/ovelha.png'] },
        { audio: '../static/audio/rimas/pao.mp3', correct: 'MÃO', options: ['MÃO', 'RUA', 'BICO'], images: ['../static/image/rimas/mao.png', '../static/image/rimas/rua.png', '../static/image/rimas/bico.png'] },
        { audio: '../static/audio/rimas/lua.mp3', correct: 'RUA', options: ['MÃO', 'RUA', 'PENTE'], images: ['../static/image/rimas/mao.png', '../static/image/rimas/rua.png', '../static/image/rimas/pente.png'] },
        { audio: '../static/audio/rimas/fada.mp3', correct: 'ESTRADA', options: ['MÃO', 'GATO', 'ESTRADA'], images: ['../static/image/rimas/mao.png', '../static/image/rimas/gato.png', '../static/image/rimas/estrada.png'] },
        { audio: '../static/audio/rimas/sol.mp3', correct: 'FAROL', options: ['FACA', 'FAROL', 'RUA'], images: ['../static/image/rimas/faca.png', '../static/image/rimas/farol.png', '../static/image/rimas/rua.png'] },
        { audio: '../static/audio/rimas/vaca.mp3', correct: 'FACA', options: ['DADO', 'FACA', 'QUADRADO'], images: ['../static/image/rimas/dado.png', '../static/image/rimas/faca.png', '../static/image/rimas/quadrado.png'] },
        { audio: '../static/audio/rimas/dado.mp3', correct: 'QUADRADO', options: ['VASSOURA', 'QUADRADO', 'FACA'], images: ['../static/image/rimas/vassoura.png', '../static/image/rimas/quadrado.png', '../static/image/rimas/faca.png'] },
        { audio: '../static/audio/rimas/tesoura.mp3', correct: 'VASSOURA', options: ['VASSOURA', 'GATO', 'ESCOLA'], images: ['../static/image/rimas/vassoura.png', '../static/image/rimas/gato.png', '../static/image/rimas/escola.png'] },
        { audio: '../static/audio/rimas/fogo.mp3', correct: 'JOGO', options: ['JOGO', 'CASA', 'ASA'], images: ['../static/image/rimas/jogo.png', '../static/image/rimas/casa.png', '../static/image/rimas/asa.png'] },
        { audio: '../static/audio/rimas/coroa.mp3', correct: 'LAGOA', options: ['PATO', 'LAGOA', 'OVELHA'], images: ['../static/image/rimas/pato.png', '../static/image/rimas/lagoa.png', '../static/image/rimas/ovelha.png'] },
        { audio: '../static/audio/rimas/aviao.mp3', correct: 'BALÃO', options: ['BALÃO', 'BICO', 'ESTRADA'], images: ['../static/image/rimas/balao.png', '../static/image/rimas/bico.png', '../static/image/rimas/estrada.png'] },
        { audio: '../static/audio/rimas/jacare.mp3', correct: 'PICOLÉ', options: ['PICOLÉ', 'FAROL', 'FACA'], images: ['../static/image/rimas/picole.png', '../static/image/rimas/farol.png', '../static/image/rimas/faca.png'] },
        { audio: '../static/audio/rimas/papel.mp3', correct: 'ANEL', options: ['ANEL', 'QUADRADO', 'FACA'], images: ['../static/image/rimas/anel.png', '../static/image/rimas/quadrado.png', '../static/image/rimas/faca.png'] },
        { audio: '../static/audio/rimas/nariz.mp3', correct: 'FELIZ', options: ['VASSOURA', 'FELIZ', 'GATO'], images: ['../static/image/rimas/vassoura.png', '../static/image/rimas/feliz.png', '../static/image/rimas/gato.png'] },
        { audio: '../static/audio/rimas/pente.mp3', correct: 'DENTE', options: ['JOGO', 'DENTE', 'ASA'], images: ['../static/image/rimas/jogo.png', '../static/image/rimas/dente.png', '../static/image/rimas/asa.png'] },
        { audio: '../static/audio/rimas/rico.mp3', correct: 'BICO', options: ['PATO', 'BICO', 'OVELHA'], images: ['../static/image/rimas/pato.png', '../static/image/rimas/bico.png', '../static/image/rimas/ovelha.png'] },
        { audio: '../static/audio/rimas/rio.mp3', correct: 'NAVIO', options: ['BALÃO', 'NAVIO', 'ESTRADA'], images: ['../static/image/rimas/balao.png', '../static/image/rimas/navio.png', '../static/image/rimas/estrada.png'] },
        { audio: '../static/audio/rimas/touro.mp3', correct: 'OURO', options: ['PICOLÉ', 'OURO', 'FAROL'], images: ['../static/image/rimas/picole.png', '../static/image/rimas/ouro.png', '../static/image/rimas/farol.png'] },
        { audio: '../static/audio/rimas/pipoca.mp3', correct: 'FOCA', options: ['ANEL', 'FOCA', 'FELIZ'], images: ['../static/image/rimas/anel.png', '../static/image/rimas/foca.png', '../static/image/rimas/feliz.png'] },
        { audio: '../static/audio/rimas/pato.mp3', correct: 'GATO', options: ['GATO', 'AVIÃO', 'VASSOURA'], images: ['../static/image/rimas/gato.png', '../static/image/rimas/aviao.png', '../static/image/rimas/vassoura.png'] },
        { audio: '../static/audio/rimas/bola.mp3', correct: 'ESCOLA', options: ['PAPEL', 'FOGO', 'ESCOLA'], images: ['../static/image/rimas/papel.png', '../static/image/rimas/fogo.png', '../static/image/rimas/escola.png'] },
        { audio: '../static/audio/rimas/asa.mp3', correct: 'CASA', options: ['JACARÉ', 'CASA', 'COROA'], images: ['../static/image/rimas/jacare.png', '../static/image/rimas/casa.png', '../static/image/rimas/coroa.png'] },
        { audio: '../static/audio/rimas/ovelha.mp3', correct: 'ABELHA', options: ['RICO', 'RIO', 'ABELHA'], images: ['../static/image/rimas/rico.png', '../static/image/rimas/rio.png', '../static/image/rimas/abelha.png'] },
        { audio: '../static/audio/rimas/mao.mp3', correct: 'PÃO', options: ['PENTE', 'PÃO', 'PAPEL'], images: ['../static/image/rimas/pente.png', '../static/image/rimas/pao.png', '../static/image/rimas/papel.png'] },
        { audio: '../static/audio/rimas/rua.mp3', correct: 'LUA', options: ['ESCOLA', 'LUA', 'PIPOCA'], images: ['../static/image/rimas/escola.png', '../static/image/rimas/lua.png', '../static/image/rimas/pipoca.png'] },
        { audio: '../static/audio/rimas/estrada.mp3', correct: 'FADA', options: ['FADA', 'GATO', 'NARIZ'], images: ['../static/image/rimas/fada.png', '../static/image/rimas/gato.png', '../static/image/rimas/nariz.png'] },
        { audio: '../static/audio/rimas/farol.mp3', correct: 'SOL', options: ['PÃO', 'PIPOCA', 'SOL'], images: ['../static/image/rimas/pao.png', '../static/image/rimas/pipoca.png', '../static/image/rimas/sol.png'] },
        { audio: '../static/audio/rimas/faca.mp3', correct: 'VACA', options: ['VACA', 'PENTE', 'FADA'], images: ['../static/image/rimas/vaca.png', '../static/image/rimas/pente.png', '../static/image/rimas/fada.png'] },
        { audio: '../static/audio/rimas/quadrado.mp3', correct: 'DADO', options: ['CASA', 'SOL', 'DADO'], images: ['../static/image/rimas/casa.png', '../static/image/rimas/sol.png', '../static/image/rimas/dado.png'] },
        { audio: '../static/audio/rimas/vassoura.mp3', correct: 'TESOURA', options: ['DADO', 'TESOURA', 'RIO'], images: ['../static/image/rimas/dado.png', '../static/image/rimas/tesoura.png', '../static/image/rimas/rio.png'] },
        { audio: '../static/audio/rimas/jogo.mp3', correct: 'FOGO', options: ['FOGO', 'FADA', 'VACA'], images: ['../static/image/rimas/fogo.png', '../static/image/rimas/fada.png', '../static/image/rimas/vaca.png'] },
        { audio: '../static/audio/rimas/lagoa.mp3', correct: 'COROA', options: ['COROA', 'TESOURA', 'GATO'], images: ['../static/image/rimas/coroa.png', '../static/image/rimas/tesoura.png', '../static/image/rimas/gato.png'] },
        { audio: '../static/audio/rimas/balao.mp3', correct: 'AVIÃO', options: ['TOURO', 'ABELHA', 'AVIÃO'], images: ['../static/image/rimas/touro.png', '../static/image/rimas/abelha.png', '../static/image/rimas/aviao.png'] },
        { audio: '../static/audio/rimas/picole.mp3', correct: 'JACARÉ', options: ['JACARÉ', 'VACA', 'RICO'], images: ['../static/image/rimas/jacare.png', '../static/image/rimas/vaca.png', '../static/image/rimas/rico.png'] },
        { audio: '../static/audio/rimas/anel.mp3', correct: 'PAPEL', options: ['TESOURA', 'PAPEL', 'LUA'], images: ['../static/image/rimas/tesoura.png', '../static/image/rimas/papel.png', '../static/image/rimas/lua.png'] },
        { audio: '../static/audio/rimas/feliz.mp3', correct: 'NARIZ', options: ['SOL', 'NARIZ', 'CASA'], images: ['../static/image/rimas/sol.png', '../static/image/rimas/nariz.png', '../static/image/rimas/casa.png'] },
        { audio: '../static/audio/rimas/dente.mp3', correct: 'PENTE', options: ['PENTE', 'DADO', 'JACARÉ'], images: ['../static/image/rimas/pente.png', '../static/image/rimas/dado.png', '../static/image/rimas/jacare.png'] },
        { audio: '../static/audio/rimas/bico.mp3', correct: 'RICO', options: ['AVIÃO', 'RICO', 'PÃO'], images: ['../static/image/rimas/aviao.png', '../static/image/rimas/rico.png', '../static/image/rimas/pao.png'] },
        { audio: '../static/audio/rimas/navio.mp3', correct: 'RIO', options: ['LUA', 'RIO', 'PENTE'], images: ['../static/image/rimas/lua.png', '../static/image/rimas/rio.png', '../static/image/rimas/pente.png'] },
        { audio: '../static/audio/rimas/ouro.mp3', correct: 'TOURO', options: ['TOURO', 'NARIZ', 'FOGO'], images: ['../static/image/rimas/touro.png', '../static/image/rimas/nariz.png', '../static/image/rimas/fogo.png'] },
        { audio: '../static/audio/rimas/foca.mp3', correct: 'PIPOCA', options: ['ABELHA', 'PIPOCA', 'COROA'], images: ['../static/image/rimas/abelha.png', '../static/image/rimas/pipoca.png', '../static/image/rimas/coroa.png'] 
        },
    ];

    let currentIndex = 0;
    let correctCount = 0;
    let errorCount = 0;
    let timer = 0;
    let timerInterval;
    const totalExercises = 10;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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

    function loadNextWord() {
        if (currentIndex >= totalExercises) {
            showPopup();
            return;
        }
        
        const word = words[currentIndex];
        playSoundButton.onclick = () => {
            const audio = new Audio(word.audio);
            audio.play();
        };

        imagesContainer.innerHTML = '';
        const optionsWithImages = word.options.map((option, index) => ({
            option,
            image: word.images[index]
        }));
        shuffle(optionsWithImages);

        optionsWithImages.forEach(({ option, image }) => {
            const imageElement = document.createElement('div');
            imageElement.className = 'image';
            const img = document.createElement('img');
            img.src = image;
            img.alt = option;
            imageElement.appendChild(img);
            const textElement = document.createElement('p');
            textElement.textContent = option;
            imageElement.appendChild(textElement);
            imageElement.onclick = () => checkAnswer(option, word.correct);
            imagesContainer.appendChild(imageElement);
        });

        feedbackElement.textContent = '';
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            feedbackElement.textContent = 'Correto!';
            feedbackElement.style.color = 'green';
            correctCount++;
        } else {
            feedbackElement.textContent = 'Tente novamente.';
            feedbackElement.style.color = 'red';
            errorCount++;
        }

        correctCountElement.textContent = correctCount;
        errorCountElement.textContent = errorCount;

        currentIndex++;
        setTimeout(loadNextWord, 1000);
    }

    function showPopup() {
        finalCorrectCountElement.textContent = correctCount;
        finalErrorCountElement.textContent = errorCount;
        popupElement.classList.remove('hidden');
        stopTimer();
    }

    restartButton.onclick = () => {
        shuffle(words); // Embaralhar as palavras
        currentIndex = 0;
        correctCount = 0;
        errorCount = 0;
        correctCountElement.textContent = correctCount;
        errorCountElement.textContent = errorCount;
        popupElement.classList.add('hidden');
        loadNextWord();
        startTimer();
    };

    shuffle(words); // Embaralhar as palavras inicialmente
    loadNextWord();
    startTimer();
});


