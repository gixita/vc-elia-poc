$(document).ready(function(){
	
    var popup = {
        popupwrap: $('.notificationpopup'),
        popupcontent: $('.notification-content'),
        popupCloseBtn: $('.notificationclose, #notificationAgree'),
        showHideContentBtn: $('#jsShowHide'),
        popupIdVal: $('input#notificationscid').val(),

        setPopupCookie: function (){
            var baseName = 'notificationpopup';
            var cookieName = baseName + '-' + popup.popupIdVal;
            document.cookie = cookieName + "=" + cookieName + ";" + "path=/";
        },
        getPopupCookie: function(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        },
        openPopup: function() {
            var baseName = 'notificationpopup';
            var cookieName = baseName + '-' + popup.popupIdVal;
            var popupCookie = popup.getPopupCookie(cookieName);
            if (popupCookie == '') {
                popup.popupwrap.removeClass('hidden');
                $('body').addClass('notificationpopup-open');
            }
        },
        openPopupVCJS: function() {
            if (popupCookie == '') {
                popup.popupwrap.removeClass('hidden');
                $('body').addClass('notificationpopup-open');
            }
        },
        closePopup: function() {
            var popupCookie = popup.getPopupCookie("popupShowed");
            popup.popupwrap.addClass('hidden');
            $('body').removeClass('notificationpopup-open');
            popup.setPopupCookie();
        },
        showHideContent: function () {
            $('.notification-content-extended').toggleClass('hidden');
        }
    }

    if(popup.popupwrap.length) {
        popup.openPopup();
    }

    popup.popupCloseBtn.click(function(e) {
        e.preventDefault();
        popup.closePopup();
    });

    popup.showHideContentBtn.click(function(e) {
        e.preventDefault();
        $(this).find('.jsToggleText').toggleClass('hidden');
        popup.showHideContent();
    });

});
