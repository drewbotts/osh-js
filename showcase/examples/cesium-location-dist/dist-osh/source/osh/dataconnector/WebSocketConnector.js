/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataConnector from './DataConnector';
import {isWebWorker} from '../utils/Utils';

/**
 * Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @extends DataConnector
 * @example
 * let url = ...;
 * let connector = new WebSocketDataConnector(url);
 *
 * // connect
 * connector.connect();
 *
 * // disconnect
 * connector.disconnect();
 *
 * // close
 * connector.close();
 *
 */

class WebSocketConnector extends DataConnector {
    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     */
    connect() {
        let that = this;
        if (!this.init) {
            //creates Web Socket
            if (isWebWorker()) {
                let url = this.getUrl();
                let blobURL = URL.createObjectURL(new Blob(['(',

                        function () {
                            let ws = null;
                            self.onmessage = (e) => {
                                if (e.data === "close") {
                                    close();
                                } else {
                                    // is URL
                                    init(e.data);
                                }
                            };

                            function init(url) {
                                ws = new WebSocket(url);
                                ws.binaryType = 'arraybuffer';
                                ws.onmessage = (event) => {
                                    //callback data on message received
                                    if (event.data.byteLength > 0) {
                                        self.postMessage(event.data, [event.data]);
                                    }
                                };

                                ws.onerror = (event) => {
                                    ws.close();
                                };
                            }

                            function close() {
                                ws.close();
                            }
                        }.toString(), ')()'],
                    {type: 'application/javascript'}));

                this.worker = new Worker(blobURL);

                this.worker.postMessage(url);
                this.worker.onmessage = (e) => that.onMessage(e.data);

                // Won't be needing this anymore
                URL.revokeObjectURL(blobURL);
            } else {
                this.ws = new WebSocket(this.getUrl());
                this.ws.binaryType = 'arraybuffer';
                this.ws.onmessage = (e) =>   {
                    if (e.data.byteLength > 0) {
                        this.onMessage(e.data);
                    }
                }

                // closes socket if any errors occur
                this.ws.onerror = (event) => this.ws.close();
            }
            this.init = true;
        }
    }

    /**
     * Disconnects the websocket.
     */
    disconnect() {
        if (isWebWorker() && this.worker !== null) {
            this.worker.postMessage("close");
            this.worker.terminate();
            this.init = false;
        } else if (this.ws !== null) {
            this.ws.close();
            this.init = false;
        }
    }

    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @event
     */
    onMessage(data) {
    }

    /**
     * Closes the webSocket.
     */
    close() {
        this.disconnect();
    }
}

export default  WebSocketConnector;
