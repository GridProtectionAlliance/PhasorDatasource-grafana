//******************************************************************************************************
//  datasource.js - Gbtc
//
//  Copyright � 2017, Grid Protection Alliance.  All Rights Reserved.
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

import _ from "lodash";

export class PhasorDataSource {
    constructor(instanceSettings, $q, backendSrv, templateSrv) {
        this.type = instanceSettings.type;
        this.url = instanceSettings.url;
        this.name = instanceSettings.name;
        this.q = $q;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.options = {
            includedDataFlags: (instanceSettings.jsonData.Included == undefined ? 0xFFFFFFFF : instanceSettings.jsonData.Included),
            excludedDataFlags: (instanceSettings.jsonData.Excluded == undefined ? 0x00000000 : instanceSettings.jsonData.Excluded),
            includeNormalData: (instanceSettings.jsonData.IncludeNormal == undefined ? true : instanceSettings.jsonData.IncludeNormal)
        }
  }

  query(options) {
    var query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(function (t) {
      return !t.hide;
    });

    if (query.targets.length <= 0) {
      return this.q.when({ data: [] });
    }

    query.options = this.options;
 
    return this.backendSrv.datasourceRequest({
      url: this.url + '/queryPhasors',
      data: query,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  testDatasource() {
    return this.backendSrv.datasourceRequest({
      url: this.url + '/',
      method: 'GET'
    }).then(function (response) {
      if (response.status === 200) {
        return { status: "success", message: "Data source is working", title: "Success" };
      }
    });
  }

  annotationQuery(options) {
    var query = this.templateSrv.replace(options.annotation.query, {}, 'glob');
    var annotationQuery = {
      range: options.range,
      annotation: {
        name: options.annotation.name,
        datasource: options.annotation.datasource,
        enable: options.annotation.enable,
        iconColor: options.annotation.iconColor,
        query: query
      },
      rangeRaw: options.rangeRaw
    };

    return this.backendSrv.datasourceRequest({
      url: this.url + '/annotations',
      method: 'POST',
      data: annotationQuery
    }).then(function (result) {
      return result.data;
    });
  }

  metricFindQuery(options) {
      var interpolated = {
          target: this.templateSrv.replace(options, null, 'regex')
      };


    return this.backendSrv.datasourceRequest({
      url: this.url + '/search',
      data: interpolated,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(this.mapToTextValue);
  }

  whereFindQuery(options) {

      var interpolated = {
          target: this.templateSrv.replace(options, null, 'regex')
      };

      return this.backendSrv.datasourceRequest({
          url: this.url + '/SearchFields',
          data: interpolated,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      }).then(this.mapToTextValue);
  }

  mapToTextValue(result) {
    return _.map(result.data, function (d, i) {
      return { text: d, value: i };
    });
  }

  buildQueryParameters(options) {
    var _this = this;

    //remove placeholder targets
    options.targets = _.filter(options.targets, function (target) {
      return target.target !== 'select metric';
    });

    var targets = _.map(options.targets, function (target) {
      return {
        target: _this.templateSrv.replace(target.target),
        refId: target.refId,
        hide: target.hide, 
        referencephasor: target.referencePhasor 
      };
    });

    options.targets = targets;

    return options;
  }

  filterFindQuery() {
      return this.backendSrv.datasourceRequest({
          url: this.url + '/SearchFilters',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      }).then(this.mapToTextValue);
  }

  phasorFindQuery(options) {

      var interpolated = {
          target: this.templateSrv.replace(options, null, 'regex')
      };

      return this.backendSrv.datasourceRequest({
          url: this.url + '/SearchPhasors',
          data: interpolated,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      }).then(this.mapToTextValue);
  }


  orderByFindQuery(options) {
      var interpolated = {
          target: this.templateSrv.replace(options, null, 'regex')
      };

      return this.backendSrv.datasourceRequest({
          url: this.url + '/SearchOrderBys',
          data: interpolated,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      }).then(this.mapToTextValue);
  }

  getMetaData(options) {
      var interpolated = {
          target: this.templateSrv.replace(options, null, 'regex')
      };

      return this.backendSrv.datasourceRequest({
          url: this.url + '/GetMetadata',
          data: interpolated,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      });

  }
}
