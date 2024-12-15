type Rate = {
  exterior: number;
  interior: number;
};

type SubscriptionType = {
  normal: Rate;
  prime: Rate;
};

type Subscriptions = {
  none: SubscriptionType;
  soPadel: SubscriptionType;
  ltc: SubscriptionType;
};

// This later can be in the database for now let's declare it in runtime
const subscriptions: Subscriptions = {
  none: {
    normal: { exterior: 4.5, interior: 4.5 },
    prime: { exterior: 4.5, interior: 7.5 },
  },
  soPadel: {
    normal: { exterior: 4.5, interior: 4.5 },
    prime: { exterior: 4.5, interior: 5.5 },
  },
  ltc: {
    normal: { exterior: 0, interior: 0 },
    prime: { exterior: 0, interior: 0 },
  },
};

type GetSubscriptionValue = {
  subscription: keyof Subscriptions;
  fieldType: "exterior" | "interior";
  isPrime: boolean;
};

export const getSubscriptionValue = ({
  subscription,
  fieldType,
  isPrime,
}: GetSubscriptionValue) =>
  isPrime
    ? subscriptions[subscription].prime[fieldType]
    : subscriptions[subscription].normal[fieldType];
