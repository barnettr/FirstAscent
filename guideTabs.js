(function(jQuery) {
    jQuery.fn.guideTabs = function() {

        jQuery("#tabs").tabs({ fx: { opacity: 'toggle' } });

        // container layer for tabs
        var theatre = jQuery('#theatre').each(function(index){jQuery(this)});
        theatre.each(function(){
            var t = jQuery(this);
            t.css({
                "width" : t.attr("data-width") + "px",
                "height" : t.attr("data-height") + "px",
                "position" : t.attr("data-position"),
                "z-index" : t.attr("data-Z"),
                "padding" : t.attr("data-padding"),
                "margin" : t.attr("data-margin"),
                "background-color" : t.attr("data-background-color"),
                "background-image" : t.attr("data-background-image")
            });
        });

        // sets css for tabController div
        var tabController = jQuery('#tabController').each(function(index){jQuery(this)});
        tabController.each(function(){
            tabController.css({
                "position" : tabController.attr("data-position"),
                "top" : tabController.attr("data-top") + "px",
                "left" : tabController.attr("data-left") + "px",
                "bottom" : tabController.attr("data-bottom") + "px",
                "right" : tabController.attr("data-right") + "px",
                "width" : tabController.attr("data-width") + "px",
                "height" : tabController.attr("data-height") + "px",
                "background-color" : tabController.attr("data-background-color")
            });
        });

        function callAjax(ajaxURL, funcSuccess) {
            jQuery.ajax({
               type: "GET",
                url: ajaxURL,
                data: {},
                dataType: "script",
                success: funcSuccess,
                error: function(){
                    console.log('problem loading ajax');
                }
            });
        }

    callAjax("/assets/ocp/fa/guides/guides.js", getGuides);

    function getGuides(data){
        var number = "";
        //build html for thumbnails
        jQuery.each(guides.guide, function(i, guide) {
            var division = guides.guide[i].division;
            var name = guides.guide[i].firstName +' '+ guides.guide[i].lastName;
            var html = '<li class="guide">';
            html += '<a id='+guides.guide[i].sequence+' class="team_rollover" href="#">';
            html += '<img class="team_images thumbImg" border="0" src=' + guides.guide[i].thumbImg + '>';
            html += name+'</a></li>';

            if(division == "mountain"){
                jQuery("#guides").append(jQuery(html));
            } else if(division == "ski"){
                jQuery("#skiguides").append(jQuery(html));
            } else if(division == "athletesKayak"){
                jQuery("#kayaking_athletes").append(jQuery(html));
            } else if(division == "athletesSnow"){
                jQuery("#snowsports_athletes").append(jQuery(html));
            } else if(division == "athletesClimber"){
                jQuery("#rockclimbing_athletes").append(jQuery(html));
            }
        });

        jQuery("li.guide").hover(function () {
            var e = jQuery(this);
            var imageId = e.find('img');
            var imageSrc = imageId.attr('src');
            imageId.attr('src', imageSrc.replace("_default", "_hover"));
        },
        function () {
            var e = jQuery(this);
            var imageId = e.find('img');
            var imageSrc = imageId.attr('src');
            imageId.attr('src', imageSrc.replace("_hover", "_default"));
        });


        jQuery('a.team_rollover').click(function(event){
            // always load with first tab
        	var tabSelected = jQuery('#tabs').data('tabs').options.selected;
            if(tabSelected != 0){
                 jQuery('#tabs').tabs({ selected: 0 });
            }

            // remove any pre-existing number html
            if(!jQuery("#achievements").html("")){
                jQuery('#achievements').remove(jQuery(html));
            }
            // remove any pre-existing photo html
            if(!jQuery(".thumbs").html("")){
                jQuery('.thumbs').remove(jQuery(html));
            }
           // remove any pre-existing video
            jQuery("#showVideo").html("");
            jQuery("#gallery").css("display", "block");

            number = jQuery(this).attr('id');
             jQuery("#theatre").fadeOut('slow').fadeIn('slow');
            event.preventDefault();
            /* change the location of the theatre on click */
            var theatreID = jQuery(this).closest('ul').attr("id");
            if(theatreID == "guides"){
                jQuery("#theatre").appendTo(jQuery("#guidesTheatre"));
                //jQuery.scrollTo("#guides");
                jQuery(".ach").css("display","block");
            } else if(theatreID == "skiguides"){
                jQuery("#theatre").appendTo(jQuery("#skiguidesTheatre"));
                //jQuery.scrollTo("#ski");
                jQuery(".ach").css("display","block");
            } else if(theatreID == "kayaking_athletes" || theatreID == "snowsports_athletes" || theatreID == "rockclimbing_athletes"){
                jQuery("#theatre").appendTo(jQuery("#athletesTheatre"));
                //jQuery.scrollTo("#athletes");
                jQuery(".ach").css("display","none");
            }
            
            //build html for theatre & intro
            var name = guides.guide[number].firstName+" "+ guides.guide[number].lastName;
            jQuery("#name").html('<img src="'+ guides.guide[number].nameImg+'" alt="'+name+'" />');

            jQuery(".intro p.content").html(guides.guide[number].intro.introTxt);
            var introBkg = "url(" + guides.guide[number].intro.bkgImg + ")";
            jQuery("#tabs-1").css({
            	"background-image": introBkg,
            	"background-repeat": "no-repeat",
            	"width": guides.guide[number].intro.bkgImgWidth + "px",
            	"height": guides.guide[number].intro.bkgImgHeight + "px"
            });
            if (jQuery(this)) {
            	jQuery("<style type='text/css'> .ui-tabs .ui-tabs-panel { border: none 0 transparent !important} </style>").appendTo("div.billboard");
            }
            if (jQuery(this).attr('id') == 13) {
            	jQuery("<style type='text/css'> .ui-tabs .ui-tabs-panel { display: block; width: 996px !important; height:425px !important;} </style>").appendTo("div.billboard");
            }
            jQuery("#tabs-1 .content").css({
                'width': guides.guide[number].intro.introTxtWidth + "px",
                'top': guides.guide[number].intro.introTxtTop + "px"
            });

            //build html for bio tab
            jQuery("#bioTab").css('background', guides.guide[number].bio.bkgColor);
            jQuery("#bioTab p.main").html(guides.guide[number].bio.subTitle);
            jQuery("#bioTab div.text").html(guides.guide[number].bio.bioTxt);
            jQuery("#bioTab .bio-image").html('<img src="'+ guides.guide[number].bio.bioImg+'" />');
            jQuery("#bioTab .content ").css("margin-top", guides.guide[number].intro.introTxtTop + "px");

            //build html for achievements
            if(theatreID == "skiguides" || theatreID == "guides"){
            	jQuery("#achievementsTab").css("background", "url("+guides.guide[number].achievements.bkgImg+")");
            	var achievements =  guides.guide[number].achievements.achievement;

            	for( i=0; i < achievements.length; i++ ){
            		var achnumber = achievements[i].label;
            		// alert(achnumber);
            		var html = '<a href="#" class="num">';
                    	html += achnumber;
                    	html += '</a>';
                    	jQuery('#achievements').append(jQuery(html));
            	}
            }
            // functions for number css & mouseovers
            var num = jQuery('.num').each(function(index){
                jQuery(this).attr("id", "num" + index);
                jQuery(this).css({
                    "font-size": achievements[index].numSize+"px",
                    "opacity" : achievements[index].numAlpha,
                    "top":achievements[index].yPos+'px',
                    "left":achievements[index].xPos+'px'
                });
                jQuery(this).mouseover(function(){
                    jQuery(this).css('opacity','1');
                }).mouseout(function(){
                    jQuery(this).css('opacity',achievements[index].numAlpha);
                });

            // tooltip code
            jQuery(this).qtip({
                content: {
                    text: achievements[index].tipTxt
                },
                hide: { /*event: 'click'*/ },
                position: {
                    my: achievements[index].tipPlacement,
                    at: achievements[index].targetPlacement,
                    viewport: jQuery('#achievementsTab')
                }
            });
        });
                //photos & video tab
        var media =  guides.guide[number].media;
        for( i=0; i < media.length; i++ ){
            var type = media[i].type;
            var thumb = media[i].thumbImg;
            var main = media[i].largeImg;
            var caption = media[i].caption;
            if(type == 'image'){
                var html = '<div class="th">';
                html += '<a style="border: none;" class="thumb" href="'+main+'">';
                html += '<img src="'+thumb+'"';
                html += 'border="0" width="90" height="60" /></a>';
                html += '<div class="caption">';
                html += '<div class="image-title">'+caption+'</div></div>';
                html += '</div>'
                jQuery('.thumbs').append(jQuery(html));
            } else if(type == 'video') {
                var html = '<div class="th">';
                html += '<a class="video thumb" id="'+main+'" href="'+main+'">';
                html += '<img src="'+thumb+'"';
                html += 'border="0" width="90" height="60" /><span class="play"></span></a>';
                html += '</div>'
                jQuery('.thumbs').append(jQuery(html));
            }
    }
        var t = jQuery('a.thumb').each(function(index){jQuery(this);});
        var v = jQuery('.video').each(function(index){jQuery(this);});

        t.each(function(){
            jQuery(this).click(function(e){
                jQuery("#showVideo").html("");
                jQuery("#gallery").css("display","block");
            });
        });

        jQuery(v).click(function(e){
            e.preventDefault();
            jQuery("#showVideo").css("display","block");
            jQuery("#gallery").css("display","none");
            var vidID = jQuery(this).attr('id');

            jQuery("#showVideo").html('<iframe class="youtube-player" type="text/html" width="575" height="380" src="http://www.youtube.com/embed/'+ vidID+'?autohide=1&autoplay=1" frameborder="0">');
        });
// Initially set opacity on thumbs and add
// additional styling for hover effect on thumbs
var onMouseOutOpacity = 0.67;
jQuery('#thumbs div.thumbs div').opacityrollover({
    mouseOutOpacity:   onMouseOutOpacity,
    mouseOverOpacity:  1.0,
    fadeSpeed:         'fast',
    exemptionSelector: '.selected'
});

// Initialize Advanced Galleriffic Gallery
var gallery = jQuery('#thumbs').galleriffic({
    delay:                     2500,
    numThumbs:                 24,
    preloadAhead:              24,
    enableTopPager:            false,
    enableBottomPager:         false,
    maxPagesToShow:            0,
    imageContainerSel:         '#slideshow',
    controlsContainerSel:      '#controls',
    captionContainerSel:       '#caption',
    loadingContainerSel:       '#loading',
    renderSSControls:          true,
    renderNavControls:         true,
    playLinkText:              'Play Slideshow',
    pauseLinkText:             'Pause Slideshow',
    prevLinkText:              '&lsaquo; Previous',
    nextLinkText:              'Next &rsaquo;',
    nextPageLinkText:          'Next &rsaquo;',
    prevPageLinkText:          '&lsaquo; Prev',
    enableHistory:             false,
    autoStart:                 false,
    syncTransitions:           true,
    defaultTransitionDuration: 900,
    onSlideChange:             function(prevIndex, nextIndex) {
        // 'this' refers to the gallery, which is an extension of $('#thumbs')
        this.find('ul.thumbs').children()
            .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
            .eq(nextIndex).fadeTo('fast', 1.0);
    },
    onPageTransitionOut:       function(callback) {
        this.fadeTo('fast', 0.0, callback);
    },
    onPageTransitionIn:        function() {
        this.fadeTo('fast', 1.0);
    }
});
    });
        }

        // alert(jQuery("a.advance-link img").attr("src"))
            jQuery("a.advance-link img").attr('border', '0');

    jQuery('.num').click(function(e){ e.preventDefault(); });

jQuery("#close").click(function(e){
        e.preventDefault();
        jQuery("#theatre").css("display", "none")
    });
    };


})(jQuery);
