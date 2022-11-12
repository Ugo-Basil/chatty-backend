export class Helpers {
  static firstletterToUpperCase(str: string) {
    const valueString = str.toLocaleLowerCase();

    return valueString.split(' ').map((value: string) =>  `${value.charAt(0).toUpperCase() + value.slice(1)}`).join(' ');

  }

  static lowerCase(str: string) {
    return str.toLocaleLowerCase();
  }

  static generateRandomIntegers(integerlength: number): number {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < integerlength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return parseInt(result, 10);
  }
}