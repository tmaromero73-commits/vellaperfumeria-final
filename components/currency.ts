export type Currency = 'EUR' | 'USD' | 'GBP';

const CONVERSION_RATES: Record<Currency, number> = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.85,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
};

export const convertPrice = (priceInEur: number, toCurrency: Currency): number => {
    return priceInEur * CONVERSION_RATES[toCurrency];
};

export const formatCurrency = (priceInEur: number, currency: Currency, options: { decimals?: number } = {}): string => {
    const converted = convertPrice(priceInEur, currency);
    const symbol = CURRENCY_SYMBOLS[currency];
    
    if (options.decimals !== undefined) {
        // Spanish style for commas
        const priceString = converted.toFixed(options.decimals).replace('.', ',');
        // For EUR, symbol is often at the end
        if (currency === 'EUR') {
           return `${priceString} ${symbol}`;
        }
        return `${symbol}${priceString}`;
    }
    
    const priceString = Math.round(converted);
    if (currency === 'EUR') {
       return `${priceString}${symbol}`;
    }
    return `${symbol}${priceString}`;
}