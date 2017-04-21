import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { HdComponent } from './components/hd/hd.component';
import { OverviewComponent } from './components/overview/overview.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { MarketTrendsComponent } from './components/market-trends/market-trends.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';

@NgModule({
    imports     : [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        ContentComponent,
        HdComponent,
        OverviewComponent,
        PortfolioComponent,
        MarketTrendsComponent,
        RecentActivityComponent
    ],
    bootstrap   : [AppComponent],
})
export class AppModule {
}