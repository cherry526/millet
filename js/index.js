$(function () {
    $.ajax({
        url: 'http://localhost:9900/api/nav',

        success: function (data) {
            data = JSON.parse(data);
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                var nav_list = '<li><a href="#" type="' + data[i].type + '">' + data[i].name + '</a></li>'
                $('.telphone').append(nav_list);
            }
        }
    })
    $('.telphone').on('mouseenter', 'a', function () {
        var type = $(this).attr('type');
        if (type != '') {
            // $('.temp ul li').remove();
            $.ajax({
                url: 'http://localhost:9900/api/nav',
                data: {
                    type: $(this).attr('type')
                },
                success: function (data) {
                    data = JSON.parse(data);
                    // console.log(data);
                    var navs = template('navs', data);
                    // console.log(navs);
                    $('.temp ul').html(navs);
                    $('.temp').slideDown(300);
                }
            })
        }
    })
    $('.temp').mouseleave(function () {
        $(this).slideUp(200);
        // console.log($(this));
    })
    $('.sousuo').focus(function () {
        $('.redmi').hide();
        $('.miben').hide();
        $('.import').css({
            "border": "1px solid orangered"
        })
        $('.import').css({
            "border-top": "none"
        })
        $('.sousuo').css({
            "border-right": "1px solid orangered"
        })
        $('.nav-lists').slideDown(400);
    })
    $('.sousuo').blur(function () {
        $('.redmi').show();
        $('.miben').show();
        $('.nav-lists').hide();
        $('.import').css({
            "border": "1px solid #ccc"
        })
        $('.sousuo').css({
            "border-right": "1px solid #ccc"
        })
    })
    $.ajax({
        url: 'http://localhost:9900/api/lunbo',
        success: function (data) {
            data = JSON.parse(data);
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                var lunlist = '<li id="' + data[i].id + '"><img src="' + data[i].imgUrl + '"></li>';
                $('.ul-lunbo').append(lunlist);
            }
        }

    })
    var timerId;
    var flag = true;
    $('.right-lun').click(function () {
        nextImg();
    })
    $('.left-lun').click(function () {
        if (flag) {
            flag = false;
            if (index == 1) {
                index = 5
            } else {
                index--;
            }
            for (var i = 0; i < $('.ul-lunbo li').length; i++) {
                $('.ul-lunbo li').hide();
                $('.ul-lunbo li').eq(index - 1).fadeIn(100);
            }
            setTimeout(function () {
                flag = true;
            }, 500)

        }
    })
    var index = 1;

    function nextImg() {
        if (flag) {
            flag = false;
            if (index == 5) {
                index = 1;
            } else {
                index++;
            }
            for (var i = 0; i < $('.ul-lunbo li').length; i++) {
                $('.ul-lunbo li').hide();
                $('.ul-lunbo li').eq(index - 1).fadeIn(100);
            }
            setTimeout(function () {
                flag = true;
            }, 500)

        }

    }
    timerId = setInterval(nextImg, 3000);
    $('.pro-lunbo').mouseover(function () {
        clearInterval(timerId);
    })
    $('.pro-lunbo').mouseout(function () {
        timerId = setInterval(nextImg, 3000);
    })

    $.ajax({
        url: 'http://localhost:9900/api/items',
        success: function (data) {
            data = JSON.parse(data);
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                var result = '<li><a href="#" type="' + data[i].type + '">' + data[i].content + '</a></li>';
                $('.left-silde').append(result);
            }

        }
    })
    $('.left-silde').on('mouseenter', 'li', function () {
        var type = $(this).find('a').attr('type');

        $('.pro-definite').show(300);
        // console.log(type);
        $.ajax({
            url: 'http://localhost:9900/api/items',
            data: {
                type: $(this).find('a').attr('type')
            },
            success: function (data) {
                data = JSON.parse(data);
                var result = template('product-left', data);
                $('.stuff1').html(result);
                if ($('.stuff1 li').length <= 7) {
                    $('.stuff1').css({
                        'width': '255px'
                    })
                } else if ($('.stuff1 li').length <= 14) {
                    $('.stuff1').css({
                        'width': '510px'
                    })
                } else if ($('.stuff1 li').length <= 21) {
                    $('.stuff1').css({
                        'width': '765px'
                    })
                }

            }
        })
    })
    $('.pro-definite').on('mouseleave', function () {
        $('.pro-definite').hide();
    })
    $.ajax({
        url: 'http://localhost:9900/api/hardware',
        success: function (data) {
            data = JSON.parse(data);
            // console.log(data);
            var toyAll = template('toy', data);
            $('.toylist').append(toyAll);
        }
    })
    $('.match-word ul li').addClass('active');
    $('.match-word ul li').mouseover(function () {
        for (var i = 0; i < $('.match-word ul li').length; i++) {
            $('.match-word ul li').removeClass('active');
        }
        $(this).addClass('active');

    })
    $.ajax({
        url: 'http://localhost:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'match'
        },
        success: function (data) {
            // console.log(data);
            var match_top = template('matchAll-hed', data);
            // console.log($('.match-word ul li'));
            $('#match').append(match_top);
            $('#matchul').on('mouseover', 'li', function () {
                for (var i = 0; i < $('#matchul li').length; i++) {
                    // console.log($('#matchul li').length);
                    $('#matchul li').css({
                        "borderBottom": 0,
                        "color": "#000"
                    });
                    $(this).css({
                        "borderBottom": '2px solid red',
                        "color": 'red'
                    });
                }

            })

        }
    })
    $('#match').on('mouseenter', '#matchul li', function () {
        var Likey = $(this).attr('matchkey');

        // console.log($('#match .match-right ul'));
        $.ajax({
            url: 'http://localhost:9900/api/product',
            data: {
                key: $(this).attr('matchkey')
            },
            dataType: 'json',
            success: function (data) {
                // data = JSON.parse(data);
                console.log(data);
                var right_match = template('tabmatch', data);
                $('#match .match-right').html(right_match);
            }
        })
    })
    // 周边区域
    $.ajax({
        url: 'http://localhost:9900/api/product',
        data: {
            toptitle: 'around'
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var parts = template('Allparts', data);
            $('#parts').append(parts);
            $('#partul').on('mouseover', 'li', function () {
                for (var i = 0; i < $('#partul li').length; i++) {
                    // console.log($('#matchul li').length);
                    $('#partul li').css({
                        "borderBottom": 0,
                        "color": "#000"
                    });
                    $(this).css({
                        "borderBottom": '2px solid red',
                        "color": 'red'
                    });
                }

            })

        }
    })
    $('#parts').on('mouseenter', '#partul li', function () {
        var Likey = $(this).attr('matchkey');

        // console.log($('#match .match-right ul'));
        $.ajax({
            url: 'http://localhost:9900/api/product',
            data: {
                key: $(this).attr('matchkey')
            },
            dataType: 'json',
            success: function (data) {
                // data = JSON.parse(data);
                // console.log(data);
                var right_parts = template('tabparts', data);
                $('#parts .match-right').html(right_parts);
            }
        })
    })
    // 配件区域
    $.ajax({
        url: 'http://localhost:9900/api/product',
        data: {
            toptitle: 'accessories'
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var parts = template('Allnearby', data);
            $('#nearby').append(parts);
            $('#nearbyul').on('mouseover', 'li', function () {
                for (var i = 0; i < $('#nearbyul li').length; i++) {
                    // console.log($('#matchul li').length);
                    $('#nearbyul li').css({
                        "borderBottom": 0,
                        "color": "#000"
                    });
                    $(this).css({
                        "borderBottom": '2px solid red',
                        "color": 'red'
                    });
                }

            })

        }
    })
    $('#nearby').on('mouseenter', '#nearbyul li', function () {
        var Likey = $(this).attr('matchkey');

        // console.log($('#match .match-right ul'));
        $.ajax({
            url: 'http://localhost:9900/api/product',
            data: {
                key: $(this).attr('matchkey')
            },
            dataType: 'json',
            success: function (data) {
                // data = JSON.parse(data);
                // console.log(data);
                var nearby_ri = template('tabnear', data);
                $('#nearby .match-right').html(nearby_ri);
            }
        })
    })
    // 为你推荐区域
    $.ajax({
        url: 'http://localhost:9900/api/recommend',
        data: {
            page: 1
        },
        success: function (data) {
            data = JSON.parse(data);
            // console.log(data);
            var recommend_lunbo = template('recommend_lunbo', data);
            $('.recommend-body .recommend-ul').append(recommend_lunbo);
        }
    })
    var reoindex = 1;
    $('.recom-right').on('click', function () {

        if (reoindex < 4) {
            reoindex++;
            $.ajax({
                url: 'http://localhost:9900/api/recommend',
                data: {
                    page: reoindex
                },
                success: function (data) {
                    data = JSON.parse(data);
                    // console.log(data);
                    var recommend_lunbo = template('recommend_lunbo', data);
                    $('.recommend-body .recommend-ul').append(recommend_lunbo);
                    $('.recommend-body .recommend-ul').css({
                        'transform': 'translateX(-' + 1201 * (reoindex - 1) + 'px)',
                        'transition': 'all .5s'
                    })
                }
            })
        }
    })
    $('.recom-left').on('click', function () {
        console.log(0000);
        if (reoindex >= 1) {
            reoindex--;
            $.ajax({
                url: 'http://localhost:9900/api/recommend',
                data: {
                    page: reoindex
                },
                success: function (data) {
                    data = JSON.parse(data);
                    // console.log(data);
                    var recommend_lunbo = template('recommend_lunbo', data);
                    $('.recommend-body .recommend-ul').append(recommend_lunbo);
                    $('.recommend-body .recommend-ul').css({
                        'transform': 'translateX(' + 1201 * (reoindex - 1) + 'px)',
                        'transition': 'all .5s'
                    })
                }
            })
        }
    })
    $.ajax({
        url: 'http://localhost:9900/api/hotcomment',
        success: function (data) {
            data = JSON.parse(data);
            // console.log(data);
            var hotAll = template('hotAll', data);
            $('#hot ul').append(hotAll);
        }
    })
    // 轮播部分
    $.ajax({
        url: 'http://localhost:9900/api/content',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            var silunbo = template('silunbo', data);
            $('#content ul').html(silunbo);
            for (var i = 0; i < $('#content ul li').length; i++) {
                (function (i) {
                    var currentIndex = 0;
                    //    找到不同的li标签 分别给不同的li标签里的item设置上index
                    for (var j = 0; j < 4; j++) {
                        $('#content ul li').eq(i).find('li').eq(j).attr("dataIndex", j);
                    };
                    // 右键
                    $('#content ul li').eq(i).find('.silde-right').click(function () {
                        console.log(7888);
                        console.log(j);
                        if (currentIndex < 3) {
                            currentIndex++;


                            $('#content ul li').eq(i).find('.bigitems').css({
                                'transform': 'translateX(-' + 286 * (currentIndex) + 'px)',
                                'transition': 'all 1s'
                            })
                            var spanli = $('#content ul li').eq(i).find('.dot li');
                            console.log(spanli);
                            spanli.removeClass('actives');
                            spanli.eq(currentIndex).addClass('actives');
                        }
                    })
                    // 左键
                    $('#content ul li').eq(i).find('.silde-left').click(function () {
                        console.log('啦啦啦');
                        if (currentIndex > 0) {
                            currentIndex--;
                            $('#content ul li').eq(i).find('.bigitems').css({
                                'transform': 'translateX(-' + 286 * (currentIndex) + 'px)',
                                'transition': 'all 1s'
                            })
                            console.log($('#content ul li').eq(i).find('.bigitems'));
                            var spanli = $('#content ul li').eq(i).find('.dot li');
                            console.log(spanli);
                            spanli.removeClass('actives');
                            spanli.eq(currentIndex).addClass('actives');
                        }
                    })
                    // 小圆点
                    $('#content ul li').eq(i).find('.dot li').click(function () {
                        var spanli = $('#content ul li').eq(i).find('.dot li');
                        spanli.removeClass('actives');
                        $(this).addClass('actives');
                        var spanIndex = $(this).attr('dataIndex');
                        $('#content ul li').eq(i).find('.bigitems').css({
                            'transform': 'translateX(-' + 286 * (spanIndex) + 'px)',
                            'transition': 'all 1s'
                        })
                        currentIndex = spanIndex;
                    })

                })(i)

            }

        }
    })

    $.ajax({
        url: 'http://localhost:9900/api/video',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            var videoul = template('videoul', data);
            $('.video-body ul').append(videoul);
        }
    })

})