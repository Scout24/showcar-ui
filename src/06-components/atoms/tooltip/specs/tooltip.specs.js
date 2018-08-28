module.exports = (frame, assert, browserWidth, helper) => {
    describe('Tooltip', () => {
        let tooltipHover;
        let tooltipEvent;

        beforeEach(() => {
            tooltipHover = frame.get('#tooltip #test-hover-tooltip').toDomElement();
            tooltipEvent = frame.get('#tooltip #test-event-tooltip').toDomElement();
        });

        afterEach(done => {
            helper.reload(frame, done)
        });

        it('Hover tooltip', () => {
            helper.hoverOn(tooltipHover);
            const tooltipContent = frame.get('.sc-tooltip-content.sc-tooltip-shown').toDomElement();

            assert.include(tooltipContent.innerText, 'Information in tooltip', 'contains');
        });

        it('Click tooltip', () => {
            helper.click(tooltipHover);
            const tooltipContent = frame.get('.sc-tooltip-content.sc-tooltip-shown').toDomElement();

            assert.include(tooltipContent.innerText, 'Information in tooltip', 'contains');
        });

        it('Check normal position of tooltip', () => {
            helper.hoverOn(tooltipHover);
            const tooltipContent = frame.get('.sc-tooltip-content.sc-tooltip-shown').toDomElement();

            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-top'), 'position top');
        });

        it('Check top-left position of tooltip', () => {
            tooltipHover.style.position = 'fixed';
            tooltipHover.style.left = 0;
            tooltipHover.style.top = 0;
            helper.hoverOn(tooltipHover);
            const tooltipContent = frame.get('.sc-tooltip-content.sc-tooltip-shown').toDomElement();

            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-bottom'), 'position top');
            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-right'), 'position left');
        });

        it('Check top-right position of tooltip', () => {
            tooltipHover.style.position = 'fixed';
            tooltipHover.style.right = 0;
            tooltipHover.style.top = 0;
            helper.hoverOn(tooltipHover);
            const tooltipContent = frame.get('.sc-tooltip-content.sc-tooltip-shown').toDomElement();

            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-bottom'), 'position top');
            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-left'), 'position right');
        });

        it('Check bottom-left position of tooltip', () => {
            tooltipHover.style.position = 'fixed';
            tooltipHover.style.left = 0;
            tooltipHover.style.bottom = 0;
            helper.hoverOn(tooltipHover);
            const tooltipContent = frame.get('.sc-tooltip-content.sc-tooltip-shown').toDomElement();

            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-top'), 'position bottom');
            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-right'), 'position left');
        });

        it('Check bottom-right position of tooltip', () => {
            tooltipHover.style.position = 'fixed';
            tooltipHover.style.right = 0;
            tooltipHover.style.bottom = 0;
            helper.hoverOn(tooltipHover);
            const tooltipContent = frame.get('.sc-tooltip-content.sc-tooltip-shown').toDomElement();

            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-top'), 'position bottom');
            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-left'), 'position right');
        });

        it('Check event based tooltip', () => {
            tooltipEvent.style.position = 'fixed';
            tooltipEvent.style.right = 0;
            tooltipEvent.style.bottom = 0;
            document.dispatchEvent(new CustomEvent("show-tooltip-event"));
            const tooltipContent = frame.get('.sc-tooltip-content.sc-tooltip-shown').toDomElement();

            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-top'), 'position bottom');
            assert.isTrue(helper.hasClass(tooltipContent, 'sc-tooltip-left'), 'position right');

            document.dispatchEvent(new CustomEvent("hide-tooltip-event"));

            assert.isFalse(helper.hasClass(tooltipContent, 'sc-tooltip-top'), 'position bottom');
            assert.isFalse(helper.hasClass(tooltipContent, 'sc-tooltip-left'), 'position right');
        });

    });
};
