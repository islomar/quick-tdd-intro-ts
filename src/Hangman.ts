export class Game {
    private readonly secretWord: string;
    private remainingTrials: number;
    private remainingLettersToGuess: string;

    constructor(config: { secretWord: string, trials: number }) {
        this.secretWord = config.secretWord
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

    result(): GameResult {
        return this.remainingLettersToGuess.length === 0 ?
            GameResult.PlayerWins :
            GameResult.PlayerLoses;
    }
}

export enum GameResult {
    PlayerWins,
    PlayerLoses,
}

export class Guess {
    static letter(character: string) {
        return character
    }
}

export class Hangman {

    static startGame(param: { secretWord: string; trials: number }): Game {
        return new Game({secretWord: param.secretWord, trials: param.trials});
    }
}