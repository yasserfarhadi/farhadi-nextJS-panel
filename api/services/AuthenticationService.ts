/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_Authentication_login } from '../models/Body_Authentication_login';
import type { TokenSchema } from '../models/TokenSchema';
import type { UserInfo } from '../models/UserInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticationService {

    /**
     * Create access and refresh tokens for all users
     * @param formData 
     * @returns TokenSchema Successful Response
     * @throws ApiError
     */
    public static authenticationLogin(
formData: Body_Authentication_login,
): CancelablePromise<TokenSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get details of currently logged in user
     * @returns UserInfo Successful Response
     * @throws ApiError
     */
    public static authenticationGetMe(): CancelablePromise<UserInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
        });
    }

}
