export class Game {
    private readonly secretWord: string;
    private remainingTrials: number;
    private remainingLettersToGuess: string;

    constructor(config: { secretWord: string, trials: number }) {
        this.secretWord = config.secretWord
        this.remainingLettersToGuess = [...new Set(this.secretWord)].toString();
        this.remainingTrials = config.trials < 0 ? 0 : config.trials;
    }

    tryTo(letter: string) {
        if (this.remainingTrials > 0) {
            this.remainingTrials--;
        }
        this.remainingLettersToGuess = this.remainingLettersToGuess.replace(letter, "");
        return this;
    }

    isOver(): boolean {
        return this.remainingTrials <= 0 || this.remainingLettersToGuess.length === 0;
    }

    result(): GameResult {
        const hasWon = this.remainingLettersToGuess.length === 0;
        const hasLost = this.remainingTrials <= 0 && !hasWon;

        if (hasWon) {
            return GameResult.PlayerWins;
        }
        if (hasLost) {
            return GameResult.PlayerLoses;
        }
        return GameResult.Ongoing;
    }

    availableTrials() {
        return this.remainingTrials;
    }

    revealedSecret(): string {
        return this.secretWord
            .split("")
            .map(letter => this.remainingLettersToGuess.includes(letter) ? "_" : letter)
            .join("");
    }

    isMisconfigured(): boolean {
        return true; //FIXME: no test is checking this being false
    }

    problem() {
        if (this.secretWord === "") {
            return GameError.SecretWordMustHaveAtLeastOneLetter;
        }
        //FIXME: what if there are no problems?
        //FIXME: what if several problems happen at the same time?
        return GameError.TrialsMustBePositive;
    }
}

export enum GameError {
    TrialsMustBePositive,
    SecretWordMustHaveAtLeastOneLetter,
}

export enum GameResult {
    PlayerWins,
    PlayerLoses,
    Ongoing,
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