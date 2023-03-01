import * as gameService from "../../services/gameService.js";

const getPlayer = async ({ response, params }) => {
  response.body = await gameService.getPlayer(params.id);
};

const createPlayer = async ({ request, response }) => {
  const body = await request.body().value;
  const res = await gameService.createPlayer(body.name);
  response.body = res;
};
const getCard = () => {
  const suits = ["diamond", "club", "heart", "spade"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return {
    suit: suits[Math.floor(Math.random() * 4)],
    number: numbers[Math.floor(Math.random() * 13)],
  };
};

const double = async ({ request, response }) => {
  const { id, choice, stake } = await request.body().value;
  const player = await gameService.getPlayer(id);
  if (!player) {
    response.status = 403;
    response.body = { error: "Invalid user" };
    return;
  }
  if (choice !== "over" && choice !== "under") {
    response.status = 400;
    response.body = { error: "Invalid request" };
    return;
  }
  if (stake > Number.parseFloat(player.balance.replace("$", ""))) {
    response.status = 406;
    response.body = { error: "Not enough balance" };
    return;
  }
  const card = getCard();
  const victory = choice === "over" ? card.number > 7 : card.number < 7;
  if (victory) {
    const event = await gameService.createEvent(
      id,
      stake,
      choice,
      `${card.suit} ${card.number}`,
      stake * 2
    );
    await gameService.updateBalance(id, stake);
    response.body = event;
  } else {
    const event = await gameService.createEvent(
      id,
      stake,
      choice,
      `${card.suit} ${card.number}`,
      0
    );
    await gameService.updateBalance(id, -stake);
    response.body = event;
  }
};
const deposit = async ({ request, response }) => {
  const { id, amount } = await request.body().value;
  response.body = await gameService.updateBalance(id, amount);
};
const withdraw = async ({ request, response }) => {
  const { id, amount } = await request.body().value;
  response.body = await gameService.updateBalance(id, -amount);
};
export { getPlayer, createPlayer, double, deposit, withdraw };
