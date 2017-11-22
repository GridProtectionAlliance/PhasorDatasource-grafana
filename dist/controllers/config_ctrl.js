'use strict';

System.register(['lodash', './../js/constants.js'], function (_export, _context) {
    "use strict";

    var _, DefaultFlags, MeasurementStateFlags, PhasorConfigCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_lodash) {
            _ = _lodash.default;
        }, function (_jsConstantsJs) {
            DefaultFlags = _jsConstantsJs.DefaultFlags;
            MeasurementStateFlags = _jsConstantsJs.MeasurementStateFlags;
        }],
        execute: function () {
            _export('PhasorConfigCtrl', PhasorConfigCtrl = function PhasorConfigCtrl($scope) {
                _classCallCheck(this, PhasorConfigCtrl);

                var ctrl = this;

                ctrl.current.jsonData = this.current.jsonData || {};
                ctrl.current.jsonData.flags = ctrl.current.jsonData.flags == undefined ? DefaultFlags : _.merge(DefaultFlags, ctrl.current.jsonData.flags);
            });

            _export('PhasorConfigCtrl', PhasorConfigCtrl);

            PhasorConfigCtrl.templateUrl = 'partial/config.html';
        }
    };
});
//# sourceMappingURL=config_ctrl.js.map
