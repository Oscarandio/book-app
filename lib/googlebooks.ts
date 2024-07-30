const searchBooks = async (query) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=YOUR_API_KEY`);
    const data = await response.json();
    return data.items;
};
