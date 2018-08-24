// @flow

export default class DialogFlowRequest {
    requestBody: any;

    constructor(requestBody: any) {
        this.requestBody = requestBody;
    }

    getSessionId(): string {
        const { session } = this.requestBody;
        const sessionData = session.split('/');
        return sessionData[sessionData.length - 1];
    }

    getProjectId(): string {
        const { session } = this.requestBody;
        const sessionData = session.split('/');
        return sessionData[1];
    }

    getIntent(): string {
        return this.requestBody.queryResult.intent.displayName;
    }

    getParam(key: string): string {
        return this.requestBody.queryResult.parameters[key];
    }
}
