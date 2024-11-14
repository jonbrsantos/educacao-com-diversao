const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
const correctCountElement = document.getElementById('correct-count');
const errorCountElement = document.getElementById('error-count');

const characters = [
    { character: '1', pair: 'um' },
    { character: 'um', pair: '1' },
    { character: '2', pair: 'dois' },
    { character: 'dois', pair: '2' },
    { character: '3', pair: 'tres' },
    { character: 'tres', pair: '3' },
    { character: '4', pair: 'quatro' },
    { character: 'quatro', pair: '4' },
    { character: '5', pair: 'cinco' },
    { character: 'cinco', pair: '5' },
    { character: '6', pair: 'seis' },
    { character: 'seis', pair: '6' },
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';
let correctCount = 0;
let errorCount = 0;

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 12) {
        clearInterval(this.loop);
        document.getElementById('final-correct-count').textContent = correctCount;
        document.getElementById('final-error-count').textContent = errorCount;
        document.getElementById('popup').classList.remove('hidden');
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (characters.find(char => char.character === firstCharacter).pair === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        correctCount++;
        correctCountElement.textContent = correctCount;

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            errorCount++;
            errorCountElement.textContent = errorCount;

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../static/image/memoria/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {
    const shuffledCharacters = characters.sort(() => Math.random() - 0.5);

    shuffledCharacters.forEach(({ character }) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {
    startTimer();
    loadGame();
}

document.getElementById('restart-button').onclick = () => {
    location.reload();
};


