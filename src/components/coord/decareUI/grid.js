
import { Component } from '../../Component';

class Grid extends Component {
    constructor(_coord) {
        super(_coord);
        this.init();
    }
    init(){
        this.group = this._root.renderView.addGroup({ name: 'grid' });
    }
}

export { Grid };