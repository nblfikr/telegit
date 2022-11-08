import { EventPayload } from "../types/Payload";

import {
  IssueOpened,
  IssueClosed,
  Ping,
  Push,
  IssueReopened,
  IssueDeleted,
  IssueEdited,
  IssueAssigned,
  IssueUnassigned,
  IssueLabeled,
  IssueUnlabeled,
  PRClosed,
  PREdited,
  PROpened
} from "../templates";
import templite from "templite";

export const MessageHandler = <Name extends keyof EventPayload>(
  event: string,
  action: string | undefined,
  data: EventPayload[Name]
): string => {
  let message = `Message for event ${event}.${action} is unhandled`;

  if (event === "issues") {
    /**
     * To avoid wrong message data `actionSet` and `templateSet`
     * must shorted in same index
     */
    const actionSet: string[] = [
      "assigned",
      "closed",
      "deleted",
      "edited",
      "labeled",
      "opened",
      "reopened",
      "unassigned",
      "unlabeled"
    ];
    const templatSet: string[] = [
      IssueAssigned,
      IssueClosed,
      IssueDeleted,
      IssueEdited,
      IssueLabeled,
      IssueOpened,
      IssueReopened,
      IssueUnassigned,
      IssueUnlabeled
    ];

    /**
     * Return template message according the defined action
     */
    actionSet.forEach((ghAction, i) => {
      if (ghAction === action) {
        message = templatSet[i];
      }
    });
  }

  if (event === "ping") {
    message = Ping;
  }

  if (event === "pull_request") {
    const actionSet: string[] = ["closed", "edited", "opened"];
    const templateSet: string[] = [PRClosed, PREdited, PROpened];
    /**
     * Return template message according the defined action
     */
    actionSet.forEach((ghAction, i) => {
      if (ghAction === action) message = templateSet[i];
    });
  }

  if (event === "push") {
    message = Push;
  }

  return templite(message, data);
};
