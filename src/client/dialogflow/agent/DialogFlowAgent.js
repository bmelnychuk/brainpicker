// @flow

import DialogFlowRequest from './DialogFlowRequest';
import DialogFlowResponse from './DialogFlowResponse';
import type { RequestHandler } from '../intent/RequestHandler';

export default class DialogFlowAgent {
    handlers: RequestHandler[];

    constructor() {
        this.handlers = [];
    }

    addRequestHandler(requestHandler: RequestHandler) {
        this.handlers.push(requestHandler);
    }

    handleRequest(request: DialogFlowRequest): Promise<DialogFlowResponse> {
        for (const handler of this.handlers) {
            if (handler.canHandle(request)) {
                return handler.handle(request);
            }
        }
        throw new Error(`Intent '${request.getIntent()}' is not supported`);
    }
}
