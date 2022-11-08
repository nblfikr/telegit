import { describe, expect, it } from "vitest";
import request from "supertest";

// @ts-expect-error the root path alias is defined in vitest.config.ts file
import { PORT } from "~/env";

const BASE_URL = `http://localhost:${PORT}`;
describe("GET method", function () {
  it("should be return message OK and status code 200", async () => {
    const req = await request(BASE_URL)
      .get("/")
      .set("Accept", "application/json");
    expect(req.status).toBe(200);
    expect(req.text).toBe("OK");
  });
});

describe("POST method", function () {
  it("should return token ", async () => {
    const req = await request(BASE_URL)
      .post("/token")
      .send({ webhook: "unit test token" });
    expect(req.status).toBe(200);
    expect(req.text).toBe(
      "sha256=b35ebd0758b43a2f65d3ebfc41e709a0be9a852d5015dfc452a552f2895beb25"
    );
  });
});
