import {
    Component,
    ElementRef,
    ViewChild,
    OnInit
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as tip from "d3-tip";
import {Stock} from '../../shared/data';
import {ChartService} from "../../shared/chart.service";

@Component({
    selector: 'chart',
    templateUrl: './app/components/chart/chart.component.html',
    styles: [require('./chart.component.scss')]
})
export class ChartComponent implements OnInit {
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
    private gradient: any;
    private gX: any;
    private gY: any;
    private xAxis: any;
    private yAxis: any;
    private chart: any;
    private chartGradient: any;
    private dot: any;
    private data: Stock[] = [];
    private stocks: Stock[];
    private xWidth: number;

    private setData(dateFrom: Date, dateTo: Date) {
        let begin: number, end: number;
        for (let i = 0; i < this.stocks.length; i++) {
            if (Date.parse(this.stocks[i].date.toDateString()) == Date.parse(dateFrom.toDateString())) {
                begin = i;
            }
            if (Date.parse(this.stocks[i].date.toDateString()) == Date.parse(dateTo.toDateString())) {
                end = i;
            }
        }
        for (let i = begin; i < end + 1; i++) {
            this.data.push(new Stock(this.stocks[i].date, this.stocks[i].value));
        }
    }

    private setSize() {
        this.htmlElement = this.element.nativeElement;
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientHeight - this.margin.top - this.margin.bottom;
    }

    constructor(private service: ChartService){

    }

    ngOnInit() {
        this.stocks = this.service.getStocks();
    }

    ngAfterViewInit() {
        this.setSize();
        this.initSvg();
        this.initAxis();
        this.initGradient();
        this.drawChart();
        this.drawAxis();
    }

    private initSvg() {
        this.svg = d3.select("svg")
            .call(d3.zoom()
                .scaleExtent([1, 1])
                .translateExtent([[0, this.margin.top + this.margin.bottom], [this.width * 1.5, this.height]])
                .on("zoom", () => {
                    this.chart.attr("transform", d3.event.transform);
                    this.chartGradient.attr("transform", d3.event.transform);
                    this.gX.call(this.xAxis.scale(d3.event.transform.rescaleX(this.x)));
                    this.gY.call(this.yAxis.scale(d3.event.transform.rescaleY(this.y)));
                    this.dot.attr("transform", d3.event.transform);
                }))
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    }

    private initAxis() {
        if (this.stocks.length / 2 * 120 > this.width) {
            this.xWidth = this.stocks.length / 2 * 100;
        }
        else {
            this.xWidth = this.width;
        }
        this.x = d3Scale.scaleTime()
            .domain(d3Array.extent(this.stocks, (d) => d.date))
            .range([0, this.xWidth]);
        this.y = d3Scale.scaleLinear()
            .domain(d3Array.extent(this.stocks, (d) => d.value))
            .range([this.height, 0]);

        this.xAxis = d3Axis.axisBottom(this.x);
        this.yAxis = d3Axis.axisLeft(this.y);
    }

    private drawAxis() {
        this.gX = this.svg.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.xAxis.ticks(7)
                .tickFormat(d3.timeFormat("%b %d")));

        this.gY = this.svg.append("g")
            .attr("class", "axis axis-y")
            .call(this.yAxis.ticks(5)
                .tickSize(20));

        this.drawGrid();
    }

    private drawGrid() {
        d3.selectAll("g line")
            .classed("g-line", true);
        let grid = d3.selectAll("g.axis-y g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.width + this.margin.right)
            .attr("y2", 0);

        d3.selectAll(".axis-y g text")
            .classed("yaxis-text", true);

        let middle = Math.ceil(grid.size() / 2);
        d3.selectAll("g.axis-y g.tick .grid-line")
            .select(function (d, i) {
                if (i == middle - 1) {
                    return this
                }
                else return null;
            })
            .classed("middle-line", true);

        d3.selectAll("g.axis-y g.tick")
            .select(function (d, i) {
                if (i == middle - 1) {
                    return this
                }
                else return null;
            })
            .append("text")
            .classed("middle-line-text", true)
            .attr("x", 70)
            .attr("y", -20)
            .attr("text-anchor", "middle")
            .text("Market Average");
    }

    private removeGrid() {
        d3.selectAll(".grid-line")
            .remove();

        d3.selectAll(".middle-line")
            .remove();

        d3.selectAll(".middle-line-text")
            .remove();
    }

    private initGradient() {
        this.gradient = this.svg.append('linearGradient')
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("x2", "0%")
            .attr("y1", "0%")
            .attr("y2", "100%");

        this.gradient.append("stop")
            .attr("offset", "0%")
            .style("stop-color", "#5fc6ef")
            .style("stop-opacity", 1);

        this.gradient.append("stop")
            .attr("offset", "100%")
            .style("stop-color", "#fdfeff")
            .style("stop-opacity", 1);
    }

    private drawChart() {
        this.line = d3Shape.line()
            .x((d: any) => this.x(d.date))
            .y((d: any) => this.y(d.value));

        this.chart = this.svg
            .append("path")
            .datum(this.stocks)
            .attr("class", "line")
            .attr("d", this.line);

        this.area = d3Shape.area()
            .x((d: any) => this.x(d.date))
            .y1((d: any) => this.y(d.value))
            .y0(this.height);

        this.chartGradient = this.svg.append("path")
            .datum(this.stocks)
            .attr("class", "area")
            .attr("d", this.area);

        this.initTooltip();
    }

    private initTooltip(data: Stock[] = this.stocks) {
        let tooltip = d3.select(".tip");

        this.dot = this.svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot-hide")
            .attr("r", 20)
            .attr("cx", (d) => {
                return this.x(d.date);
            })
            .attr("cy", (d) => {
                return this.y(d.value);
            })
            .on('mouseover', function (d) {
                tooltip.style("visibility", "visible");
                tooltip
                    .style("top", (this.getBoundingClientRect().top - 66 + window.scrollY) + "px")
                    .style("left", (this.getBoundingClientRect().left - 25 + window.scrollX) + "px");

                d3.select(".tip__text")
                    .html("$" + d.value);
                d3.select(this)
                    .attr("class", "dot-show");
            })
            .on('mouseout', function () {
                tooltip.style("visibility", "hidden");
                d3.select(this)
                    .attr("class", "dot-hide");
            });
    }

    public redrawChart(dateFrom: Date, dateTo: Date) {
        this.setData(dateFrom, dateTo);
        this.setSize();
        this.x = d3Scale.scaleTime()
            .domain(d3Array.extent(this.data, (d) => d.date))
            .range([0, this.width]);
        this.y = d3Scale.scaleLinear()
            .domain(d3Array.extent(this.data, (d) => d.value))
            .range([this.height, 0]);

        this.xAxis = d3Axis.axisBottom(this.x);
        this.yAxis = d3Axis.axisLeft(this.y);

        this.gX.transition()
            .duration(750)
            .call(this.xAxis.ticks(7)
                .tickFormat(d3.timeFormat("%b %d")));
        this.gY.transition()
            .duration(750)
            .call(this.yAxis.ticks(6)
                .tickSize(20));

        this.removeGrid();
        this.drawGrid();

        this.chart
            .datum(this.data)
            .transition()
            .duration(750)
            .attr("transform", d3.zoomIdentity)
            .attr("d", this.line);

        this.chartGradient
            .datum(this.data)
            .transition()
            .duration(750)
            .attr("transform", d3.zoomIdentity)
            .attr("d", this.area);

        this.dot
            .remove();

        this.initTooltip(this.data);

        this.svg.call(d3.zoom()
            .on("zoom", null));
        this.data.length = 0;
    }
}