export interface GameOptions {
    secretWord: string
    trials: number
}

export class Hangmang {
    static startGame({secretWord, trials}: GameOptions) : Game {
        if (trials <= 0) {
            return new MisconfiguredGame(secretWord, trials)
        }       
        if (secretWord.length < 3) {
            return new MisconfiguredGame(secretWord, trials)
        }
        return new Game(secretWord, trials)
    }
}

export class Guess {
    constructor(private letter: string) {}

    static letter(letter: string): Guess {
        return new Guess(letter)
    }

    isInvalid(): boolean {
        return this.containsMultipleChars() || this.containsSymbolsOtherThanAtoZ()
    }

    problem(): GameError {
        if (this.containsMultipleChars()) {
            return GameError.MultipleLettersNotAllowed
        }
        if (this.containsSymbolsOtherThanAtoZ()) {
            return GameError.InvalidCharacter
        }
        return GameError.None
    }

    private containsSymbolsOtherThanAtoZ(): boolean {
        return this.letter.match(/^[a-z]$/i) == null
    }

    private containsMultipleChars() {
        return this.letter.length != 1
    }

    equals(other: Guess | string): boolean {
        if (other == null) {
            return false;
        }
        if (typeof other === 'string') {
            return this.letter === other;
        }
        return this.letter === other.letter;
    }
}

export class Game {
    constructor(
        protected secretWord: string, 
        protected trials: number, 
        private successGuesses: Set<Guess> = new Set(),
        private failedGuesses: Set<Guess> = new Set()) {}

    result(): GameResult {
        if (!this.isOver()){
            return GameResult.Ongoing
        }
        if (this.isSecretWordGuessed()) {
            return GameResult.PlayerWins
        }
        return GameResult.PlayerLoses
    }

    isOver(): boolean {
        const allTrialsConsumed = this.numberOfTrialsConsumed() >= this.trials
        const secretGuessed = this.isSecretWordGuessed()
        return allTrialsConsumed || secretGuessed
    }
    
    private isSecretWordGuessed() {
        return this.successGuesses.size == this.secretWord.length
    }

    private numberOfTrialsConsumed() : number {
        return this.successGuesses.size + this.failedGuesses.size
    }

    availableTrials(): number {
        if (this.trials > this.numberOfTrialsConsumed()) {
            return this.trials - this.numberOfTrialsConsumed()
        }
        return 0
    }
    
    revealedSecret(): string {
        let revealed = ""
        for (let secretLetter of this.secretWord) {
            if (this.isSuccessfulGuess(Guess.letter(secretLetter))) {
                revealed += secretLetter
            }
            else {
                revealed += "_"
            }
        }
        return revealed
    }

    private isSuccessfulGuess(guess: Guess): boolean {
        for (let item of this.successGuesses) {
            if (item.equals(guess)) {
                return true;
            }
        }
        return false;
    }
    
    tryTo(guess: Guess): Game { 
        if (guess.isInvalid()) {
            return new WrongGuessGame(this.secretWord, this.trials, this.successGuesses, this.failedGuesses, guess)
        }
        for (let letter of this.secretWord) {
            if (guess.equals(letter)) {
                let guesses = new Set(this.successGuesses)
                guesses.add(guess)
                return new Game(this.secretWord, this.trials, guesses, this.failedGuesses)
            }
        }
        let guesses = new Set(this.failedGuesses)
        guesses.add(guess)
        return new Game(this.secretWord, this.trials, this.successGuesses, guesses)                
    }

    isMisconfigured(): boolean {
        return false
    }
    
    problem(): GameError {
        return GameError.None
    }
}

export class MisconfiguredGame extends Game {
    override result(): GameResult {
        return GameResult.PlayerLoses
    }

    override isOver(): boolean {
        return true
    }

    override availableTrials(): number {
        return 0
    }

    override isMisconfigured(): boolean {
        return true
    }

    override problem(): GameError {
        if (this.secretWord.length < 3) {
            return GameError.SecretWordMustHaveThreeLetters
        }
        if (this.trials <= 0) { 
            return GameError.TrialsMustBePositive
        }
        return GameError.None
    }
}

export class WrongGuessGame  extends Game {
    constructor(
        secretWord: string,
        trials: number,
        successGuesses: Set<Guess>,
        failedGuesses: Set<Guess>,
        private wrongGuess: Guess) {
        super(secretWord, trials, successGuesses, failedGuesses)
    }
    override problem(): GameError {
        return this.wrongGuess.problem()
    }
}

export enum GameResult {
    PlayerWins,
    PlayerLoses,
    Ongoing
}

export enum GameError {
    None,
    TrialsMustBePositive,
    SecretWordMustHaveThreeLetters,
    MultipleLettersNotAllowed,
    InvalidCharacter
}