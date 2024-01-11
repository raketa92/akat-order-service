export const OrderStatuses = {
    Processing: "processing",
    Accepted: "accepted",
    RejectedBySeller: "rejected_by_seller",
    RejectedByClient: "rejected_by_client",
    RejectedByAdmin: "rejected_by_admin",
    Paid: "paid",
    Completed: "completed",
    Sent: "sent"
  } as const;
  export const OrderStatusesEnum = Object.values(OrderStatuses);