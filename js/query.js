document.getElementById("search").addEventListener('click', () => {
	myquery = document.getElementById('myquery').value;
	searchEngine = document.getElementById("selectSearchEngine").value;
	switch(searchEngine) {
		case 'google':
			window.open('https://google.com/search?q='+myquery+'%20site:bitchute.com');
			break;
		case 'bing':
			window.open('https://www.bing.com/search?q='+myquery+'%20site:bitchute.com');
			break;
		case 'qwant':
			window.open('https://www.qwant.com/?q='+myquery+'%20site:bitchute.com');
			break;
		case 'yandex':
			window.open('https://yandex.com/search/?text='+myquery+'%20site:bitchute.com');
			break;
		default:
			window.open('https://duckduckgo.com/?q='+myquery+'%20site:bitchute.com');
	}
});