let url = 'http://127.0.0.1:8000/admin/'

if (process.env.NODE_ENV === 'production') {
    url = 'https://books.otzarhasefer.com/api/admin/'
}

export const API_URL = url
