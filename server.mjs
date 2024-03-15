import express from 'express';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

const app = express(); // Initialize Express app

app.use(express.static('public')); // Serve static files

app.get('/wiktionary/:word', async (req, res) => {
    const word = req.params.word;
    try {
        const response = await fetch(`https://en.wiktionary.org/wiki/${word}`);
        const audioResponse = await fetch(`https://en.wiktionary.org/wiki/File:en-us-${word}.ogg`);

        if (!response.ok) {
            throw new Error('Failed to fetch data from Wiktionary');
        }
        if (!audioResponse.ok) {
            throw new Error('Failed to fetch data from Wiktionary Audio File');
        }
        const html = await response.text();
        const audioHtml = await audioResponse.text();

        console.log('audioHtml:', audioHtml);

        const $ = cheerio.load(html);
        const $audio = cheerio.load(audioHtml);

        const pronunciation = $('span.IPA').first().text().trim();

        const word_type = $('span#Noun').first().text().trim();
        console.log('word_type', word_type);

        const definitions = $('.mw-parser-output > ol > li')
            .map((index, element) => $(element).text().trim())
            .get();

        // Find the audio tag and extract the source URL
        const audioSrc = $audio('a.internal').attr('href');

        console.log('audioHtml:', audioHtml);
        console.log('audioSrc:', audioSrc); // Log audioSrc

        // Send JSON response with spelling and definitions
        res.json({ pronunciation, definitions, audioSrc, word_type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data from Wiktionary' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});