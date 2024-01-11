import axios, { AxiosResponse } from 'axios';
import https from 'https';

async function fetchData() {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false, // Ignore SSL certificate verification (use cautiously)
        });
        // Make a GET request to a sample API endpoint
        const response: AxiosResponse = await axios.get('https://epg.rysgalbank.tm/epg/rest?orderNumber=C8gLhISgs7YdKrrQCIoHR&amount=100&currency=934&returnUrl=http://0.0.0.0:8445/api/auth/testing', { httpsAgent: agent });

        // Access the data from the response
        const data = response.data;

        // Log the data
        console.log('Data:', data);
    } catch (error: any) {
        // Handle errors
        console.error('Error:', error.message);
    }
}

// Call the function to fetch data
fetchData();
