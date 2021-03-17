const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
    question: 'What is the color of the ocean?',
    choice1: 'pink',
    choice2: 'Yellow',
    choice3: 'Blue',
    choice4: 'Puple',
    answer: 3,
},  
{
    question: 'What is a beach made of?',
    choice1: 'Sand',
    choice2: 'Grass',
    choice3: 'Clovers',
    choice4: 'Wood',
    answer: 1,
},
{
    question: 'What animal can you find at the beach?',
    choice1: 'Groundhog',
    choice2: 'Turkey',
    choice3: 'Bull',
    choice4: 'Sea Lions',
    answer: 4,
},
{
    question: 'When is a bad time to go to the beach?',
    choice1: 'Morning',
    choice2: 'Never a bad time',
    choice3: 'Afternoon',
    choice4: 'Evening',
    answer: 2,
}
]
const SCORE_POINTS = 25
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion= availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'
        
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()