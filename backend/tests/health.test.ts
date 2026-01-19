import request from "supertest";
import app from "../src/app";

describe("Health Check API Integration Tests", () => {
  it("Should return healthy status for /api/health", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("UP");
  });
});
