import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { PortfolioService } from '../home/portfolio.service';
import { PortfolioItem } from './portfolio-items';
import { StyleClassModule } from 'primeng/styleclass';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';


export interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  currentPrice: number;
  targetPrice: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    CommonModule,
    CardModule,
    FormsModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    StyleClassModule,
    DrawerModule,
    AvatarModule,
    RippleModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  api: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  coins: Coin[] = [];
  titles: string[] = ['#', 'Coin', 'Price', 'Price Change', '24H Volume'];
  searchText: string = '';
  filteredCoints: Coin[] = [];

  drawerVisible: boolean = false;
  dialogVisible: boolean = false;

  showDialog() {
    this.dialogVisible = true;
  }

  portfolio: PortfolioItem[] = [];
  selectedCoin: any | null = null;
  displayDialog: boolean = false;
  newItem: PortfolioItem = {
    id: '',
    symbol: '',
    name: '',
    amount: 0,
    buyPrice: 0,
    currentPrice: 0,
    targetPrice: 0
  };
  editing: boolean = false;

  totalValue: number = 0;
  totalProfitLoss: number = 0;
  totalProfitLossPercent: number = 0;

  constructor(private http: HttpClient, private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.http.get<any[]>(this.api).subscribe(
      (res) => {
        this.coins = res;
        this.filteredCoints = this.coins;
      },
      (err) => console.error(err)
    );
    this.portfolio = this.portfolioService.getPortfolio();
    this.calculatePortfolioMetrics();

    setInterval(() => {
      this.portfolio.forEach((item) => {
        if (item.targetPrice !== undefined) {
          const diff = item.targetPrice - item.currentPrice;
          item.currentPrice += diff * 0.1; // шаг 10% к цели
        }
      });


      this.calculatePortfolioMetrics();
    }, 100); // каждые 100 мс
  }

  updatePortfolioPrices() {
    if (this.portfolio.length === 0) return;

    const ids = this.portfolio.map((p) => p.id).join(',');
    const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`;

    this.http.get<any[]>(api).subscribe((data) => {
      data.forEach((coin) => {
        const item = this.portfolio.find((p) => p.id === coin.id);
        if (item) {
          item.targetPrice = coin.current_price;
          item.price_change_percentage_24 = coin.price_change_percentage_24h;
        }
      });
      this.calculatePortfolioMetrics();
    });
  }

  calculatePortfolioMetrics() {
    this.totalValue = 0;
    this.totalProfitLoss = 0;
    this.totalProfitLossPercent = 0;

    this.portfolio.forEach((item) => {
      const currentPrice = item.currentPrice || item.buyPrice;
      const total = item.amount * currentPrice;
      const profitLoss = (currentPrice - item.buyPrice) * item.amount;
      const profitLossPercent = (profitLoss / (item.buyPrice * item.amount)) * 100;

      item.currentPrice = currentPrice;
      item.profitLoss = profitLoss;
      item.profitLossPercent = profitLossPercent;

      this.totalValue += total;
      this.totalProfitLoss += profitLoss;
    });
    this.totalProfitLossPercent =
      this.totalValue > 0
        ? (this.totalProfitLoss / (this.totalValue - this.totalProfitLoss)) * 100
        : 0;
  }

  openNew(coin: any) {
    this.editing = false;
    this.newItem = {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      amount: 0,
      buyPrice: coin.current_price,
      image: coin.image,
      currentPrice: coin.current_price,
      targetPrice: coin.current_price,
    };
    this.displayDialog = true;
  }

  saveItem() {
    if (this.editing) {
      const index = this.portfolio.findIndex((p) => p.id === this.newItem.id);
      if (index > -1) this.portfolio[index] = this.newItem;
    } else {
      this.portfolio.push({ ...this.newItem });
    }

    this.portfolioService.savePortfolio(this.portfolio);
    this.calculatePortfolioMetrics();
    this.displayDialog = false;
  }

  editItem(item: PortfolioItem) {
    this.editing = true;
    this.newItem = { ...item };
    this.displayDialog = true;
  }

  deleteItem(item: PortfolioItem) {
    this.portfolio = this.portfolio.filter((p) => p.id !== item.id);
    this.portfolioService.savePortfolio(this.portfolio);
    this.calculatePortfolioMetrics();
  }
  searchCoin() {
    this.filteredCoints = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  router: any;
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/notes']);
  }
}