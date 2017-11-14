module.exports = (frame, assert, browserWidth, helper) => {
    describe('Linked catalog', () => {
        let container;
        let labels;
        let links;

        beforeEach(() => {
            container = frame.get('#linked-catalog .sc-linked-catalog');
            labels = frame.getAll('#linked-catalog .sc-linked-catalog__label');
            links = frame.getAll('#linked-catalog li');
            linksWrappers = frame.getAll("#linked-catalog .sc-linked-catalog div.sc-expandable-box--adaptive");
        });

        if (browserWidth < 768) {
            it('links positioned correctly on small screens', () => {
                linksWrappers.at(0).assert({
                    left: container.left,
                    left: linksWrappers.at(1).left,
                    bottom: linksWrappers.at(1).top
                });
            });
        } else {
            it('links positioned correctly on tablets and desktops', () => {
                assert(labels.length() > 0, 'we have no labels on page');
                assert(links.length() > 0, 'we have no links on page');

                labels.at(0).assert({
                    left: container.left,
                    bottom: links.at(0).top.minus(16)
                });

                links.at(0).assert({
                    left: labels.at(0).left.plus(16),
                    bottom: links.at(1).top
                });
            });
        }
    });
};
