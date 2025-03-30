import { describe, it, expect } from 'vitest';
import { Either, Left, Right, left, right } from './Either';

describe('Either type', () => {
    describe('Left', () => {
        it('should be a Left instance', () => {
            const leftValue = new Left('error');
            expect(leftValue.isLeft()).toBe(true);
            expect(leftValue.isRight()).toBe(false);
            expect(leftValue.value).toBe('error');
        });

        it('should be created using the left helper function', () => {
            const leftValue = left('error');
            expect(leftValue.isLeft()).toBe(true);
            expect(leftValue.isRight()).toBe(false);
            expect(leftValue.value).toBe('error');
        });
    });

    describe('Right', () => {
        it('should be a Right instance', () => {
            const rightValue = new Right('success');
            expect(rightValue.isRight()).toBe(true);
            expect(rightValue.isLeft()).toBe(false);
            expect(rightValue.value).toBe('success');
        });

        it('should be created using the right helper function', () => {
            const rightValue = right('success');
            expect(rightValue.isRight()).toBe(true);
            expect(rightValue.isLeft()).toBe(false);
            expect(rightValue.value).toBe('success');
        });
    });

    describe('Type guards', () => {
        it('should properly narrow types for Left', () => {
            const either: Either<string, number> = left('error');
            
            if (either.isLeft()) {
                expect(either.value).toBe('error');
            } else {
                expect.fail('Should not reach here');
            }
        });

        it('should properly narrow types for Right', () => {
            const either: Either<string, number> = right(42);
            
            if (either.isRight()) {
                expect(either.value).toBe(42);
            } else {
                expect.fail('Should not reach here');
            }
        });
    });
}); 