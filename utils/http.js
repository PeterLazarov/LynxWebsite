import apiRoutes from '../config/api-routes';

export default {
    async request(url, options) {
        const verb = (options && options.verb) ? options.verb : 'GET';
        const body = (options && options.body) ? options.body : null;

        console.log(`fetching ${url} via ${verb}`);
        if (body) {
            console.log(body);
        }

        let response = {};
        try {
            response = await fetch(`${apiRoutes.ADDRESS}${url}`, {
                method: verb,
                protocol: 'http',
                headers: new Headers({
                    'content-type': 'application/json',
                    'cache-control': 'no-cache'
                }),
                body: body ? JSON.stringify(body) : null
            });
        } catch (error) {
            console.log(error);
        }

        let json = {};
        try {
            json = await response.json();
        } catch (error) {
            console.log(error);
        }
        
        return {
            isNotValid: response.status === 400,
            isNotFound: response.status === 404,
            isError: response.status === 500,
            isForbidden: response.status === 403,
            isOkay: response.status === 200,
            status: response.status,
            data: json
        };
    }
}