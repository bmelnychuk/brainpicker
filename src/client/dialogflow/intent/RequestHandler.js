/* @flow */

import DialogFlowRequest from '../agent/DialogFlowRequest';
import DialogFlowResponse from '../agent/DialogFlowResponse';

export interface RequestHandler {
    canHandle(request: DialogFlowRequest): boolean;
    handle(request: DialogFlowRequest): Promise<DialogFlowResponse>;
}
