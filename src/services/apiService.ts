import { getToken, verifyToken } from "./auth";

const serverUrl = 'http://localhost:3000/';

export const handleRequest =
async function (endPoint: string, data: object): Promise<Response> {
        return fetch(`${serverUrl}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getToken(),

            },
            body: JSON.stringify(data)
        });
    }

    export const authRequest =
async function (endPoint: string, data: object): Promise<Response> {
        return fetch(`${serverUrl}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    
export const patchRequest =
    function (endPoint: string, data: object): Promise<Response> {

        return fetch(`${serverUrl}${endPoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getToken(),
            },
            body: JSON.stringify(data)
        });
    }

export const getRequest =
    function (endPoint: string): Promise<Response> | null {
        if (!verifyToken()) {
            return null;
        }

        return fetch(`${serverUrl}${endPoint}`, {
            method: 'GET',
            headers: {
                'x-auth-token': getToken()
            }
                })
    }

    
export const deleteRequest =
function (endPoint: string, id: string, service:string): Promise<Response> {

    return fetch(`${serverUrl}${endPoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken(),
        },
        body: JSON.stringify({ userServiceID: id, servicName: service })
    });
}