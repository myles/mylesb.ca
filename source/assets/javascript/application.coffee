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

imgrBackground = new Imager('.background',
                            availableWidths: {
                              75: 'square-75',
                              150: 'square-150',
                              240: 'small-240',
                              320: 'small-320',
                              500: 'medium-500',
                              640: 'medium-640',
                              800: 'medium-800',
                              1024: 'large-1024'
                            })

$(document).ready ->
  jQuery.mark.jump()
  SVGInjector jQuery('.iconic')
  return
