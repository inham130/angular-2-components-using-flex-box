import { Component, ElementRef, ViewChild } from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as tip from "d3-tip";

import { Stock, Stocks } from './shared/data';

@Component({
    selector: 'chart',
    templateUrl: './app/components/chart/chart.component.html',
    styles: [require('./chart.component.scss')]
})
export class ChartComponent {
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

    private setData(begin: number, end: number) {
        let lg = Math.floor(Stocks.length/2);
        if(begin >= lg) {
            console.log("begin have to big value");
            return 0;
        }
        if(end >=lg) {
            end = lg;
        }
        else {
            for(let i = begin; i < end; i++) {
                this.data.push(new Stock(Stocks[i].date, Stocks[i].value));
            }
        }

        console.log("data", this.data);
    }

    private setSize() {
        this.htmlElement = this.element.nativeElement;
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientHeight - this.margin.top - this.margin.bottom;
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
                    .translateExtent([[0, this.margin.top + this.margin.bottom], [this.width*1.5, this.height]])
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
        this.setData(0, 7);
        this.x = d3Scale.scaleTime()
            .domain(d3Array.extent(Stocks, (d) => d.date))
            .range([0, this.width*1.5]);

        this.y = d3Scale.scaleLinear()
            .domain(d3Array.extent(Stocks, (d) => d.value))
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
    }

    private initGradient(){
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
            .datum(Stocks)
            .attr("class", "line")
            .attr("d", this.line);

         this.area = d3Shape.area()
         .x((d: any) => this.x(d.date))
         .y1((d: any) => this.y(d.value))
         .y0(this.height);

         this.chartGradient = this.svg.append("path")
         .datum(Stocks)
         .attr("class", "area")
         .attr("d", this.area);

        let tooltip = d3.select(".tip");

        this.dot = this.svg.selectAll(".dot")
            .data(Stocks)
            .enter()
            .append("circle")
            .attr("class", "dot-hide")
            .attr("r", 20)
            .attr("cx", (d) => { return this.x(d.date); })
            .attr("cy", (d) => { return this.y(d.value); })
            .on('mouseover', function(d) {
                tooltip.style("visibility", "visible");
                tooltip
                    .style("top", (this.getBoundingClientRect().top-66+window.scrollY)+"px")
                    .style("left",(this.getBoundingClientRect().left-25+window.scrollX)+"px");

                d3.select(".tip__text")
                    .html("$"+d.value);
                d3.select(this)
                    .attr("class", "dot-show");
            })
            .on('mouseout', function() {
                tooltip.style("visibility", "hidden");
                d3.select(this)
                    .attr("class", "dot-hide");
            });
    }
  /*  private drawButtons(){
        this.svg.append("rect")
            .style("fill", "none")
            .style("stroke", "#e4ebf1")
            .style("stroke-width", "2")
            .attr("x", 50)
            .attr("y", 310)
            .attr("width", 30)
            .attr("height", 30);

        /!*let rect = d3.select("rect");
        rect.on("click", () => this.click());*!/

        this.svg.append("line")
            .attr("x1", 65)
            .attr("y1", 325)
            .attr("x2", 58)
            .attr("y2", 318)
            .style("stroke", "#60c5ef")
            .style("stroke-width", "1");
    }*/
}