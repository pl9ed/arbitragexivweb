export abstract class Constants {
  public static PRIMAL = [
    'Behemoth',
    'Excalibur',
    'Exodus',
    'Famfrit',
    'Hyperion',
    'Lamia',
    'Leviathan',
    'Ultros',
  ];
  public static DEFAULT_HOMEWORLD = 'Lamia';
  public static CONSUMABLE_ITEM_IDS: number[] = [
    39727, 39728, 39730, 39731, 39872, 39876,
  ];
  public static CRAFTING_ITEM_IDS: number[] = [37282, 36116];
  public static CRAFTING_GEAR_IDS: number[] = [
    38891, 38892, 38893, 38894, 38895, 38896, 38897, 38898, 38899, 38900, 38901,
    38902, 38903, 38904, 38905, 38906, 38907, 38908, 38909, 38910,
  ];

  public static MATERIA: number[] = [
    33919, 33932, 33918, 33931, 33920, 33933, 33929, 33942, 33928, 33941,
  ];

  public static TOME_MATS: number[] = [
    39714, 39715, 39711, 39712, 39713, 39716,
  ];

  public static DEFAULT_PRICECHECK_ITEMS: number[] = Constants.TOME_MATS;
}
