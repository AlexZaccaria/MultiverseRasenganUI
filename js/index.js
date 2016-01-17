$(function()
{
    $('.bgcontain').each(function(k1, v1) 
    {
        var txt = $(v1).attr('alt');
        $(v1).hover
        (
            function() 
            { $('.radarbg').eq(0).addClass('radarbgact').html(txt); }, 
            function()
            { $('.radarbg').eq(0).removeClass('radarbgact').html(''); }
        );
    });

    $('.th').each(function(k1, v1)
    {
        $(v1).click(function(event)
        {
            event.preventDefault();
            
            $("#Loading").slideDown();
            $('#theme').remove();
            
            var col = ($(this).html().toLowerCase()); 
            $('body').append('<link id="theme" rel="stylesheet" href="/temi/'+col+'">');
            
            var res = $('.mybg').css('background-image').split('/').pop().split('.')[0];
            $('<img src="/images/'+col+'/'+res+'.jpg">').load(function(){ $("#Loading").slideUp(); });
        });
    });

    $(".myform").mCustomScrollbar({scrollButtons:{ enable: true }});
    $(".textdiv").mCustomScrollbar({scrollButtons:{ enable: true }});
    $("#Loading").slideUp();
    
    $("#blink").click(function(event)
    {
        event.preventDefault();
        $('.butt6hover').toggleClass('butt6hover').addClass('butt6blink');
    });
});