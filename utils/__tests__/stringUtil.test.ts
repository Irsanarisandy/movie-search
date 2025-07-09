import { checkPlural, renderSymbols, translateDuration } from "../stringUtil";

describe("checkPlural function", () => {
  test("test singular", () => {
    const mockList = ["a"];
    const result = `item${checkPlural(mockList)}`;
    expect(result).toBe("item");
  });
  test("test plural", () => {
    const mockList = ["a", "b"];
    const result = `item${checkPlural(mockList)}`;
    expect(result).toBe("items");
  });
});

describe("renderSymbols function", () => {
  test("test render symbols", () => {
    expect(renderSymbols("Tom&apos;s &quot;special&quot; racket")).toBe(`Tom's "special" racket`);
  });
});

describe("translateDuration function", () => {
  test.each([
    ["hour", "PT1H", "1 hour"],
    ["hours", "PT2H", "2 hours"],
    ["minute", "PT1M", "1 minute"],
    ["minutes", "PT4M", "4 minutes"],
    ["second", "PT1S", "1 second"],
    ["seconds", "PT8S", "8 seconds"],
  ])("test %s", (_, imdbDuration, result) => {
    expect(translateDuration(imdbDuration)).toBe(result);
  });
  test("test hour and minute", () => {
    expect(translateDuration("PT1H4M")).toBe("1 hour 4 minutes");
  });
  test("test minute and second", () => {
    expect(translateDuration("PT30M8S")).toBe("30 minutes 8 seconds");
  });
});
