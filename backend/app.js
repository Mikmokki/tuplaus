import { Application, superoak } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { router } from "./routes/routes.js";
import { clearDatabase } from "./services/gameService.js";
const app = new Application();

app.use(errorMiddleware);
app.use(router.routes());
Deno.test({
  name: "POST request to /players should create new user",
  async fn() {
    await clearDatabase();
    const testClient = await superoak(app);
    await testClient
      .post("/players")
      .send({ name: "testiukko" })
      .expect({ id: 1, name: "testiukko", balance: "$0.00" });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "GET request to /players/{id} should show user data",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .get("/players/1")
      .expect({ id: 1, name: "testiukko", balance: "$0.00" });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "POST request to /deposit should increase balance",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/deposit")
      .send({ id: 1, amount: 20 })
      .expect({ id: 1, name: "testiukko", balance: "$20.00" });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "POST request to /withdraw should decrease balance",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/withdraw")
      .send({ id: 1, amount: 13 })
      .expect({ id: 1, name: "testiukko", balance: "$7.00" });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "POST request to /double should not work with incorrect user",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/double")
      .send({ id: 11, stake: 1, choice: "under" })
      .expect(403);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "POST request to /double should not work with incorrect choice",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/double")
      .send({ id: 1, stake: 1, choice: "2" })
      .expect(400);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "POST request to /double should not work with stake higher than balance",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/double")
      .send({ id: 1, stake: 111, choice: "under" })
      .expect(406);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "POST request to /double should work with correct request body",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/double")
      .send({ id: 1, stake: 1, choice: "under" })
      .expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
app.listen({ port: 7777 });
