export class Game {
    private readonly secretWord: string;
    private trials: number;
    private remainingTrials: number;
    private remainingLettersToGuess: string;

    constructor(config: {secretWord: string, trials: number }) {
        this.secretWord = config.secretWord
        this.trials = config.trials
        this.remainingLettersToGuess = [...new Set(this.secretWord)].toString();
        this.remainingTrials = config.trials
    }

    tryTo(letter: string) {
        this.remainingTrials--
        this.remainingLettersToGuess = this.remainingLettersToGuess.replace(letter, "");
        return this;
    }

    isOver(): boolean {
        return this.remainingTrials <= 0 || this.remainingLettersToGuess.length === 0;
    }
}

export class Guess {
    static letter(character: string) {
        return character
    }
}

export class Hangman {

    static startGame(param: { secretWord: string; trials: number }): Game {
        return new Game({secretWord: param.secretWord, trials: param.trials });
    }
}