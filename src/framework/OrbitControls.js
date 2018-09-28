import { Vector3, Spherical, Vector2, Events, Quaternion } from 'mmgl/src/index';

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or arrow keys / touch: two-finger move

const EPS = 0.000001;
const changeEvent = { type: 'change' };
const startEvent = { type: 'start' };
const endEvent = { type: 'end' };
const MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

const STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4 };


class OrbitControls extends Events {
    constructor(object, domElement) {
        super();
        let scope = this;

        this.object = object;

        this.domElement = (domElement !== undefined) ? domElement : document;

        // Set to false to disable this control
        this.enabled = true;

        // "target" sets the location of focus, where the object orbits around
        this.target = new Vector3();

        // How far you can dolly in and out ( PerspectiveCamera only )
        this.minDistance = 0;
        this.maxDistance = Infinity;

        // How far you can zoom in and out ( OrthographicCamera only )
        this.minZoom = 0;
        this.maxZoom = Infinity;

        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = - Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians

        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        this.enableDamping = false;
        this.dampingFactor = 0.25;

        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;

        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;

        // Set to false to disable panning
        this.enablePan = true;
        this.panSpeed = 1.0;
        this.screenSpacePanning = false; // if true, pan in screen-space
        this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

        // Set to false to disable use of the keys
        this.enableKeys = true;

        // The four arrow keys
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };


        // Mouse buttons
        this.mouseButtons = { ORBIT: MOUSE.LEFT, ZOOM: MOUSE.MIDDLE, PAN: MOUSE.RIGHT };

        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;

        //
        // internals
        //

        this._state = STATE.NONE;
        // current position in spherical coordinates
        this._spherical = new Spherical();
        this._sphericalDelta = new Spherical();

        this._scale = 1;
        this._panOffset = new Vector3();
        this._zoomChanged = false;

        this._rotateStart = new Vector2();
        this._rotateEnd = new Vector2();
        this._rotateDelta = new Vector2();

        this._panStart = new Vector2();
        this._panEnd = new Vector2();
        this._panDelta = new Vector2();

        this._dollyStart = new Vector2();
        this._dollyEnd = new Vector2();
        this._dollyDelta = new Vector2();



        scope._onContextMenubind = onContextMenu.bind(scope);
        scope._onMouseDownbind = onMouseDown.bind(scope);
        scope._onMouseWheelbind = onMouseWheel.bind(scope);
        scope._onTouchStartbind = onTouchStart.bind(scope);
        scope._onTouchEndbind = onTouchEnd.bind(scope);
        scope._onTouchMove = onTouchMove.bind(scope);
        scope._onKeyDownbind = onKeyDown.bind(scope);

        scope.domElement.addEventListener('contextmenu', this._onContextMenubind, false);

        scope.domElement.addEventListener('mousedown', this._onMouseDownbind, false);
        scope.domElement.addEventListener('wheel', this._onMouseWheelbind, false);

        scope.domElement.addEventListener('touchstart', this._onTouchStartbind, false);
        scope.domElement.addEventListener('touchend', this._onTouchEndbind, false);
        scope.domElement.addEventListener('touchmove', this._onTouchMove, false);

        window.addEventListener('keydown', this._onKeyDownbind, false);


        this.update = (function () {

            let offset = new Vector3();

            // so camera.up is the orbit axis
            let quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
            let quatInverse = quat.clone().inverse();

            let lastPosition = new Vector3();
            let lastQuaternion = new Quaternion();

            return function update() {

                let position = scope.object.position;

                offset.copy(position).sub(scope.target);

                // rotate offset to "y-axis-is-up" space
                offset.applyQuaternion(quat);

                // angle from z-axis around y-axis
                scope._spherical.setFromVector3(offset);

                if (scope.autoRotate && this._state === STATE.NONE) {

                    rotateLeft.call(scope, getAutoRotationAngle.call(scope));

                }

                scope._spherical.theta += scope._sphericalDelta.theta;
                scope._spherical.phi += scope._sphericalDelta.phi;

                // restrict theta to be between desired limits
                scope._spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, scope._spherical.theta));

                // restrict phi to be between desired limits
                scope._spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, scope._spherical.phi));

                scope._spherical.makeSafe();


                scope._spherical.radius *= scope._scale;

                // restrict radius to be between desired limits
                scope._spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, scope._spherical.radius));

                // move target to panned location
                scope.target.add(scope._panOffset);

                offset.setFromSpherical(scope._spherical);

                // rotate offset back to "camera-up-vector-is-up" space
                offset.applyQuaternion(quatInverse);

                position.copy(scope.target).add(offset);

                scope.object.lookAt(scope.target);

                if (scope.enableDamping === true) {

                    scope._sphericalDelta.theta *= (1 - scope.dampingFactor);
                    scope._sphericalDelta.phi *= (1 - scope.dampingFactor);

                    scope._panOffset.multiplyScalar(1 - scope.dampingFactor);

                } else {

                    scope._sphericalDelta.set(0, 0, 0);

                    scope._panOffset.set(0, 0, 0);

                }

                scope._scale = 1;

                // update condition is:
                // min(camera displacement, camera rotation in radians)^2 > EPS
                // using small-angle approximation cos(x/2) = 1 - x^2 / 8

                if (this._zoomChanged ||
                    lastPosition.distanceToSquared(scope.object.position) > EPS ||
                    8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {

                    scope.fire(changeEvent);

                    lastPosition.copy(scope.object.position);
                    lastQuaternion.copy(scope.object.quaternion);
                    this._zoomChanged = false;

                    return true;

                }

                return false;

            };

        })()

        // force an update at start
        this.update();

    }


    //
    // public methods
    //

    getPolarAngle() {

        return _spherical.phi;

    }

    getAzimuthalAngle() {

        return _spherical.theta;

    }

    saveState() {
        let scope = this;
        scope.target0.copy(scope.target);
        scope.position0.copy(scope.object.position);
        scope.zoom0 = scope.object.zoom;

    }

    reset() {
        let scope = this;
        scope.target.copy(scope.target0);
        scope.object.position.copy(scope.position0);
        scope.object.zoom = scope.zoom0;

        scope.object.updateProjectionMatrix();
        scope.fire(changeEvent);

        scope.update();

        scope._state = STATE.NONE;

    }

    // this method is exposed, but perhaps it would be better if we can make it private...
    // update() {
    //     update.call(this);
    // }

    dispose() {
        let scope = this;
        scope.domElement.removeEventListener('contextmenu', scope._onContextMenubind, false);
        scope.domElement.removeEventListener('mousedown', scope._onMouseDownbind, false);
        scope.domElement.removeEventListener('wheel', scope._onMouseWheelbind, false);

        scope.domElement.removeEventListener('touchstart', scope.onTouchStart, false);
        scope.domElement.removeEventListener('touchend', scope._onTouchEndbind, false);
        scope.domElement.removeEventListener('touchmove', scope._onTouchMove, false);

        document.removeEventListener('mousemove', scope._onMouseMovebind, false);
        document.removeEventListener('mouseup', scope._onMouseUpbind, false);

        window.removeEventListener('keydown', scope._onKeyDownbind, false);

        scope._onContextMenubind = null;
        scope._onMouseDownbind = null;
        scope._onMouseWheelbind = null;
        scope.onTouchStart = null;
        scope._onTouchEndbind = null;
        scope._onTouchMove = null;
        scope._onMouseMovebind = null;
        scope._onMouseUpbind = null;
        scope._onKeyDownbind = null;

        //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

    }

}






function getAutoRotationAngle() {

    return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;

}

function getZoomScale() {

    return Math.pow(0.95, this.zoomSpeed);

}

function rotateLeft(angle) {

    this._sphericalDelta.theta -= angle;

}

function rotateUp(angle) {

    this._sphericalDelta.phi -= angle;

}

var panLeft = function () {

    var v = new Vector3();

    return function panLeft(distance, objectMatrix) {

        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
        v.multiplyScalar(- distance);

        this._panOffset.add(v);

    };

}();

let panUp = function () {
    let v = new Vector3();

    return function panUp(distance, objectMatrix) {

        if (this.screenSpacePanning === true) {

            v.setFromMatrixColumn(objectMatrix, 1);

        } else {

            v.setFromMatrixColumn(objectMatrix, 0);
            v.crossVectors(this.object.up, v);

        }

        v.multiplyScalar(distance);

        this._panOffset.add(v);

    };

}();

// deltaX and deltaY are in pixels; right and down are positive
var pan = function () {

    var offset = new Vector3();

    return function pan(deltaX, deltaY) {
        let scope = this;
        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if (scope.object.isPerspectiveCamera) {

            // perspective
            var position = scope.object.position;
            offset.copy(position).sub(scope.target);
            var targetDistance = offset.length();

            // half of the fov is center to top of screen
            targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);

            // we use only clientHeight here so aspect ratio does not distort speed
            panLeft.call(scope, 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
            panUp.call(scope, 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);

        } else if (scope.object.isOrthographicCamera) {

            // orthographic
            panLeft.call(scope, deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
            panUp.call(scope, deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);

        } else {

            // camera neither orthographic nor perspective
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
            scope.enablePan = false;

        }

    };

}();

function dollyIn(dollyScale) {
    let scope = this;
    if (scope.object.isPerspectiveCamera) {

        scope._scale /= dollyScale;

    } else if (scope.object.isOrthographicCamera) {

        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
        scope.object.updateProjectionMatrix();
        scope._zoomChanged = true;

    } else {

        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
        scope.enableZoom = false;

    }

}

function dollyOut(dollyScale) {
    let scope = this;
    if (scope.object.isPerspectiveCamera) {

        scope._scale *= dollyScale;

    } else if (scope.object.isOrthographicCamera) {

        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
        scope.object.updateProjectionMatrix();
        scope._zoomChanged = true;

    } else {

        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
        scope.enableZoom = false;

    }

}

//
// event callbacks - update the object state
//

function handleMouseDownRotate(event) {

    //console.log( 'handleMouseDownRotate' );

    this._rotateStart.set(event.clientX, event.clientY);

}

function handleMouseDownDolly(event) {

    //console.log( 'handleMouseDownDolly' );

    this._dollyStart.set(event.clientX, event.clientY);

}

function handleMouseDownPan(event) {

    //console.log( 'handleMouseDownPan' );

    this._panStart.set(event.clientX, event.clientY);

}

function handleMouseMoveRotate(event) {
    let scope = this;
    //console.log( 'handleMouseMoveRotate' );

    scope._rotateEnd.set(event.clientX, event.clientY);

    scope._rotateDelta.subVectors(scope._rotateEnd, scope._rotateStart).multiplyScalar(scope.rotateSpeed);

    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    rotateLeft.call(scope, 2 * Math.PI * scope._rotateDelta.x / element.clientHeight); // yes, height

    rotateUp.call(scope, 2 * Math.PI * scope._rotateDelta.y / element.clientHeight);

    scope._rotateStart.copy(scope._rotateEnd);

    scope.update();

}

function handleMouseMoveDolly(event) {
    let scope = this;
    //console.log( 'handleMouseMoveDolly' );

    scope._dollyEnd.set(event.clientX, event.clientY);

    scope._dollyDelta.subVectors(scope._dollyEnd, scope._dollyStart);

    if (scope._dollyDelta.y > 0) {

        dollyIn.call(scope, getZoomScale.call(scope));

    } else if (scope._dollyDelta.y < 0) {

        dollyOut.call(scope, getZoomScale.call(scope));

    }

    scope._dollyStart.copy(scope._dollyEnd);

    scope.update();

}

function handleMouseMovePan(event) {
    let scope = this;
    //console.log( 'handleMouseMovePan' );

    scope._panEnd.set(event.clientX, event.clientY);

    scope._panDelta.subVectors(scope._panEnd, scope._panStart).multiplyScalar(scope.panSpeed);

    pan.call(scope, scope._panDelta.x, scope._panDelta.y);

    scope._panStart.copy(scope._panEnd);

    scope.update();

}

function handleMouseUp(event) {

    // console.log( 'handleMouseUp' );

}

function handleMouseWheel(event) {
    let scope = this;
    // console.log( 'handleMouseWheel' );

    if (event.deltaY < 0) {

        dollyOut.call(scope, getZoomScale.call(scope));

    } else if (event.deltaY > 0) {

        dollyIn.call(scope, getZoomScale.call(scope));

    }

    scope.update();

}

function handleKeyDown(event) {
    let scope = this;
    //console.log( 'handleKeyDown' );

    switch (event.keyCode) {

        case scope.keys.UP:
            pan.call(scope, 0, scope.keyPanSpeed);
            scope.update();
            break;

        case scope.keys.BOTTOM:
            pan.call(scope, 0, - scope.keyPanSpeed);
            scope.update();
            break;

        case scope.keys.LEFT:
            pan.call(scope, scope.keyPanSpeed, 0);
            scope.update();
            break;

        case scope.keys.RIGHT:
            pan.call(scope, - scope.keyPanSpeed, 0);
            scope.update();
            break;

    }

}

function handleTouchStartRotate(event) {

    //console.log( 'handleTouchStartRotate' );

    this._rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);

}

function handleTouchStartDollyPan(event) {
    let scope = this;
    //console.log( 'handleTouchStartDollyPan' );

    if (scope.enableZoom) {

        var dx = event.touches[0].pageX - event.touches[1].pageX;
        var dy = event.touches[0].pageY - event.touches[1].pageY;

        var distance = Math.sqrt(dx * dx + dy * dy);

        scope._dollyStart.set(0, distance);

    }

    if (scope.enablePan) {

        var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
        var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);

        scope._panStart.set(x, y);

    }

}

function handleTouchMoveRotate(event) {
    let scope = this;
    //console.log( 'handleTouchMoveRotate' );

    scope._rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);

    scope._rotateDelta.subVectors(scope._rotateEnd, scope._rotateStart).multiplyScalar(scope.rotateSpeed);

    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    rotateLeft.call(scope, 2 * Math.PI * scope._rotateDelta.x / element.clientHeight); // yes, height

    rotateUp.call(scope, 2 * Math.PI * scope._rotateDelta.y / element.clientHeight);

    scope._rotateStart.copy(scope._rotateEnd);

    scope.update();

}

function handleTouchMoveDollyPan(event) {
    let scope = this;
    //console.log( 'handleTouchMoveDollyPan' );

    if (scope.enableZoom) {

        var dx = event.touches[0].pageX - event.touches[1].pageX;
        var dy = event.touches[0].pageY - event.touches[1].pageY;

        var distance = Math.sqrt(dx * dx + dy * dy);

        scope._dollyEnd.set(0, distance);

        scope._dollyDelta.set(0, Math.pow(scope._dollyEnd.y / scope._dollyStart.y, scope.zoomSpeed));

        dollyIn.call(scope, scope._dollyDelta.y);

        scope._dollyStart.copy(scope._dollyEnd);

    }

    if (scope.enablePan) {

        var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
        var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);

        scope._panEnd.set(x, y);

        scope._panDelta.subVectors(scope._panEnd, scope._panStart).multiplyScalar(scope.panSpeed);

        pan.call(scope, scope._panDelta.x, panDelta.y);

        scope._panStart.copy(scope._panEnd);

    }

    scope.update();

}

function handleTouchEnd(event) {

    //console.log( 'handleTouchEnd' );

}

//
// event handlers - FSM: listen for events and reset state
//

function onMouseDown(event) {
    let scope = this;

    if (scope.enabled === false) return;

    event.preventDefault();

    switch (event.button) {

        case scope.mouseButtons.ORBIT:

            if (scope.enableRotate === false) return;

            handleMouseDownRotate.call(scope, event);

            scope._state = STATE.ROTATE;

            break;

        case scope.mouseButtons.ZOOM:

            if (scope.enableZoom === false) return;

            handleMouseDownDolly.call(scope, event);

            scope._state = STATE.DOLLY;

            break;

        case scope.mouseButtons.PAN:

            if (scope.enablePan === false) return;

            handleMouseDownPan.call(scope, event);

            scope._state = STATE.PAN;

            break;

    }

    if (scope._state !== STATE.NONE) {

        scope._onMouseMovebind = onMouseMove.bind(scope);
        scope._onMouseUpbind = onMouseUp.bind(scope);
        document.addEventListener('mousemove', scope._onMouseMovebind, false);
        document.addEventListener('mouseup', scope._onMouseUpbind, false);

        scope.fire(startEvent);

    }

}

function onMouseMove(event) {

    let scope = this;

    if (scope.enabled === false) return;

    event.preventDefault();

    switch (scope._state) {

        case STATE.ROTATE:

            if (scope.enableRotate === false) return;

            handleMouseMoveRotate.call(scope, event);

            break;

        case STATE.DOLLY:

            if (scope.enableZoom === false) return;

            handleMouseMoveDolly.call(scope, event);

            break;

        case STATE.PAN:

            if (scope.enablePan === false) return;

            handleMouseMovePan.call(scope, event);

            break;

    }

}

function onMouseUp(event) {

    let scope = this;

    if (scope.enabled === false) return;

    handleMouseUp.call(scope, event);

    document.removeEventListener('mousemove', onMouseMove.bind(scope), false);
    document.removeEventListener('mouseup', onMouseUp.bind(scope), false);

    scope.fire(endEvent);

    scope._state = STATE.NONE;

}

function onMouseWheel(event) {

    let scope = this;

    if (scope.enabled === false || scope.enableZoom === false || (scope._state !== STATE.NONE && scope._state !== STATE.ROTATE)) return;

    event.preventDefault();
    event.stopPropagation();

    scope.fire(startEvent);

    handleMouseWheel.call(scope, event);

    scope.fire(endEvent);

}

function onKeyDown(event) {
    let scope = this;

    if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;

    handleKeyDown.call(scope, event);

}

function onTouchStart(event) {

    let scope = this;
    if (scope.enabled === false) return;

    event.preventDefault();

    switch (event.touches.length) {

        case 1:	// one-fingered touch: rotate

            if (scope.enableRotate === false) return;

            handleTouchStartRotate.call(scope, event);

            scope._state = STATE.TOUCH_ROTATE;

            break;

        case 2:	// two-fingered touch: dolly-pan

            if (scope.enableZoom === false && scope.enablePan === false) return;

            handleTouchStartDollyPan.call(scope, event);

            scope._state = STATE.TOUCH_DOLLY_PAN;

            break;

        default:

            scope._state = STATE.NONE;

    }

    if (scope._state !== STATE.NONE) {

        scope.fire(startEvent);

    }

}

function onTouchMove(event) {

    let scope = this;

    if (scope.enabled === false) return;

    event.preventDefault();
    event.stopPropagation();

    switch (event.touches.length) {

        case 1: // one-fingered touch: rotate

            if (scope.enableRotate === false) return;
            if (scope._state !== STATE.TOUCH_ROTATE) return; // is this needed?

            handleTouchMoveRotate.call(scope, event);

            break;

        case 2: // two-fingered touch: dolly-pan

            if (scope.enableZoom === false && scope.enablePan === false) return;
            if (scope._state !== STATE.TOUCH_DOLLY_PAN) return; // is this needed?

            handleTouchMoveDollyPan.call(scope, event);

            break;

        default:

            scope._state = STATE.NONE;

    }

}

function onTouchEnd(event) {
    let scope = this;
    if (scope.enabled === false) return;

    handleTouchEnd.call(scope, event);

    scope.fire(endEvent);

    scope._state = STATE.NONE;

}

function onContextMenu(event) {
    let scope = this;
    if (scope.enabled === false) return;

    event.preventDefault();

}




export { OrbitControls };