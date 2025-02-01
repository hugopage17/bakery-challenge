import { IProduct, IPack, IProductBaseParams } from '../types/product';

export class Product implements IProduct {
    public code: string;
    public name: string;
    public packs: IPack[];

    constructor (productParams: IProductBaseParams) {
        this.code = productParams.code;
        this.name = productParams.name;
        this.packs = productParams.packs
    }

    public calculateTotalPrice(totalPacks: Record<number, number>) {
        return Object.entries(totalPacks).reduce((sum, [size, count]) => sum + count * this.packs.find(p => p.size === Number(size))!.price, 0);
    }

    public calculatePacksRequired(amount: number, memo: { [key: number]: Record<number, number> | null } = {}): Record<number, number> | null {
        if (amount === 0) return {};
        if (memo[amount] !== undefined) return memo[amount]!;
    
        let bestPackCombination: Record<number, number> | null = null;
    
        for (const pack of this.packs) {
            if (pack.size <= amount) {
                const remainingCombo = this.calculatePacksRequired(amount - pack.size, memo);
                if (remainingCombo) {
                    const newCombo = { ...remainingCombo, [pack.size]: (remainingCombo?.[pack.size] ?? 0) + 1 };
    
                    if (!bestPackCombination || Object.values(newCombo).reduce((a, b) => a + b, 0) < Object.values(bestPackCombination).reduce((a, b) => a + b, 0)) {
                        bestPackCombination = newCombo;
                    }
                }
            }
        }
        memo[amount] = bestPackCombination;
        return bestPackCombination;
    };
}