
export enum SortOptionsEnum {
    ByPrice = 1,
    ByMarketCap,
   
  }
export class ValueText
{
    Value: number;
    Text: string;
 
}
export class Market_data
{
    price_usd: number;
    last_trade_at: Date;
}
export class Marketcap
{
    current_marketcap_usd: number;
    last_trade_at: Date;
}
export class Metrics
{
    market_data: Market_data;
    marketcap: Marketcap;
}
export class CryptocurrencyData
{
    id: string;
    symbol: string;
    name: string;
    metrics:Metrics;
}
