import SensorWebApi from "../SensorWebApi";
import ControlFilter from "../control/ControlFilter";
import Collection from "../Collection";
import API from "../routes.conf";
import CommandFilter from "./CommandFilter";
import SweApiFetchJsonParser from "../../datasource/sweapi/parser/json/SweApiFetchJson.parser";

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

class Command extends SensorWebApi {
    /**
     *
     */
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.jsonParser = new SweApiFetchJsonParser(networkProperties);
    }

    /**
     * Get all status messages associated to a specific command
     * @param commandFilter
     * @param pageSize
     * @return {Promise<Collection<JSON>>}
     */
    async searchStatus(commandFilter = new CommandFilter(), pageSize= 10) {
        return new Collection(
            API.commands.status.replace('{sysid}',this.properties.systemId)
                               .replace('{dsid}', this.properties.commandstream)
                               .replace('{cmdid}', this.properties.id),
            commandFilter, pageSize, this.jsonParser, this._network.info.connector);
    }

    /**
     * Stream all status messages associated to a specific command
     * @param commandFilter
     * @param pageSize
     * @return {Promise<Collection<JSON>>}
     */
    streamStatus(commandFilter = new CommandFilter(), callback = function(){}) {
        this._network.stream.connector.onMessage = callback;

        this._network.stream.connector.doRequest(
            API.commands.status.replace('{sysid}',this.properties.systemId)
                .replace('{dsid}', this.properties.commandstream)
                .replace('{cmdid}', this.properties.id),
            commandFilter.toQueryString(),
            'arraybuffer'
        );
    }
}

export default Command;