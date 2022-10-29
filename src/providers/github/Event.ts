import { WebhookEvent as Payload } from "@octokit/webhooks-types"

import { Issue, EventPayload, Repository } from "../../types/Payload";

export class Event {
    private static instance: Event;

    private readonly _event: string;

    private readonly _issue?: Issue;
    private readonly _repository?: Repository;

    private constructor(event: string, payload: Payload) {
        this._event = event

        if ("issue" in payload && payload.issue !== undefined) {
            this._issue = {
                html_url: payload.issue.html_url,
                number: payload.issue.number,
                title: payload.issue.title,
                user: {
                    name: payload.issue.user.login
                },
                assignee: {
                    name: payload.issue.assignee?.name ?? "<i>Not Assignee</i>"
                }
            }
        }

        if ("repository" in payload && payload.repository !== undefined) {
            this._repository = {
                full_name: payload.repository.full_name,
                html_url: payload.repository.html_url
            }
        }
    }

    public static parse(event: string, payload: Payload): Event {
        if (! Event.instance) {
            this.instance = new Event(event, payload);
        }

        return Event.instance
    }

    public payload() {
        if (this._event === 'issues') {
            return { ...this._issue, ...this._repository } as EventPayload['issue.opened']
        }

        throw new Error(`Unhandle event. Event name: ${this._event}`)
    }

}