import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartService} from "../../shared/chart.service";
import {Stock} from "../../shared/data";
import {Subject} from "rxjs/Subject";
import {ChartComponent} from "../chart/chart.component";
import {isUndefined} from "util";

@Component ({
    selector: 'portfolio',
    templateUrl: './app/components/portfolio/portfolio.component.html',
    styles: [require('./portfolio.component.scss')]
})
export class PortfolioComponent implements OnInit{
    public dateStart: Date;
    public dateEnd: Date;

    public dateFrom: Date;
    public dateTo: Date;

    @ViewChild(ChartComponent) chartComponent: ChartComponent;

    constructor(private service: ChartService){

    }

    ngOnInit() {
        this.dateStart = this.service.getStart();
        this.dateEnd = this.service.getEnd();
    }

    public onSelectFrom(date: Date) {
        if(this.dateTo === undefined || this.dateFrom === undefined){
            return 0;
        }
        else {
            this.chartComponent.redrawChart(this.dateFrom, this.dateTo);
        }
    }

    public onSelectTo(date: Date) {
        if(this.dateTo === undefined || this.dateFrom === undefined){
            return 0;
        }
        else {
            this.chartComponent.redrawChart(this.dateFrom, this.dateTo);
        }
    }

}