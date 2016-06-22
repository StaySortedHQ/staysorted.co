$ ->

  lightColor = '#f2f7fe'
  darkColor = '#75aafe'
  count = 5
  $('#countdown').html(count)

  $('.chart').easyPieChart
    barColor: lightColor
    trackColor: darkColor
    scaleLength: 0
    size: 60
    animate:
      duration: 1000
      enabled: true
    onStop: (from, to) ->
      count -= 1
      $('.chart').data('easyPieChart').disableAnimation()

      if count < 0

        window.location.href = "http://staysorted.com"

      else

        $('#countdown').html(count)
        $('.chart').data('easyPieChart').update(0)
        $('.chart').data('easyPieChart').enableAnimation()
        $('.chart').data('easyPieChart').update(100)
