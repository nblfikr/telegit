export const IssueClosed = `<b>CLOSED ISSUE</b>\n\n Issue <b><a href="{{repository.url}}">{{repository.name}}</a></b>\n#{{number}} {{title}} has been closed by <b>{{sender.name}}</b>`;
export const IssueOpened = `<b>[NEW-ISSUE]</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b>\n#{{number}} {{title}} by <b>{{user.name}}</b>\n\n{{body}}`;
export const IssueReopened = `<b>REOPENED ISSUE</b>\n\nReopened issue <a href="{{url}}"><b>#{{number}} {{title}}</b></a> on <a href="{{repository.url}}">{{repository.name}}</a>`;
export const IssueDeleted = `<b>[ISSUE-DELETED]</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b>\n#{{number}} {{title}} has been deleted by <b>{{sender.name}}</b>`;
export const IssueEdited = `<b>[ISSUE-EDITED]</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b>\n#{{number}} {{title}} was edited by <b>{{sender.name}}</b>\n\n{{body}}`;

export const IssueAssigned = `<b>[ISSUE-Assigned]</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b>\n#{{number}} {{title}} was edited by <b>{{sender.name}}</b>\n\n{{body}}`;
export const IssueUnassigned = `<b>[ISSUE-Unassigned]</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b>\n#{{number}} {{title}} was edited by <b>{{sender.name}}</b>\n\n{{body}}`;
export const IssueLabeled = `<b>[ISSUE-Labeled]</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b>\n#{{number}} {{title}} was edited by <b>{{sender.name}}</b>\n\n{{body}}`;
export const IssueUnlabeled = `<b>[ISSUE-Unlabeled]</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b>\n#{{number}} {{title}} was edited by <b>{{sender.name}}</b>\n\n{{body}}`;

export const Ping = `<b>[TELEGIT]</b>\n\n🥳 Yayyy... Your webhook on <b><a href="{{repository.url}}">{{repository.name}}</a></b> successfully connected.\n\n<i>Now, you can try to create some event like push, pull_request, etc.</i>`;
export const Push = `<b>[PUSH]</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b> by <b>{{name}}</b>\n\n<a href="{{commits.url}}">{{commits.message}} by {{commits.committer.name}}</a>`;

export const PRClosed = `<b>PR Closed</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b> by <b>{{name}}</b>\n#{{number}} {{title}}\n\n<i>{{body}}</i>\n\n<a href="{{url}}">Lihat</a>`;
export const PREdited = `<b>PR Edited</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b> by <b>{{name}}</b>\n#{{number}} {{title}}\n\n<i>{{body}}</i>\n\n<a href="{{url}}">Lihat</a>`;
export const PROpened = `<b>PR Opened</b> on <b><a href="{{repository.url}}">{{repository.name}}</a></b> by <b>{{name}}</b>\n#{{number}} {{title}}\n\n<i>{{body}}</i>\n\n<a href="{{url}}">Lihat</a>`;
