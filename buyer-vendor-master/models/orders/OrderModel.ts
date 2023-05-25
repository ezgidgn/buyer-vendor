  export interface OrderModel {
    increment_id: string
    external_id: string
    price: number
    status: string
    purchase_point: string
    createdAt: string
    updatedAt: string
    subtotal: number
    shipping_handling: number
    wallet_amount: number
    grand_total: number
    total_paid: number
    total_refunded: number
    total_due: number
    order_date: Date
  }
  