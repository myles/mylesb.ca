imgrAvatar = new Imager('.image-avatar',
                        availableWidths: [64, 128, 256, 320, 448, 512])

$(document).ready ->
  SVGInjector jQuery('.iconic')
  
  jQuery('nav .site-links').navScroll
    mobileDropdown: true,
    mobileBreakpoint: 768,
    navHeight: 0,
    scrollSpy: true
  
  return
