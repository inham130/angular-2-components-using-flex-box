import { stocks } from './data';
import * as d3Array from "d3-array";

export class ChartService {

    getStocks(){
        return stocks;
    }

    getStart(){
        return d3Array.extent(stocks, (d) => d.date)[0];
    }

    getEnd(){
        return d3Array.extent(stocks, (d) => d.date)[1];
    }


}