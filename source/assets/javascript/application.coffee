do (jQuery) ->
	jQuery.mark = jump: (options) ->
		defaults = selector: 'a.scoll-on-page-link'
		if typeof options == 'string'
			defaults.selector = options
		options = jQuery.extend(defaults, options)
		jQuery(options.selector).click (e) ->
			jumpobj = jQuery(this)
			target = jumpobj.attr('href')
			thespeed = 1000
			offset = jQuery(target).offset().top
			jQuery('html,body').animate { scrollTop: offset }, thespeed, 'swing'
			window.location.href = target
			document.title = jumpobj.attr('title')
			e.preventDefault()
			return
	return

imgrAvatar = new Imager('.image-avatar',
												availableWidths: [64, 128, 256, 320, 448, 512])

imgrBackground = new Imager('.image-background')


$(document).ready ->
	jQuery.mark.jump()
	SVGInjector jQuery('.iconic')
	return
