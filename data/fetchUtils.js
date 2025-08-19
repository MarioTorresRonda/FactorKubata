export const lolApi = `/api/LoL`;

export async function apiCall( url, signal ) {
    const response = await fetch( url, signal);
    
    if ( !response.ok ) {
        let error = new Error('Failed server call');; 

        try {
            const resData = await response.json();
            console.log( resData );
            if ( resData.message ) {
                error = new Error( resData.message );
            }
        } catch (error) { }

        throw error;
    }

    return await response.json();
}