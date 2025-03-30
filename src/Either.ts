export type Either<L, R> = Left<L> | Right<R>;

export class Left<L> {
    constructor(public readonly value: L) { }

    isLeft(): this is Left<L> {
        return true;
    }

    isRight<R>(): this is Right<R> {
        return false;
    }
}

export class Right<R> {
    constructor(public readonly value: R) { }

    isLeft<L>(): this is Left<L> {
        return false;
    }

    isRight(): this is Right<R> {
        return true;
    }
}

// Helper functions to create instances of Left and Right
export const left =
    <L, R>(l: L): Either<L, R> => new Left(l);
export const right =
    <L, R>(r: R): Either<L, R> => new Right(r);