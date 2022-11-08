import { WebhookEvent as Payload } from "@octokit/webhooks-types";

import {
  Assignee,
  Changes,
  Comment,
  Commit,
  EventPayload,
  Issue,
  Label,
  PullRequest,
  Pusher,
  Repository,
  Sender
} from "../../types/Payload";

export class Event {
  private readonly _event: string;
  public readonly _action?: string;

  private readonly _assignee?: Assignee;
  private readonly _changes?: Changes;
  private readonly _comment?: Comment;
  private readonly _commits?: Commit;
  private readonly _issue?: Issue;
  private readonly _label?: Label;
  private readonly _pusher?: Pusher;
  private readonly _pullrequest?: PullRequest;
  private readonly _repository?: Repository;
  private readonly _sender?: Sender;

  constructor(event: string, payload: Payload) {
    this._event = event;

    if ("action" in payload && payload.action !== undefined) {
      this._action = payload.action;
    }

    if ("assignee" in payload && payload.assignee !== undefined) {
      this._assignee = {
        name: payload.assignee?.login ?? "<i>Not Assignee</i>"
      };
    }

    if ("changes" in payload && payload.changes !== undefined) {
      const changes = payload.changes as Changes;
      this._changes = {
        body: {
          from: changes.body.from
        }
      };
    }

    if ("comment" in payload && payload.comment !== undefined) {
      this._comment = {
        url: payload.comment.html_url,
        body: payload.comment.body,
        user: {
          name: payload.comment.user.login
        }
      };
    }

    if ("commits" in payload && payload.commits !== undefined) {
      const commits = payload.commits[0] ?? undefined;

      if (commits !== undefined) {
        this._commits = {
          url: commits.url,
          message: commits.message,
          author: {
            name: commits.author?.name
          },
          committer: {
            name: commits.committer?.name
          }
        };
      }
    }

    if ("issue" in payload && payload.issue !== undefined) {
      this._issue = {
        url: payload.issue.html_url,
        number: String(payload.issue.number),
        title: payload.issue.title,
        user: {
          name: payload.issue.user.login
        },
        assignee: {
          name:
            (payload.issue.assignee as Assignee)?.name ?? "<i>Not Assignee</i>"
        },
        body: payload.issue.body ?? "<i>Body Not Set</i>"
      };
    }

    if ("label" in payload && payload.label !== undefined) {
      this._label = {
        name: payload.label?.name,
        color: payload.label?.color
      };
    }

    if ("pull_request" in payload && payload.pull_request !== undefined) {
      this._pullrequest = {
        url: payload.pull_request.html_url,
        state: payload.pull_request.state,
        title: payload.pull_request.title,
        number: String(payload.pull_request.number),
        body: payload.pull_request.body ?? "<i>Body Not Set</i>"
      };
    }

    if ("pusher" in payload && payload.pusher !== undefined) {
      const pusher = payload.pusher as Pusher;
      this._pusher = {
        name: pusher.name,
        email: pusher.email
      };
    }

    if ("repository" in payload && payload.repository !== undefined) {
      this._repository = {
        name: payload.repository.full_name,
        url: payload.repository.html_url
      };
    }

    if ("sender" in payload && payload.sender !== undefined) {
      this._sender = {
        name: payload.sender.login
      };
    }
  }

  public payload() {
    const event = this._event;
    const action = this._action;

    if (event === "issues") {
      switch (action) {
        case "opened":
          return {
            ...this._issue,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issues.opened"];
        case "edited":
          return {
            ...this._issue,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issues.edited"];
        case "deleted":
          return {
            ...this._issue,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issues.deleted"];
        case "closed":
          return {
            ...this._issue,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issues.closed"];
        case "assigned":
          return {
            ...this._issue,
            assignee: this._assignee,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issues.assigned"];
        case "unassigned":
          return {
            ...this._issue,
            assignee: this._assignee,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issues.unassigned"];
        case "labeled":
          return {
            ...this._issue,
            label: this._label,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issues.labeled"];
        case "unlabeled":
          return {
            ...this._issue,
            label: this._label,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issues.unlabeled"];
      }
    }

    if (event === "issue_comment") {
      switch (action) {
        case "created":
          return {
            ...this._comment,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issue_comment.created"];
        case "edited":
          return {
            ...this._comment,
            changes: this._changes,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issue_comment.edited"];
        case "deleted":
          return {
            ...this._comment,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["issue_comment.deleted"];
      }
    }

    if (event === "ping") {
      return {
        repository: this._repository,
        sender: this._sender
      } as EventPayload["ping"];
    }

    if (event === "push") {
      return {
        ...this._pusher,
        commits: this._commits,
        repository: this._repository
      } as EventPayload["push"];
    }

    if (event === "pull_request") {
      switch (action) {
        case "opened":
          return {
            ...this._pullrequest,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["pull_request.opened"];
        case "edited":
          return {
            ...this._pullrequest,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["pull_request.edited"];
        case "closed":
          return {
            ...this._pullrequest,
            repository: this._repository,
            sender: this._sender
          } as EventPayload["pull_request.closed"];
      }
    }

    throw new Error(`Unhandle event. Event name: ${this._event}`);
  }
}
