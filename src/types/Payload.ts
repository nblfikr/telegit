type Name = { name: string }

export type Assignee = Name;
export type Sender = Name;
export type User = Name;

export type Label = Name | {
    color: string;
};

export type Issue = {
    html_url: string;
    number: number;
    title: string;
    user: User;
    labels?: Label[];
    state?: "open" | "closed";
    assignee?: Assignee;
}

export type Comment = {
    html_url: string;
    body: string;
    user: User;
}

export type PullRequest = {
    html_url: string;
    state: "Open" | "Close";
}

export type Repository = {
    full_name: string;
    html_url: string;
}

// EVENT 
export type PullRequestEvent = PullRequest | Repository | Sender;
export type OpenedIssueEvent = Issue | Repository | Sender;



export type EventPayload = {
    "issue.opened": Issue & Repository & Sender;
}