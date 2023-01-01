/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerHubsIn } from '../models/CustomerHubsIn';
import type { CustomerHubsOut } from '../models/CustomerHubsOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HubsService {

    /**
     * Get the current customer hubs
     * @returns CustomerHubsOut Successful Response
     * @throws ApiError
     */
    public static hubsGetCustomerHubs(): CancelablePromise<Array<CustomerHubsOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get_customer_hubs',
        });
    }

    /**
     * Add the current customer hubs
     * @param requestBody 
     * @returns CustomerHubsOut Successful Response
     * @throws ApiError
     */
    public static hubsAddCustomerHubs(
requestBody: CustomerHubsIn,
): CancelablePromise<CustomerHubsOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/add_customer_hubs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
