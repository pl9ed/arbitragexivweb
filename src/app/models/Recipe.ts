export class Recipe {
    item: number = 0
    materialIds: number[] = []
    materialAmounts: number[] = []

    constructor(
        item: number,
        materialIds: number[],
        materialAmounts: number[]
    ) {
        if (materialIds.length != materialAmounts.length) {
            throw 'ID array length and material amount array length do not match'
        } 
        this.item = item
        this.materialIds = materialIds
        this.materialAmounts = materialAmounts
    }
}

export const GRADE6_STR_POT = new Recipe(
    36109,
    [ 36227, 36215, 36223 ],
    [ 1, 1, 1 ]
)

export const GRADE6_MND_POT = new Recipe(
    36113,
    [ 36231, 36215, 36223 ],
    [ 1, 1, 1 ]
)

export const GRADE6_INT_POT = new Recipe(
    36112,
    [ 36230, 36215, 36223 ],
    [ 1, 1, 1 ]
)

export const GRADE6_DEX_POT = new Recipe(
    36110,
    [ 36228, 36215, 36223 ],
    [ 1, 1, 1 ]
)
