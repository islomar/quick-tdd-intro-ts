import {Either, left, right} from "./Either.ts";

class HangmanConfig {
    private constructor(
        public readonly secretWord: string,
        public readonly trials: number,
        public readonly error: Nullable<GameError>
    ) {}

    static createFrom(config: { secretWord: string, trials: number }): HangmanConfig {
        let error: Nullable<GameError> = null;

        if (config.trials < 0) {
            error = GameError.TrialsMustBePositive;
        }
        if (config.secretWord === "") {
            error = GameError.SecretWordMustHaveAtLeastOneLetter;
        }

        return new HangmanConfig(
            config.secretWord,
            config.trials < 0 ? 0 : config.trials,
            error
        );
    }
}

export class Game {
    private readonly secretWord: string;
    private remainingTrials: number;
    private remainingLettersToGuess: string;
    private gameError: Nullable<GameError> = null;

    constructor(config: HangmanConfig) {
        this.secretWord = config.secretWord;
        this.remainingLettersToGuess = [...new Set(this.secretWord)].toString();
        this.remainingTrials = config.trials;
        this.gameError = config.error;
    }

    tryTo(guessResult: GuessResult) {
        if (guessResult.isLeft()) {
            this.gameError = guessResult.value;
            return this;
        }
        if (this.remainingTrials > 0) {
            this.remainingTrials--;
        }
        this.remainingLettersToGuess = this.remainingLettersToGuess.replace(guessResult.value, "");
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

    availableTrials(): number {
        return this.remainingTrials;
    }

    revealedSecret(): string {
        return this.secretWord
            .split("")
            .map(letter => this.remainingLettersToGuess.includes(letter) ? "_" : letter)
            .join("");
    }

    isMisconfigured(): boolean {
        return this.gameError !== null;
    }

    problem() {
        //FIXME: what if there are no problems?
        //FIXME: what if several problems happen at the same time?
        return this.gameError;
    }
}

export enum GameError {
    TrialsMustBePositive,
    SecretWordMustHaveAtLeastOneLetter,
    MultipleLettersNotAllowed,
    InvalidCharacter,
}

export enum GameResult {
    PlayerWins,
    PlayerLoses,
    Ongoing,
}

type GuessResult = Either<GameError, string>;

type Nullable<T> = T | null;

export class Guess {
    static letter(character: string): GuessResult {
        if (character.length > 1) {
            return left(GameError.MultipleLettersNotAllowed);
        }
        if (!isCharacterALetter(character)) {
            return left(GameError.InvalidCharacter);
        }
        return right(character)
    }
}

export class Hangman {
    // This class is not used in the tests, just for semantic purposes (returning a Game object)
    // and for keeping the original structure of the code
    static startGame(param: { secretWord: string; trials: number }): Game {
        return new Game(HangmanConfig.createFrom(param));
    }
}

function isCharacterALetter(char: string): boolean {
    return (/[a-zA-Z]/).test(char)
}