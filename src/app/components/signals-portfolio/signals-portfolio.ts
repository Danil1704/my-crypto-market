import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

interface Coin {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
}

@Component({
  selector: 'app-signals-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, TableModule, CardModule],
  templateUrl: './signals-portfolio.html',
  styleUrls: ['./signals-portfolio.css']
})
export class SignalsPortfolio {

  private nextId = 1;
  coins = signal<Coin[]>([
    { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: 0.5, buyPrice: 60000, currentPrice: 64000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', amount: 2, buyPrice: 3000, currentPrice: 3200 },
  ]);

  totalValue = computed(() =>
    this.coins().reduce((acc, c) => acc + c.amount * c.currentPrice, 0)
  );

  totalProfit = computed(() =>
    this.coins().reduce((acc, c) => acc + (c.currentPrice - c.buyPrice) * c.amount, 0)
  );

  newCoin = signal<Coin>({
    id: 0,
    name: '',
    symbol: '',
    amount: 0,
    buyPrice: 0,
    currentPrice: 0
  });

  addCoin() {
    const coin = { ...this.newCoin(), id: ++this.nextId };
    if (!coin.name || !coin.symbol) return;
    this.coins.update(coins => [...coins, coin]);
    this.newCoin.set({ id: 0, name: '', symbol: '', amount: 0, buyPrice: 0, currentPrice: 0 });
  }

  removeCoin(id: number) {
    this.coins.update(coins => coins.filter(c => c.id !== id));
  }

  updatePrice(coin: Coin, delta: number) {
    this.coins.update(coins =>
      coins.map(c =>
        c.id === coin.id ? { ...c, currentPrice: c.currentPrice + delta } : c
      )
    );
  }
}