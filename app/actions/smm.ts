'use server'

const SMMWIZ_API_URL = 'https://smmwiz.com/api/v2';
const API_KEY = process.env.SMMWIZ_API_KEY;

export interface SMMService {
  service: string;
  name: string;
  type: string;
  category: string;
  rate: string;
  min: string;
  max: string;
  dripfeed: boolean;
  refill: boolean;
  cancel: boolean;
}

export async function getServices(): Promise<SMMService[]> {
  if (!API_KEY) {
    console.error('SMMWIZ_API_KEY is not defined in .env.local');
    return [];
  }

  try {
    const response = await fetch(SMMWIZ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        key: API_KEY,
        action: 'services',
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Increase price by 50% for each service
    const markedUpData = (data as SMMService[]).map(service => ({
      ...service,
      rate: (parseFloat(service.rate) * 1.5).toFixed(3)
    }));

    return markedUpData;
  } catch (error) {
    console.error('Failed to fetch SMM services:', error);
    return [];
  }
}

export async function getPaymentLink() {
  return process.env.PAYMENT_LINK || 'https://cash.app/$indicoder';
}
