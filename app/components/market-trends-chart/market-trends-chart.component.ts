import {Component, ElementRef, ViewChild, OnInit, Output, Input} from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as tip from "d3-tip";

import {Stock} from '../../shared/data';
import {duration} from "moment";
import {line} from "d3-shape";

@Component({
    selector: 'market-trends-chart',
    templateUrl: './app/components/market-trends-chart/market-trends-chart.component.html',
    styles: [require('./market-trends-chart.component.scss')]
})
export class MarketTrendsChartComponent {
    @ViewChild('container') element: ElementRef;
    private htmlElement: HTMLElement;
    private margin = {top: 40, right: 20, bottom: 30, left: 70};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;
    private area: d3Shape.Area<[number, number]>;

    ngAfterViewInit() {
        this.setSize();
        this.initSvg();
        /*this.initAxis();
        this.initGradient();
        this.drawChart();
        this.drawAxis();*/
    }

    private setSize() {
        this.htmlElement = this.element.nativeElement;
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientHeight - this.margin.top - this.margin.bottom;
    }

    private initSvg() {
        this.svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    }
}