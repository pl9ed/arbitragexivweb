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
    public static CONSUMABLE_ITEM_IDS: Item[] = [
        { name: "Grade 5 Tincture of Strength", id: 36104 },
        { name: "Grade 5 Tincture of Dexterity", id: 36105 },
        { name: "Grade 5 Tincture of Intelligence", id: 36107 },
        { name: "Grade 5 Tincture of Mind", id: 36108 },
        { name: "Baked Alien Soup", id: 36063 },
        { name: "Sykon Bavarois", id: 36066 },
        { name: "Elpis Deipnon", id: 36062 },
        { name: "Sykon Compote", id: 36065 },
        { name: "Sykon Salad", id: 36064 },

    ]
    public static CRAFTING_ITEM_IDS: Item[] = [
        { name: "Grade 5 Strength Alkahest", id: 36227 },
        { name: "Grade 5 Dexterity Alkahest", id: 36228 },
        { name: "Grade 5 Intelligence Alkahest", id: 36230 },
        { name: "Grade 5 Mind Alkahest", id: 36231 },
        { name: "Moonlight Aethersand", id: 36223 },
        { name: "Endstone Aethersand", id: 36224 },
        { name: "Endwood Aethersand", id: 36225 },
        { name: "Endtide Aethersand", id: 36226 }
    ]
    public static CRAFTING_GEAR_IDS: Item[] = [
        { name: "Chondrite Saw", id: 35383 },
        { name: "Chondrite Cross-pein Hammer", id: 35384 },
        { name: "Chondrite Raising Hammer", id: 35385 },
        { name: "Chondrite Lapidary Hammer", id: 35386 },
        { name: "Chondrite Round Knife", id: 35387 },
        { name: "Chondrite Needle", id: 35388 },
        { name: "Chondrite Alembic", id: 35389 },
        { name: "Chondrite Bomb Frypan", id: 35390 },
        { name: "Chondrite Pickaxe", id: 35391 },
        { name: "Chondrite Hatchet", id: 35392 },
        { name: "Chondrite Claw Hammer", id: 35394 },
        { name: "Chondrite File", id: 35395 },
        { name: "Chondrite Pliers", id: 35396 },
        { name: "Chondrite Awl", id: 35398 },
        { name: "Chondrite Mortar", id: 35400 },
        { name: "Chondrite Culinary Knife", id: 35401 },
        { name: "Chondrite Sledgehammer", id: 35402 },
        { name: "Chondrite Garden Scythe", id: 35403 },
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
    public static MATERIA: Item[] = [
        { name: "Savage Aim (Crit) IX", id: 33919},
        { name: "Savage Aim (Crit) X", id: 33932},
        { name: "Heavens' Eye (DH) IX", id: 33918},
        { name: "Heavens' Eye (DH) X", id: 33931},
        { name: "Savage Might (Det) IX", id: 33920},
        { name: "Savage Might (Det) X", id: 33933},
        { name: "Quicktongue (SpS) IX", id: 33929},
        { name: "Quicktongue (SpS) X", id: 33942},
        { name: "Quickarm (SkS) IX", id: 33928},
        { name: "Quickarm (SkS) X", id: 33941}
    ]
}

export interface GemstoneItem {
    name: string,
    id: number,
    area: Region,
    cost: number
}