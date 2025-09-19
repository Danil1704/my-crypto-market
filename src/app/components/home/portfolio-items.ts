export interface PortfolioItem {
  targetPrice: any;
  id: string;
  symbol: string;
  name: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
  profitLoss?: number;
  profitLossPercent?: number;
  image?: string;
  price_change_percentage_24? : number;
}