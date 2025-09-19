import { Injectable } from '@angular/core';
import { PortfolioItem } from '../home/portfolio-items';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private storageKey = 'portfolio';

  getPortfolio(): PortfolioItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  savePortfolio(items: PortfolioItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}