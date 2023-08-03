const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeEmailsFromWebsite(url) {
  try {
    // Make a GET request to the website
    const response = await axios.get(url);

    // Load the HTML content using Cheerio
    const $ = cheerio.load(response.data);

    // Find all anchor tags
    const anchorTags = $('a');

    // Array to store the email addresses
    const emails = [];

    // Iterate over each anchor tag
    anchorTags.each((index, element) => {
      // Get the href attribute value
      const href = $(element).attr('href');

      // Check if the href value contains 'mailto:'
      if (href && href.includes('mailto:')) {
        // Extract the email address from the href value
        const email = href.replace('mailto:', '');

        // Add the email address to the array
        emails.push(email);
      }
    });

    // Return the array of email addresses
    return emails;
  } catch (error) {
    // Log the error
    console.error('Error:', error.message);
    return [];
  }
}
