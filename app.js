const request = require('request'),
	cheerio = require('cheerio');

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

