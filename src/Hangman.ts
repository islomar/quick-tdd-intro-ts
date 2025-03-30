export class Game {
    private readonly secretWord: string;
    private trials: number;
    private remainingTrials: number;

    constructor(config: {secretWord: string, trials: number }) {
        this.secretWord = config.secretWord
        this.trials = config.trials
        this.remainingTrials = config.trials
    }

    tryTo(letter: any) {
        this.remainingTrials--
        return this;
    }

    isOver(): boolean {
        return this.remainingTrials <= 0;
    }
}

export class Guess {
    static letter(character: string) {

    }
}

export class Hangman {

    static startGame(param: { secretWord: string; trials: number }): Game {
        return new Game({secretWord: param.secretWord, trials: param.trials });
    }
}