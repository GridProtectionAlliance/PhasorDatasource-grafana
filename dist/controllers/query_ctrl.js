'use strict';

System.register(['app/plugins/sdk', './../css/query-editor.css!', 'lodash'], function (_export, _context) {
    "use strict";

    var QueryCtrl, _, _createClass, PhasorDataSourceQueryCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            QueryCtrl = _appPluginsSdk.QueryCtrl;
        }, function (_cssQueryEditorCss) {}, function (_lodash) {
            _ = _lodash.default;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('PhasorDataSourceQueryCtrl', PhasorDataSourceQueryCtrl = function (_QueryCtrl) {
                _inherits(PhasorDataSourceQueryCtrl, _QueryCtrl);

                function PhasorDataSourceQueryCtrl($scope, $injector, uiSegmentSrv, templateSrv) {
                    _classCallCheck(this, PhasorDataSourceQueryCtrl);

                    var _this = _possibleConstructorReturn(this, (PhasorDataSourceQueryCtrl.__proto__ || Object.getPrototypeOf(PhasorDataSourceQueryCtrl)).call(this, $scope, $injector));

                    _this.scope = $scope;
                    var ctrl = _this;
                    _this.uiSegmentSrv = uiSegmentSrv;

                    _this.target.target = '';
                    _this.target.textEditor = false;
                    _this.target.phasorSegment = _this.uiSegmentSrv.newPlusButton();
                    _this.target.phasorSegments = _this.target.phasorSegments == undefined ? [] : _this.target.phasorSegments.map(function (a) {
                        return ctrl.uiSegmentSrv.newSegment({ value: a.text, expandable: true });
                    });
                    _this.target.referencePhasorSegment = _this.target.referencePhasorSegment == undefined ? _this.uiSegmentSrv.newPlusButton() : ctrl.uiSegmentSrv.newSegment({ value: _this.target.referencePhasorSegment.value, expandable: true });

                    _this.target.unwrapPhasorAngle = _this.target.unwrapPhasorAngle == undefined ? false : _this.target.unwrapPhasorAngle;

                    _this.setTargetWithPhasors();
                    return _this;
                }

                // #region Target Compilation


                _createClass(PhasorDataSourceQueryCtrl, [{
                    key: 'setTargetWithPhasors',
                    value: function setTargetWithPhasors() {
                        var ctrl = this;

                        ctrl.target.target = ctrl.target.phasorSegments.map(function (a) {
                            return a.value;
                        }).join(';');
                        ctrl.panelCtrl.refresh();
                    }
                }, {
                    key: 'onChangeInternal',
                    value: function onChangeInternal() {
                        this.panelCtrl.refresh(); // Asks the panel to refresh data.
                    }
                }, {
                    key: 'toggleEditorMode',
                    value: function toggleEditorMode() {
                        this.target.textEditor = !this.target.textEditor;
                    }
                }, {
                    key: 'textEditorChanged',
                    value: function textEditorChanged() {
                        this.panelCtrl.refresh(); // Asks the panel to refresh data.
                    }
                }, {
                    key: 'changeQueryType',
                    value: function changeQueryType() {
                        var ctrl = this;

                        ctrl.target.target = '';
                        ctrl.target.phasorSegments = [];
                        ctrl.target.phasorSegment = ctrl.uiSegmentSrv.newPlusButton();
                        ctrl.target.panelCtrl.refresh();
                    }
                }, {
                    key: 'getPhasorSegments',
                    value: function getPhasorSegments(context) {
                        var ctrl = this;
                        var option = null;

                        if (event.target.value != "") option = event.target.value;
                        return this.datasource.metricFindQuery(option).then(function (data) {
                            var altSegments = _.map(data, function (item) {
                                return ctrl.uiSegmentSrv.newSegment({ value: item.text, expandable: item.expandable });
                            });
                            altSegments.sort(function (a, b) {
                                if (a.value < b.value) return -1;
                                if (a.value > b.value) return 1;
                                return 0;
                            });

                            if (context == 'edit') altSegments.unshift(ctrl.uiSegmentSrv.newSegment('-REMOVE-'));

                            return _.filter(altSegments, function (segment) {
                                return _.find(ctrl.target.phasorSegments, function (x) {
                                    return x.value == segment.value;
                                }) == undefined;
                            });
                        });
                    }
                }, {
                    key: 'addPhasorSegment',
                    value: function addPhasorSegment() {
                        var ctrl = this;

                        // if value is not empty, add new attribute segment
                        if (event.target.text != null) {
                            ctrl.target.phasorSegments.push(ctrl.uiSegmentSrv.newSegment({ value: event.target.text, expandable: true }));
                            ctrl.setTargetWithPhasors();
                        }

                        // reset the + button
                        var plusButton = this.uiSegmentSrv.newPlusButton();
                        ctrl.target.phasorSegment.value = plusButton.value;
                        ctrl.target.phasorSegment.html = plusButton.html;
                        ctrl.panelCtrl.refresh();
                    }
                }, {
                    key: 'phasorValueChanged',
                    value: function phasorValueChanged(segment, index) {
                        var ctrl = this;

                        if (segment.value == "-REMOVE-") {
                            ctrl.target.phasorSegments.splice(index, 1);
                        } else {
                            ctrl.target.phasorSegments[index] = segment;
                        }

                        ctrl.setTargetWithPhasors();
                    }
                }, {
                    key: 'getReferencePhasorSegments',
                    value: function getReferencePhasorSegments() {
                        var ctrl = this;
                        var option = null;

                        if (event.target.value != "") option = event.target.value;
                        return this.datasource.metricFindQuery(option).then(function (data) {
                            var altSegments = _.map(data, function (item) {
                                return ctrl.uiSegmentSrv.newSegment({ value: item.text, expandable: item.expandable });
                            });
                            altSegments.sort(function (a, b) {
                                if (a.value < b.value) return -1;
                                if (a.value > b.value) return 1;
                                return 0;
                            });

                            if (ctrl.target.referencePhasorSegment.type != 'plus-button') altSegments.unshift(ctrl.uiSegmentSrv.newSegment('-REMOVE-'));

                            return _.filter(altSegments, function (segment) {
                                return _.find(ctrl.target.phasorSegments, function (x) {
                                    return x.value == segment.value;
                                }) == undefined;
                            });
                        });
                    }
                }, {
                    key: 'addReferencePhasorSegment',
                    value: function addReferencePhasorSegment() {
                        var ctrl = this;

                        // if value is not empty, add new attribute segment
                        if (event.target.text != '-REMOVE-') {
                            ctrl.target.referencePhasorSegment = ctrl.uiSegmentSrv.newSegment({ value: event.target.text, expandable: true });
                            ctrl.target.referencePhasor = event.target.text;
                            ctrl.setTargetWithPhasors();
                        } else {
                            ctrl.target.referencePhasorSegment = this.uiSegmentSrv.newPlusButton();
                            delete ctrl.target.referencePhasor;
                            ctrl.setTargetWithPhasors();
                        }
                        ctrl.panelCtrl.refresh();
                    }
                }]);

                return PhasorDataSourceQueryCtrl;
            }(QueryCtrl));

            _export('PhasorDataSourceQueryCtrl', PhasorDataSourceQueryCtrl);

            PhasorDataSourceQueryCtrl.templateUrl = 'partial/query.editor.html';
        }
    };
});
//# sourceMappingURL=query_ctrl.js.map
