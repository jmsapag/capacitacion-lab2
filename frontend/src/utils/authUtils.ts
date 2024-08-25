
// Function to get the auth headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('auth');

    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    } else {
        throw new Error('No token found');
    }
};
