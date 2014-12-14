if device.desktop()

else if device.mobile()

	$ = document # shortcut
	cssId = 'myCss' # you could encode the css path itself to generate id..
	if !$.getElementById(cssId)
	    head  = $.getElementsByTagName('head')[0]
	    link  = $.createElement('link')
	    link.id   = cssId
	    link.rel  = 'stylesheet'
	    link.type = 'text/css'
	    link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css'
	    link.media = 'all'
	    head.appendChild(link)

$(document).ready ->
  $(".header").scrollToFixed
    preFixed: ->
      $(this).find("h1").css "color", "blue"
      return

    postFixed: ->
      $(this).find("h1").css "color", ""
      return

  $("#summary").scrollToFixed
    marginTop: $(".header").outerHeight() + 10
    limit: $(".footer").offset().top - $("#summary").outerHeight() - 10
    zIndex: 999
    preFixed: ->
      $(this).find(".title").css "color", "blue"
      return

    preAbsolute: ->
      $(this).find(".title").css "color", "red"
      return

    postFixed: ->
      $(this).find(".title").css "color", ""
      return

    postAbsolute: ->
      $(this).find(".title").css "color", ""
      return

  $(".footer").scrollToFixed
    bottom: 0
    limit: $(".footer").offset().top
    preFixed: ->
      $(this).find("h1").css "color", "blue"
      return

    postFixed: ->
      $(this).find("h1").css "color", ""
      return

  return
