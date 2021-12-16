import { Region } from "./Region";

export class GemstoneItemPrice {
    name: string;
    id: number;
    minPriceNQ: number;
    velocityNQ: number;
    // minPriceHQ: number;
    // velocityHQ: number;
    areaName: string;
    unitCost: number;

    constructor(
        name: string, 
        id: number, 
        minPriceNQ: number, 
        velocityNQ: number, 
        // minPriceHQ: number, 
        // velocityHQ: number, 
        area: Region,
        cost: number
    ) {
        this.name = name
        this.id = id
        this.minPriceNQ = minPriceNQ
        this.velocityNQ = velocityNQ
        // this.minPriceHQ = minPriceHQ
        // this.velocityHQ = velocityHQ
        this.areaName = area.name
        this.unitCost = cost
    }
}
