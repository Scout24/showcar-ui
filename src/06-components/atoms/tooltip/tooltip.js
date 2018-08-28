import registerElement from '../../../07-utilities/helpers.js';

export default function (tagName) {

    function offset(el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + (document.body.scrollTop || document.documentElement.scrollTop),
            left: rect.left + (document.body.scrollLeft || document.documentElement.scrollLeft)
        };
    }

    function attachedCallback() {
        let tt = {
            tooltip: this,
            shown: false,
            indentTop: 8,
            content: this.querySelector('.sc-tooltip-content'),
            timeoutID: 0,
            showEvent: this.getAttribute('show-event'),
            hideEvent: this.getAttribute('hide-event'),
        };

        if (tt.showEvent && tt.hideEvent) {
            document.addEventListener(tt.showEvent, () => show(tt), false);
        } else {
            tt.tooltip.addEventListener('mouseover', () => show(tt), false);
            tt.tooltip.addEventListener('mousedown', () => show(tt), false);
            tt.tooltip.addEventListener('touchstart', () => show(tt), false);
            tt.tooltip.addEventListener('click', () => show(tt), false);
            tt.tooltip.addEventListener('mouseleave', () => hide(tt), false);
        }

        if (tt.hideEvent && tt.showEvent) {
            document.addEventListener(tt.hideEvent, () => hide(tt), false);
        } else {
            tt.content.addEventListener('mouseover', () => show(tt), false);
            tt.content.addEventListener('mousedown', () => show(tt), false);
            tt.content.addEventListener('touchstart', () => show(tt), false);
            tt.content.addEventListener('click', () => show(tt), false);
            tt.content.addEventListener('mouseleave', () => hide(tt), false);

            document.addEventListener('touchstart', () => hide(tt), false);
        }
    }

    function show(tt) {
        clearTimeout(tt.timeoutID);
        if (tt.shown === true) return;
        document.body.appendChild(tt.content);
        tt.content.classList.add('sc-tooltip-shown');
        setTimeout(() => tt.content.classList.add('sc-fade-in'), 20);
        setPosition(tt);
    }

    function hide(tt) {
        tt.timeoutID = setTimeout(() => {
            tt.shown = false;
            tt.content.classList.remove('sc-fade-in');
            tt.timeoutID = setTimeout(() => {
                tt.tooltip.appendChild(tt.content);
                tt.content.classList.remove('sc-tooltip-shown');
                tt.content.style.top = null;
                tt.content.style.left = null;
            }, 350);
        }, 300);
    }

    function setPosition(tt) {
        tt.shown = true;
        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
        tt.content.classList.remove('sc-tooltip-right', 'sc-tooltip-left', 'sc-tooltip-top', 'sc-tooltip-bottom');
        let top = offset(tt.tooltip).top - tt.content.offsetHeight - tt.indentTop;
        if (top - scrollPosition <= 0) {
            top = offset(tt.tooltip).top + tt.tooltip.offsetHeight + tt.indentTop;
            tt.content.classList.add('sc-tooltip-bottom');
        } else {
            tt.content.classList.add('sc-tooltip-top');
        }

        let left = offset(tt.tooltip).left - (tt.content.offsetWidth / 2) + (tt.tooltip.offsetWidth / 2);
        if (left + tt.content.offsetWidth > window.innerWidth) {
            left = offset(tt.tooltip).left - tt.content.offsetWidth + tt.tooltip.offsetWidth + 8; // small gap
            tt.content.classList.add('sc-tooltip-left');
        } else if (left <= 0) {
            left = offset(tt.tooltip).left - (tt.tooltip.offsetWidth/2);
            tt.content.classList.add('sc-tooltip-right');
        }

        tt.content.style.top = Math.round(top) + 'px';
        tt.content.style.left = Math.round(left) + 'px';
    }

    registerElement({
        attachedCallback,
        tagName
    });
}
