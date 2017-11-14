export default () => {
    window.addEventListener('DOMContentLoaded', function() {
        const $target = $('as24-icon[title]');
        if (! $target.length) return;
        const $tooltip = $('<div class="sc-font-s tooltip tooltip-top tooltip-hidden"></div>');
        $tooltip.appendTo($(document.body));

        var allTooltipClasses = 'tooltip-top tooltip-r tooltip-b tooltip-l tooltip-hidden';

        var hideTooltip = function () {
            $tooltip.addClass('tooltip-hidden');
        };

        let timer = null;

        $target.on('mousedown mouseover', function () {
            const $this = $(this);
            if (! $this.data('title')) return;

            if (! $tooltip.hasClass('tooltip-hidden')) {
                hideTooltip();
                return;
            }

            timer = setTimeout(function () {

                $tooltip.removeAttr('style')
                    .html($this.data('title') + '<span class="tooltip-arrow"></span>')
                    .removeClass(allTooltipClasses);

                const distance = { vertical: 6, horizontal: 8 };

                const width = $tooltip.width();
                const height = $tooltip.height();
                const pos = $this.offset();
                let top = pos.top - height - distance.vertical;
                let left = pos.left - (width / 2) + ($this.width() / 2);

                const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

                if (top - scrollPosition <= 0) {
                    top = pos.top + $this.height() + distance.vertical;
                    $tooltip.removeClass('tooltip-top').addClass('tooltip-bottom');
                } else {
                    $tooltip.removeClass('tooltip-bottom').addClass('tooltip-top');
                }

                $tooltip.removeClass('tooltip-right tooltip-left');

                if (left + width > $(window).width()) {
                    left = pos.left - width + $this.width() + distance.horizontal;
                    $tooltip.removeClass('tooltip-right').addClass('tooltip-left');
                } else if (left <= 0) {
                    left = pos.left - distance.horizontal;
                    $tooltip.removeClass('tooltip-left').addClass('tooltip-right');
                }

                $tooltip.css({ top: top, left: left });

            }, 300);

        });

        $target.on('mouseleave', function () {
            clearTimeout(timer);
            timer = setTimeout(hideTooltip, 300);
        });

        $target.each(function(index, element) {
            var $element = $(element);
            $element.data('title', $element.attr('title')).removeAttr('title');
        });

        $tooltip.on('mouseenter', function () {
            clearTimeout(timer);
        });

        $tooltip.on('mouseleave', function () {
            clearTimeout(timer);
            timer = setTimeout(hideTooltip, 300);
        });

        $(window).on('resize', function () {
            clearTimeout(timer);
            hideTooltip();
        });
    });
};
