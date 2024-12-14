import { Customer } from "../../models";
import Game from "../../models/game";
import Payment from "../../models/payment";

const getAllPayments = async () => {
  return await Payment.findAll();
};

const createPayment = async ({
  product,
  customerId,
  paid,
  method,
  value,
  gameId,
}: {
  product: string;
  customerId: number;
  paid: boolean;
  method: string;
  value: number;
  gameId?: number;
}) => {
  // Validate if customerId exists
  const customerExists = await Customer.findByPk(customerId);
  if (!customerExists) {
    throw new Error(`Customer with ID ${customerId} does not exist.`);
  }

  // Validate if gameId exists
  if (gameId) {
    const gameExists = await Game.findByPk(gameId);
    if (!gameExists) {
      throw new Error(`Game with ID ${gameId} does not exist.`);
    }
  }

  return await Payment.create({
    product,
    customerId,
    paid,
    method,
    value,
    gameId,
  });
};

export default { getAllPayments, createPayment };
