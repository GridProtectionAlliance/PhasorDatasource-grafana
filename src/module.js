//******************************************************************************************************
//  module.js - Gbtc
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
//  10/27/2017 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


import {PhasorDataSource } from './datasource'
import {PhasorDataSourceQueryCtrl} from './controllers/query_ctrl'
import {PhasorConfigCtrl} from './controllers/config_ctrl'
import {PhasorQueryOptionsCtrl} from './controllers/queryOptions_ctrl'
import {PhasorAnnotaionsQueryCtrl} from './controllers/annotations_ctrl'

export {
    PhasorDataSource as Datasource,
    PhasorDataSourceQueryCtrl as QueryCtrl,
    PhasorConfigCtrl as ConfigCtrl,
    PhasorQueryOptionsCtrl as QueryOptionsCtrl,
    PhasorAnnotaionsQueryCtrl as AnnotationsQueryCtrl
}

angular.module('grafana.directives').directive("queryOptions", function () {
    return {
        templateUrl: 'public/plugins/gridprotectionalliance-phasor-datasource/partial/query.options.html',
        restrict: 'E',
        controller: PhasorQueryOptionsCtrl,
        controllerAs: 'queryOptionCtrl',
        scope: {
            flags: "=",
            return: "=",
        }
    };
});