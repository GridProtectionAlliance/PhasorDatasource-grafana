//******************************************************************************************************
//  query_ctrl.js - Gbtc
//
//  Copyright © 2017, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  10/30/2017 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { QueryCtrl } from 'app/plugins/sdk'
import './../css/query-editor.css!'
import _ from 'lodash'

export class PhasorDataSourceQueryCtrl extends QueryCtrl{
    constructor($scope, $injector, uiSegmentSrv, templateSrv) {
        super($scope, $injector);


        this.scope = $scope;
        var ctrl = this;
        this.uiSegmentSrv = uiSegmentSrv;

        this.target.target = '';
        this.target.textEditor = false;
        this.target.phasorSegment = this.uiSegmentSrv.newPlusButton();
        this.target.phasorSegments = (this.target.phasorSegments == undefined ? [] : this.target.phasorSegments.map(function (a) { return ctrl.uiSegmentSrv.newSegment({ value: a.text, expandable: true }) }));
        this.target.referencePhasorSegment = (this.target.referencePhasorSegment == undefined ? this.uiSegmentSrv.newPlusButton() : ctrl.uiSegmentSrv.newSegment({ value: this.target.referencePhasorSegment.value, expandable: true }));

        this.target.unwrapPhasorAngle = (this.target.unwrapPhasorAngle == undefined ? false : this.target.unwrapPhasorAngle);

        this.setTargetWithPhasors()
  }

  // #region Target Compilation
    setTargetWithPhasors() {
        var ctrl = this;

        ctrl.target.target = ctrl.target.phasorSegments.map(function (a) { return a.value}).join(';');
        ctrl.panelCtrl.refresh()
    }

  // #endregion

  // #region Change Handlers
  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }

  toggleEditorMode(){
    this.target.textEditor = !this.target.textEditor;
  }

  textEditorChanged(){
      this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }

  // used to change the query type from element list to filter expression
  changeQueryType() {
      var ctrl = this;

      ctrl.target.target = '';
      ctrl.target.phasorSegments = [];
      ctrl.target.phasorSegment = ctrl.uiSegmentSrv.newPlusButton();
      ctrl.target.panelCtrl.refresh();
  }

  // #endregion

  // #region Phasors
  getPhasorSegments(context) {
      var ctrl = this;
      var option = null;

      if (event.target.value != "") option = event.target.value;
      return this.datasource.metricFindQuery(option).then(data => {
          var altSegments = _.map(data, item => {
              return ctrl.uiSegmentSrv.newSegment({ value: item.text, expandable: item.expandable});
          });
          altSegments.sort((a, b) => {
              if (a.value < b.value)
                  return -1;
              if (a.value > b.value)
                  return 1;
              return 0;
          });

          if(context == 'edit')
            altSegments.unshift(ctrl.uiSegmentSrv.newSegment('-REMOVE-'));

          return _.filter(altSegments, segment => {
              return _.find(ctrl.target.phasorSegments, x => {
                  return x.value == segment.value
              }) == undefined;
          });
      });
  }

  addPhasorSegment() {
      var ctrl = this;

      // if value is not empty, add new attribute segment
      if (event.target.text != null) {
          ctrl.target.phasorSegments.push(ctrl.uiSegmentSrv.newSegment({ value: event.target.text, expandable: true }))
          ctrl.setTargetWithPhasors()
      }

      // reset the + button
      var plusButton = this.uiSegmentSrv.newPlusButton()
      ctrl.target.phasorSegment.value = plusButton.value
      ctrl.target.phasorSegment.html = plusButton.html
      ctrl.panelCtrl.refresh()
  }

  phasorValueChanged(segment, index) {
      var ctrl = this;

      if (segment.value == "-REMOVE-") {
          ctrl.target.phasorSegments.splice(index, 1);
      }
      else {
          ctrl.target.phasorSegments[index] = segment;
      }

      ctrl.setTargetWithPhasors();
  }
  // #endregion

  // #region Reference Site
  getReferencePhasorSegments() {
      var ctrl = this;
      var option = null;

      if (event.target.value != "") option = event.target.value;
      return this.datasource.metricFindQuery(option).then(data => {
          var altSegments = _.map(data, item => {
              return ctrl.uiSegmentSrv.newSegment({ value: item.text, expandable: item.expandable });
          });
          altSegments.sort((a, b) => {
              if (a.value < b.value)
                  return -1;
              if (a.value > b.value)
                  return 1;
              return 0;
          });

          if (ctrl.target.referencePhasorSegment.type != 'plus-button')
              altSegments.unshift(ctrl.uiSegmentSrv.newSegment('-REMOVE-'));

          return _.filter(altSegments, segment => {
              return _.find(ctrl.target.phasorSegments, x => {
                  return x.value == segment.value
              }) == undefined;
          });
      });
  }
  addReferencePhasorSegment() {
      var ctrl = this;

      // if value is not empty, add new attribute segment
      if (event.target.text != '-REMOVE-') {
          ctrl.target.referencePhasorSegment = ctrl.uiSegmentSrv.newSegment({ value: event.target.text, expandable: true });
          ctrl.target.referencePhasor = event.target.text;
          ctrl.setTargetWithPhasors();
      }
      else {
          ctrl.target.referencePhasorSegment = this.uiSegmentSrv.newPlusButton()
          delete ctrl.target.referencePhasor;
          ctrl.setTargetWithPhasors();
      }
      ctrl.panelCtrl.refresh()
  }


  // #endregion
}

PhasorDataSourceQueryCtrl.templateUrl = 'partial/query.editor.html';