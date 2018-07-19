/*
- input area
- sanitize the data (delete english chars, emojis, etc)
- hit yabla endpoint and then parse the html for words, pinyin, and definitions
- redisplay to the front end choose which ones to add
- add to database
- user authentication
- profile page, translate page, your words page, friends page
- can translate without authentication, but can't save
- can share your list with friends
- filter words by usage/count, date added, flag
- flag words by how well you know them? and by complexity?
- can delete words
- can update words (custom definition)
- can add example sentences
- feed into memorization game??
- add voice notes?
- voice processing?? speak --> text --> yabla

- react, postgres or mongo...?, express
*/

const request = require('request'),
	cheerio = require('cheerio');

const sanitize = str => {
	// sanitize english letters, emojis, etc
}

// auth things

// database things

// paths

const yablaRequest = str => {
	url = 'https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=' + encodeURIComponent(str);
	console.log(str);
	return new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			if (!err && res.statusCode == 200) {
				const $ = cheerio.load(body);

				const wordElements = $('.new_word');

				const words = $(wordElements).map((i, el) => ({
					word: $(el).find('.word').text(),
					pinyin: $(el).find('.pinyin').text(),
					meaning: $(el).find('.meaning').text()
				})).get();

				resolve(words);
			} else {
				reject(err); 
			}
		});
	});
}

const p1 = yablaRequest('前面有个好帅的小哥哥。我们去撩一下。');
const p2 = yablaRequest('在吗？');
const p3 = yablaRequest('她睡着了。');

Promise.all([p1, p2, p3])
	.then(resp => console.log(resp))
	.catch(err => console.log(err));

