$.fn.pvideo = function (op) {
    var cid = this[0].id;
    function playVideo(opt) {
        if (typeof (opt) == "undefined") {
            return;
        }
        if (typeof (opt.src) == "undefined") {//alert("请指定要播放视频的路径！");
            return;
        }
        var defaults = {
            src: "",
            width: '100%',
            height: '100%',
            autoplay: '', //autoplay
            poster: '',
            preload: 'preload',
            loop: 'false', //loop
            timeupdate: null,
            ended: null,
            pause: null,
            play: null,
            durationchange: null
        };
        var setting = $.extend(defaults, opt);
        var _this = this;
        _this.elemt = $('#' + cid);
        this.loadnew = function (newsrc,isplay) {
            if (newsrc) {
                $('#source' + cid)[0].src = newsrc;
                $('#video' + cid)[0].load();
                if(isplay)
                    $('#video' + cid)[0].play();
            }
        }
        function inithtml() {
            var str = "<video id='video" + cid + "' controls "; //根据设置的属性的值，拼写video控件
            str += " width='" + setting.width + "' height='" + setting.height + "' " + setting.autoplay + " " + setting.preload + " " + setting.loop + " ";
            if (typeof (setting.poster) != "undefined") {
                str += " poster='" + setting.poster + "' >";
            } else {
                str += " > ";
            }
            str += " <source id='source" + cid + "' src='" + setting.src + "' />";
            str += "</video>";
            _this.elemt.html(str);
            _this.media = $('#video' + cid)[0];
        }
        inithtml();
        function initevent() {
            var mediaElement = $('#video' + cid)[0];
            mediaElement.addEventListener("timeupdate", function () {
                if (setting.timeupdate) {
                    setting.timeupdate.apply(this, arguments);
                }
            }, false);
            mediaElement.addEventListener("durationchange", function () {
                if (setting.durationchange) {
                    setting.durationchange.apply(this, arguments);
                }
            }, false);
            mediaElement.addEventListener("play", function () {
                if (setting.play) {
                    setting.play.apply(this, arguments);
                }
            }, false);
            mediaElement.addEventListener("ended", function () {
                if (setting.ended) {
                    setting.ended.apply(this, arguments);
                }
            }, false);
            mediaElement.addEventListener("pause", function () {
                if (setting.pause) {
                    setting.pause.apply(this, arguments);
                }
            }, false);
        }
        initevent();
    }
    var np = new playVideo(op);
    $(this).data('playVideo', np);
};