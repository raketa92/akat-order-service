interface IOrderTopics {
  order: {
    topicName: string;
    events: {
      status_updated: string;
    }
  },
  payment: {
    topicName: string;
    events: {
      status_updated: string;
    }
  },
  language: {
    topicName: string;
    events: {
      language_updated: string;
    }
  },
}

export const TOPICS: IOrderTopics = {
  payment: {
    topicName: "PaymentService",
    events: {
      status_updated: "payment_product_status",
    },
  },
  order: {
    topicName: "OrderService",
    events: {
      status_updated: "order_status_updated",
    },
  },
  language: {
    topicName: "LanguageService",
    events: {
      language_updated: "language_updated",
    },
  },
};