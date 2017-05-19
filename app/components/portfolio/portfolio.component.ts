import { Component } from '@angular/core';

@Component ({
    selector: 'portfolio',
    templateUrl: './app/components/portfolio/portfolio.component.html',
    styles: [require('./portfolio.component.scss')]
})
export class PortfolioComponent {
    public dateFrom: Date;
    public dateTo: Date;

    public onSelectFrom(date: Date) {
        console.log("onSelectFrom: ", date);
    }

    public onSelectTo(date: Date) {
        console.log("onSelectTo: ", date);
    }

}