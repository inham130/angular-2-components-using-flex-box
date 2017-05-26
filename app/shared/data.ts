export class Stock {
  public date: Date;
  public value: number;

  constructor( date: Date, value: number) {
      this.date = date;
      this.value = value
  }
}

export const stocks: Stock[] = [
    {date: new Date("2017-05-19"), value: 123},
    {date: new Date("2017-05-20"), value: 125},
    {date: new Date("2017-05-21"), value: 139},
    {date: new Date("2017-05-22"), value: 142},
    {date: new Date("2017-05-23"), value: 141},
    {date: new Date("2017-05-24"), value: 140},
    {date: new Date("2017-05-25"), value: 137},
    {date: new Date("2017-05-26"), value: 140},
    {date: new Date("2017-05-27"), value: 142},
    {date: new Date("2017-05-28"), value: 139},
    {date: new Date("2017-05-29"), value: 136},
    {date: new Date("2017-05-30"), value: 141},
    {date: new Date("2017-05-31"), value: 140},
    {date: new Date("2017-06-01"), value: 139},
    {date: new Date("2017-06-02"), value: 140},
    {date: new Date("2017-06-03"), value: 140},
    {date: new Date("2017-06-04"), value: 138},
    {date: new Date("2017-06-05"), value: 139},
    {date: new Date("2017-06-06"), value: 142},
    {date: new Date("2017-06-07"), value: 138},
    {date: new Date("2017-06-08"), value: 143},
    {date: new Date("2017-06-09"), value: 144},
    {date: new Date("2017-06-10"), value: 146},
    {date: new Date("2017-06-11"), value: 142},
    {date: new Date("2017-06-12"), value: 138},
    {date: new Date("2017-06-13"), value: 136},
    {date: new Date("2017-06-14"), value: 140},
    {date: new Date("2017-06-15"), value: 140},
    {date: new Date("2017-06-16"), value: 139},
    {date: new Date("2017-06-17"), value: 140},
];
