; (function ($) {
    $.fn.extend({
        covering: function (option, param) {
            console.log(this);
            var $this = this;
            if (typeof option == 'string') {
                switch (option) {
                    case 'hide':
                        return this.each(function () {
                            var id = $this.attr("id");
                            var coveringId = id + "covering";
                            $("#" + coveringId).hide().detach();
                            if ($("#" + id).css("display") == "none") {
                                $("#" + id).show();
                            }
                        });
                    case 'setCoveringText':
                        return this.each(function () {
                            var id = $this.attr("id");
                            var coveringId = id + "covering";
                            $("#" + coveringId+ " span").html(param);
                        });
                }
            }

            $.fn.covering.defaults = {
                coveringText: "covering",
                coveringHide: false,
                opacity: 0.6,
                bgColor: "black",
                fontColor: "#fff",
                onLoadSuccess:null

            }

            var top = $this.offset().top;
            var left = $this.offset().left;
            var height = $this.height();
            var width = $this.width();

            //合并参数
            option = $.extend($.fn.covering.defaults, option);
            var id = $this.attr("id");
            var coveringId = id + "covering";
            var divHtml = "<div  id='" + coveringId
                + "' style='background-color:" + option.bgColor
                + ";opacity:" + option.opacity
                + ";display:none;text-align:center;position:absolute;color:" + option.fontColor
                + ";' data-isHide='false'><span id='" + coveringId
                + "span'>" + option.coveringText + "</span></div>";

            if ($("#" + coveringId).length > 0) {
                var isHide = $("#" + coveringId).attr("data-isHide");
                if (isHide) {   //如果是显示的话
                    return this;
                } else {
                    $("#" + coveringId).remove();
                }
            }
            //将coveringdiv插入页面中
            $this.before(divHtml);

            //计算居中的padding值
            var coveringHeight = $("#" + coveringId).height();
            var paddingTop = height / 2 - coveringHeight;

            //判断原来的div是不是要隐藏
            if (option.coveringHide) {
                $this.hide();
            }
            $("#" + coveringId).offset(function (n, c) {
                newPos = new Object();
                newPos.left = left;
                newPos.top = top;
                return newPos;
            }).height(height - paddingTop).width(width).show();

            //居中
            $("#" + coveringId).css("padding-top", paddingTop + "px");

            //调用回调函数
            if (option.onLoadSuccess != null) {
                try{
                    option.onLoadSuccess("这是回调函数执行");
                }
                catch (e){
                    //传进来不是个函数不报错
                    console.log(e);
                }
            }
        }
    });
})(jQuery);