export interface AnchorInfo {
  id: string;
  name: string;
  country: string;
  currency: string;
  paymentMethods: string[];
  depositFee: string;
  settlementTime: string;
  logo: string;
}

export const SUPPORTED_ANCHORS: AnchorInfo[] = [
  {
    id: "anchor_in",
    name: "Fonbnk India (UPI / IMPS)",
    country: "India",
    currency: "INR",
    paymentMethods: ["UPI", "GPay", "IMPS Bank Transfer"],
    depositFee: "0.1%",
    settlementTime: "< 10 seconds",
    logo: "🇮🇳",
  },
  {
    id: "anchor_ng",
    name: "Fonbnk Nigeria (Bank & Mobile Money)",
    country: "Nigeria",
    currency: "NGN",
    paymentMethods: ["Kuda", "OPay", "Bank Wire"],
    depositFee: "0.15%",
    settlementTime: "< 15 seconds",
    logo: "🇳🇬",
  },
  {
    id: "anchor_ke",
    name: "MoneyGram Kenya (M-Pesa)",
    country: "Kenya",
    currency: "KES",
    paymentMethods: ["M-Pesa", "Airtel Money"],
    depositFee: "0.10%",
    settlementTime: "< 5 seconds",
    logo: "🇰🇪",
  },
  {
    id: "anchor_ph",
    name: "Coins.ph Philippines (GCash)",
    country: "Philippines",
    currency: "PHP",
    paymentMethods: ["GCash", "Maya", "InstaPay"],
    depositFee: "0.20%",
    settlementTime: "< 12 seconds",
    logo: "🇵🇭",
  },
];

/**
 * Initiates an interactive SEP-24 fiat deposit session with regulated Stellar Anchors
 * @param anchorId Target regional anchor identifier
 * @param amountLocal Local fiat currency amount
 * @param asset Target Stellar token asset (USDC)
 */
export async function initiateSEP24Deposit(anchorId: string, amountLocal: number, asset: string) {
  await new Promise((res) => setTimeout(res, 800));
  return {
    interactiveUrl: `https://testnet-anchor.stellar.org/sep24/interactive?asset=${asset}&amount=${amountLocal}`,
    transactionId: `sep24_tx_${Date.now()}`,
    status: "pending_user_transfer_start",
  };
}
