import { Item } from "./Item"
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
    public static DEFAULT_HOMEWORLD = "Lamia"
    public static CONSUMABLE_ITEM_IDS: number[] = [
        39727,
        39728,
        39730,
        39731,
        39872,
        39876,
    ]
    public static CRAFTING_ITEM_IDS: number[] = [
       
    ]
    public static CRAFTING_GEAR_IDS: number[] = [
        38891,
        38892,
        38893,
        38894,
        38895,
        38896,
        38897,
        38898,
        38899,
        38900,
        38901,
        38902,
        38903,
        38904,
        38905,
        38906,
        38907,
        38908,
        38909,
        38910
    ]
    public static GEMSTONE_ITEMS_LVL1: GemstoneItem[] = [
        { name: "Gaja Hide", id: 36242, area: Region.THAVNAIR, cost: 2 },
        { name: "Kumbhira Skin", id: 36245, area: Region.THAVNAIR, cost: 2 },
        { name: "Berkanan Sap", id: 36261, area: Region.LABYRINTHOS, cost: 2 },
        { name: "Luncheon Toad Skin", id: 36243, area: Region.LABYRINTHOS, cost: 2 },
        { name: "Saiga Hide", id: 36244, area: Region.GARLEMALD, cost: 2 },
        { name: "Almasty Fur", id: 36203, area: Region.GARLEMALD, cost: 2 },
        { name: "Mousse Flesh", id: 36257, area: Region.MARE_LAMENTORUM, cost: 2 },
        { name: "Lunatender Blossom", id: 36258, area: Region.MARE_LAMENTORUM, cost: 2 },
        { name: "Dynamite Ash", id: 36259, area: Region.MARE_LAMENTORUM, cost: 2 },
        { name: "Petalouda Scales", id: 36260, area: Region.ELPIS, cost: 2 },
        { name: "Ophiotauros Hide", id: 36246, area: Region.ELPIS, cost: 2 },
        { name: "Dynamis Crystal", id: 36262, area: Region.ULTIMA_THULE, cost: 2 },
        { name: "Bicolor Gemstone Voucher", id: 35833, area: Region.OLD_SHARLAYAN, cost: 100 }

    ]

    public static MATERIA: number[] = [
        33919,
        33932,
        33918,
        33931,
        33920,
        33933,
        33929,
        33942,
        33928,
        33941,
    ]

    public static TOME_MATS: number[] = [
        36219,
        36221,
        36222,
        36220,
        36218,
    ]

    public static DEFAULT_PRICECHECK_ITEMS: number[] = Constants.TOME_MATS
}

export interface GemstoneItem {
    name: string,
    id: number,
    area: Region,
    cost: number
}