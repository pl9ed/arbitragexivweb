export class Region {
  name: string;

  static THAVNAIR = new Region('THAVNAIR');
  static LABYRINTHOS = new Region('LABYRINTHOS');
  static GARLEMALD = new Region('GARLEMALD');
  static MARE_LAMENTORUM = new Region('MARE LAMENTORUM');
  static ELPIS = new Region('ELPIS');
  static ULTIMA_THULE = new Region('ULTIMA THULE');
  static OLD_SHARLAYAN = new Region('OLD SHARLAYAN');
  static RADZ_AT_HAN = new Region('RADZ-AT-HAN');
  static MOR_DHONA = new Region('MOR DHONA');

  constructor(name: string) {
    this.name = name;
  }
}
