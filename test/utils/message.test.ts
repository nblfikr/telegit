import { describe, expect, it } from "vitest";
import { MessageHandler } from "../../src/utils/message";

describe("ISSUE test must return the message template as defined before", () => {
  const event = "issues";
  const data = {
    url: "https://github.com/paijohn/telegit/issues/5",
    number: 5,
    title: "telegit issue",
    user: {
      name: "paijohn"
    },
    repository: {
      name: "telegit",
      url: "https://github.com/paijohn/telegit"
    },
    sender: {
      name: "paijohn"
    },
    body: "body not null"
  };

  it("should be unhandled event action", () => {
    const action = "undefined";
    // @ts-expect-error unhandler event
    const message = MessageHandler(event, action, {});
    expect(message).toBe("Message for event issues.undefined is unhandled");
  });

  it("should be return opened issue message", () => {
    const action = "opened";
    const message = MessageHandler(event, action, data);
    expect(message).toBe(
      `<b>[NEW-ISSUE]</b> on <b><a href="https://github.com/paijohn/telegit">telegit</a></b>\n#5 telegit issue by <b>paijohn</b>\n\nbody not null`
    );
  });

  it("should be return closed issue message", () => {
    const action = "closed";
    const message = MessageHandler(event, action, data);
    expect(message).toBe(
      `<b>CLOSED ISSUE</b>\n\n Issue <b><a href="https://github.com/paijohn/telegit">telegit</a></b>\n#5 telegit issue has been closed by <b>paijohn</b>`
    );
  });
});
