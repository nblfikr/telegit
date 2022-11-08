type Name = { name: string };

export type Assignee = Name;
export type Sender = Name;
export type User = Name;

export type Label =
  | Name
  | {
      color: string;
    };

export type Changes = {
  body: {
    from: string;
  };
};

export type Issue = {
  url: string;
  number: string;
  title: string;
  user: User;
  labels?: Label[];
  state?: "open" | "closed";
  assignee?: Assignee;
  body: string;
};

export type Comment = {
  url: string;
  body: string;
  user: User;
};

export type Commit = {
  url: string;
  message: string;
  author: Name;
  committer: Name;
};

export type Pusher = {
  name: string;
  email: string;
};

export type PullRequest = {
  url: string;
  state: "open" | "closed";
  title: string;
  number: string;
  body: string;
};

export type Repository = {
  name: string;
  url: string;
};

type RepositorySender = {
  repository: Repository;
  sender: Sender;
};

export type PullRequestEvent = PullRequest | Repository | Sender;
export type OpenedIssueEvent = Issue | Repository | Sender;

export type EventPayload = {
  "issue_comment.created": Issue | RepositorySender;
  "issue_comment.deleted": Issue | RepositorySender;
  "issue_comment.edited": Issue | RepositorySender;

  "issues.opened": Issue | RepositorySender;
  "issues.edited": Issue | RepositorySender;
  "issues.deleted": Issue | RepositorySender;
  "issues.closed": Issue | RepositorySender;
  "issues.reopened": Issue | RepositorySender;
  "issues.assigned":
    | Issue
    | RepositorySender
    | {
        assignee: Assignee;
      };
  "issues.unassigned":
    | Issue
    | RepositorySender
    | {
        assignee: Assignee;
      };
  "issues.labeled":
    | Issue
    | RepositorySender
    | {
        label: Label;
      };
  "issues.unlabeled":
    | Issue
    | RepositorySender
    | {
        label: Label;
      };
  push: Pusher | RepositorySender;
  ping: RepositorySender;
  "pull_request.opened": PullRequest | RepositorySender;
  "pull_request.edited": PullRequest | RepositorySender;
  "pull_request.closed": PullRequest | RepositorySender;
};

export type EventName = keyof EventPayload;
export type Payload<T extends keyof EventName> = (event: T) => void;
