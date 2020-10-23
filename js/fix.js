var isonfixed = 0;
var selectedPlatform = 'bitchute';

document.getElementById("selectPlatform").addEventListener('change', () => {

	selectedPlatform = document.getElementById('selectPlatform').value;
	
	if(selectedPlatform == 'bitchute') {
		document.getElementById('fixVideo').style.display = "block";
		document.getElementById('bcExtrasContainer').style.display = "block";
	} else {
		document.getElementById('fixVideo').style.display = "none";
		document.getElementById('bcExtrasContainer').style.display = "none";
	}
	
});

document.getElementById("fixVideo").addEventListener('click', () => {

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        return document.getElementById('player').innerHTML;
    }

    //We have permission to access the activeTab, so we can call browser .tabs.executeScript:
    browser.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
		fixedUrl = searchBuggyVideo(results[0]);
		browser.tabs.update({url:fixedUrl});
    });
	
});

document.getElementById("dlVideo").addEventListener('click', () => {
	
	selectedPlatform = document.getElementById('selectPlatform').value;

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        return document.getElementById('player').innerHTML;
    }
	
	function modifyDOMOdysee() {
        //You can play with your DOM here or check URL against your regex
		return document.getElementById('vjs_video_3_html5_api').src;
    }

	if(selectedPlatform == 'bitchute') {
		//We have permission to access the activeTab, so we can call browser.tabs.executeScript:
		browser.tabs.executeScript({
			code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
		}, (results) => {
			if(results == null) {
				isonfixed = 1;
			}
			if(isonfixed == 0) {
				fixedUrl = searchBuggyVideo(results[0]);
				document.getElementById('download').href = fixedUrl;
				document.getElementById('download').style.display = 'block';
				document.getElementById('download').click();
			} else {
				currentLocation = browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
			}
		});
	} else {
		browser.tabs.executeScript({
			code: '(' + modifyDOMOdysee + ')();' //argument here is a string but function.toString() returns function's code
		}, (results) => {		
			fixedUrl = results[0]+'.mp4';
			document.getElementById('download').href = fixedUrl;
			document.getElementById("download").type = "video/mp4";
			document.getElementById('download').style.display = 'block';
			document.getElementById('download').click();
			
		});
	}
});

// verbose variant
function logTabs(tabs) {
    let tab = tabs[0]; // Safe to assume there will only be one result
	currentLocation = tab.url;
	document.getElementById('download').href = currentLocation;
	document.getElementById('download').style.display = 'block';
	document.getElementById('download').click();
}

function searchBuggyVideo(dom) {
	var regex = /<source.*?src='(.*?)'/;
	if(dom != null) {
		dom = dom.replace(/ +(?= )/g,'');
		dom = dom.replace(/(\r\n|\n|\r)/gm, "");
		dom = dom.replace(/"/g, '\'');
		var videosource = regex.exec(dom)[1];
		splitSrc = videosource.split(/(seed\d\d\d)/);
		returnUrl = videosource.replace(splitSrc[1], "seed126");
		return returnUrl;
	} else {
		isonfixed = 1;
		return true;
	}
}