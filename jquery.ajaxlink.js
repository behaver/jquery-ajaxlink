$.fn.ajaxlinkList = function () {
    var target = $(this).attr('data-target');
    /* 绑定ajax链接点击事件 */
    $(this).on('click', '.ajaxlink', { target: target }, function (event) {
        event.preventDefault();

        this.target = event.data.target;

        // 清空目标区域内容
        $(this.target).html('');

        // 添加触发样式
        $(this).parents('.ajaxlink-list').find('.ajaxlink').removeClass('active');
        $(this).addClass('active');

        // 点击请求后事务处理
        var a = function (data, textStatus, jqXHR) {
            // 绑定新请求到的内容中的ajax链接
            $(this.target).find('.ajaxlink-list').ajaxlinkList();
        };
        var url = $(this).attr('href');
        if (url) $(this.target).load(url, a.bind(this));
    });

    /* 默认链接展示 */
    var defaultlink =  $(this).attr('data-default');
    if (defaultlink) {
        $(this).find(defaultlink).trigger('click');
    } else {
        $(this).find('.ajaxlink.default').trigger('click');
    }
};
jQuery(document).ready(function($) {
    $('.ajaxlink-list').ajaxlinkList();
});