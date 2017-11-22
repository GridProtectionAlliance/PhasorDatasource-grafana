'use strict';

System.register(['./datasource', './controllers/query_ctrl', './controllers/config_ctrl', './controllers/queryOptions_ctrl', './controllers/annotations_ctrl'], function (_export, _context) {
    "use strict";

    var PhasorDataSource, PhasorDataSourceQueryCtrl, PhasorConfigCtrl, PhasorQueryOptionsCtrl, PhasorAnnotaionsQueryCtrl;
    return {
        setters: [function (_datasource) {
            PhasorDataSource = _datasource.PhasorDataSource;
        }, function (_controllersQuery_ctrl) {
            PhasorDataSourceQueryCtrl = _controllersQuery_ctrl.PhasorDataSourceQueryCtrl;
        }, function (_controllersConfig_ctrl) {
            PhasorConfigCtrl = _controllersConfig_ctrl.PhasorConfigCtrl;
        }, function (_controllersQueryOptions_ctrl) {
            PhasorQueryOptionsCtrl = _controllersQueryOptions_ctrl.PhasorQueryOptionsCtrl;
        }, function (_controllersAnnotations_ctrl) {
            PhasorAnnotaionsQueryCtrl = _controllersAnnotations_ctrl.PhasorAnnotaionsQueryCtrl;
        }],
        execute: function () {
            _export('Datasource', PhasorDataSource);

            _export('QueryCtrl', PhasorDataSourceQueryCtrl);

            _export('ConfigCtrl', PhasorConfigCtrl);

            _export('QueryOptionsCtrl', PhasorQueryOptionsCtrl);

            _export('AnnotationsQueryCtrl', PhasorAnnotaionsQueryCtrl);

            angular.module('grafana.directives').directive("phasorQueryOptions", function () {
                return {
                    templateUrl: 'public/plugins/gridprotectionalliance-phasor-datasource/partial/query.options.html',
                    restrict: 'E',
                    controller: PhasorQueryOptionsCtrl,
                    controllerAs: 'queryOptionCtrl',
                    scope: {
                        flags: "=",
                        return: "="
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=module.js.map
