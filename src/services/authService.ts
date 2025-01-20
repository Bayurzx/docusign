const baseUrl = process.env.BACKEND_API_URL || 'http://localhost:3001/api';

/**
 * Generic fetch function to handle API requests.
 * @param endpoint - The endpoint URL (relative to the base URL)
 * @param method - The HTTP method (e.g., 'GET', 'POST')
 */
const fetchData = async (endpoint: string, method: 'GET' | 'POST') => {
    const url = `${baseUrl}${endpoint}`;
    try {
        const response = await fetch(url, {
            method,
            credentials: 'include', // Include cookies/session
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error during ${method} request to ${url}:`, error);
        throw error;
    }
};

/**
 * Authenticate the user with the backend.
 */
export const authenticate = async () => {
    return fetchData('/docusign/auth', 'GET');
};

/**
 * Check the status of the user's authentication/session.
 */
export const checkStatus = async () => {
    return fetchData('/docusign/status', 'GET');
};

/**
 * Logout the user from the backend.
 */
export const logout = async () => {
    return fetchData('/docusign/logout', 'GET');
};

