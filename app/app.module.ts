import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule } from 'angular2-material-datepicker'

import { AppComponent }  from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { HdComponent } from './components/hd/hd.component';
import { OverviewComponent } from './components/overview/overview.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { MarketTrendsComponent } from './components/market-trends/market-trends.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
    imports     : [
        BrowserModule,
        DatepickerModule
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        ContentComponent,
        HdComponent,
        OverviewComponent,
        PortfolioComponent,
        MarketTrendsComponent,
        RecentActivityComponent,
        ChartComponent
    ],
    bootstrap   : [AppComponent],
})
export class AppModule {
}