import { Region } from "./Region"

export abstract class Constants {
    public static PRIMAL = [
            "Behemoth",
            "Excalibur",
            "Exodus",
            "Famfrit",
            "Hyperion",
            "Lamia",
            "Leviathan",
            "Ultros"
    ]
    public static DEFAULT_HOMEWORLD = "lamia"
    public static TEST_ITEM_IDS = [
        33923,
        36080,
        30812,
        36079
    ]
    public static GEMSTONE_ITEMS_LVL1: GemstoneItem[] = [
        {name: "Gaja Hide", id: 36242, area: Region.THAVNAIR, cost: 2},
        {name: "Kumbhira Skin", id: 36245, area: Region.THAVNAIR, cost: 2},
        {name: "Berkanan Sap", id: 36261, area: Region.LABYRINTHOS, cost: 2},
        {name: "Luncheon Toad Skin", id: 36243, area: Region.LABYRINTHOS, cost: 2},
        {name: "Saiga Hide", id: 36244, area: Region.GARLEMALD, cost: 2},
        {name: "Almasty Fur", id: 36203, area: Region.GARLEMALD, cost: 2},
        {name: "Mousse Flesh", id: 36257, area: Region.MARE_LAMENTORUM, cost: 2},
        {name: "Lunatender Blossom", id: 36258, area: Region.MARE_LAMENTORUM, cost: 2},
        {name: "Dynamite Ash", id: 36259, area: Region.MARE_LAMENTORUM, cost: 2},
        {name: "Petalouda Scales", id: 36260, area: Region.ELPIS, cost: 2},
        {name: "Ophiotauros Hide", id: 36246, area: Region.ELPIS, cost: 2},
        {name: "Dynamis Crystal", id: 36262, area: Region.ULTIMA_THULE, cost: 2},
        {name: "Bicolor Gemstone Voucher", id: 35833, area: Region.OLD_SHARLAYAN, cost: 100}

    ]
}

export interface GemstoneItem {
    name: string,
    id: number,
    area: Region,
    cost: number
}