(function(){

	if(chrome.storage){
		chrome.storage.sync.get(['hideUserName', 'warnOnLosingPost'], function(items){
			if(items.hideUserName){
				let userName = document.querySelector('.header-avatar .username');
				if (userName)
					userName.innerText = 'הא?';
				let avatar = document.querySelector('.header-avatar .avatar');
				if (avatar)
					avatar.style.display = "none";
			}

			if(items.warnOnLosingPost){
				var form = document.querySelector('form[id="qr_postform"]') || document.querySelector('form[id="postform"]');

				if(form){
					// all action buttons are type=submit
					form.addEventListener('submit', function(){
						window.removeEventListener('beforeunload', avoidLosingPost);
					});

					window.addEventListener('beforeunload', avoidLosingPost);
				}
			}
		});
	}

	function avoidLosingPost(event){
		var textarea = document.querySelector('textarea[name=message]');

		if(textarea && textarea.value){
			event.preventDefault();
			return event.returnValue = 'Changes you made may not be saved. Are you sure you want to lose you post?';
		}
	}
}())
