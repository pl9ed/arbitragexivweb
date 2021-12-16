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
        {name: "Gaja Hide", id: 36242, area: Region.THAVNAIR},
        {name: "Kumbhira Skin", id: 36245, area: Region.THAVNAIR},
        {name: "Berkanan Sap", id: 36261, area: Region.LABYRINTHOS},
        {name: "Luncheon Toad Skin", id: 36243, area: Region.LABYRINTHOS},
        {name: "Saiga Hide", id: 36244, area: Region.GARLEMALD},
        {name: "Almasty Fur", id: 36203, area: Region.GARLEMALD},
        {name: "Mousse Flesh", id: 36257, area: Region.MARE_LAMENTORUM},
        {name: "Lunatender Blossom", id: 36258, area: Region.MARE_LAMENTORUM},
        {name: "Dynamite Ash", id: 36259, area: Region.MARE_LAMENTORUM},
        {name: "Petalouda Scales", id: 36260, area: Region.ELPIS},
        {name: "Ophiotauros Hide", id: 36246, area: Region.ELPIS},
        {name: "Dynamis Crystal", id: 36262, area: Region.ULTIMA_THULE},
        {name: "Bicolor Gemstone Voucher", id: 35833, area: Region.OLD_SHARLAYAN}

    ]
}

export interface GemstoneItem {
    name: string,
    id: number,
    area: Region,
}