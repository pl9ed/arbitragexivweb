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