/*jshint -W069 */
/**
 * 
 * @class Subscriptions
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Subscriptions = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Subscriptions(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.godaddy.com';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    /**
     * Retrieve details for the specified Subscription
     * @method
     * @name Subscriptions#get
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID to be operated on, if different from JWT
     * @param {string} xMarketId - Unique identifier of the Market in which the request is happening
     * @param {string} subscriptionId - Unique identifier of the Subscription to retrieve
     * 
     */
    Subscriptions.prototype.get = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/subscriptions/{subscriptionId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['Authorization'] !== undefined) {
            headers['Authorization'] = parameters['Authorization'];
        }

        if (parameters['Authorization'] === undefined) {
            deferred.reject(new Error('Missing required header parameter: Authorization'));
            return deferred.promise;
        }

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
        }

        path = path.replace('{subscriptionId}', parameters['subscriptionId']);

        if (parameters['subscriptionId'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: subscriptionId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Update details for the specified Subscription
     * @method
     * @name Subscriptions#update
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} subscriptionId - Unique identifier of the Subscription to update
     * @param {SubscriptionUpdate} subscription - Details of the Subscription to change
     * 
     */
    Subscriptions.prototype.update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/subscriptions/{subscriptionId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['Authorization'] !== undefined) {
            headers['Authorization'] = parameters['Authorization'];
        }

        if (parameters['Authorization'] === undefined) {
            deferred.reject(new Error('Missing required header parameter: Authorization'));
            return deferred.promise;
        }

        path = path.replace('{subscriptionId}', parameters['subscriptionId']);

        if (parameters['subscriptionId'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: subscriptionId'));
            return deferred.promise;
        }

        if (parameters['subscription'] !== undefined) {
            body = parameters['subscription'];
        }

        if (parameters['subscription'] === undefined) {
            deferred.reject(new Error('Missing required body parameter: subscription'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'PATCH',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Cancel the specified Subscription
     * @method
     * @name Subscriptions#cancel
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID to cancel subscriptions for when not using JWT
     * @param {string} subscriptionId - Unique identifier of the Subscription to cancel
     * 
     */
    Subscriptions.prototype.cancel = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/subscriptions/{subscriptionId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['Authorization'] !== undefined) {
            headers['Authorization'] = parameters['Authorization'];
        }

        if (parameters['Authorization'] === undefined) {
            deferred.reject(new Error('Missing required header parameter: Authorization'));
            return deferred.promise;
        }

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        path = path.replace('{subscriptionId}', parameters['subscriptionId']);

        if (parameters['subscriptionId'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: subscriptionId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'DELETE',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Retrieve a list of Subscriptions for the specified Shopper
     * @method
     * @name Subscriptions#list
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID to return subscriptions for when not using JWT
     * @param {string} xMarketId - The market that the response should be formatted for
     * @param {array} productGroupKeys - Only return Subscriptions with the specified product groups
     * @param {array} includes - Optional details to be included in the response
     * @param {integer} offset - Number of Subscriptions to skip before starting to return paged results (must be a multiple of the limit)
     * @param {integer} limit - Number of Subscriptions to retrieve in this page, starting after offset
     * @param {string} sort - Property name that will be used to sort results. "-" indicates descending
     * 
     */
    Subscriptions.prototype.list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/subscriptions';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['Authorization'] !== undefined) {
            headers['Authorization'] = parameters['Authorization'];
        }

        if (parameters['Authorization'] === undefined) {
            deferred.reject(new Error('Missing required header parameter: Authorization'));
            return deferred.promise;
        }

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
        }

        if (parameters['productGroupKeys'] !== undefined) {
            queryParameters['productGroupKeys'] = parameters['productGroupKeys'];
        }

        if (parameters['includes'] !== undefined) {
            queryParameters['includes'] = parameters['includes'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['sort'] !== undefined) {
            queryParameters['sort'] = parameters['sort'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Retrieve a list of ProductGroups for the specified Shopper
     * @method
     * @name Subscriptions#productGroups
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID to return data for when not using JWT
     * @param {string} xMarketId - The market that the response should be formatted for
     * 
     */
    Subscriptions.prototype.productGroups = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/subscriptions/productGroups';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['Authorization'] !== undefined) {
            headers['Authorization'] = parameters['Authorization'];
        }

        if (parameters['Authorization'] === undefined) {
            deferred.reject(new Error('Missing required header parameter: Authorization'));
            return deferred.promise;
        }

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };

    return Subscriptions;
})();

exports.Subscriptions = Subscriptions;