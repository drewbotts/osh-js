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

import View from "../View";
import {isDefined} from "../../../utils/Utils";

/**
 * This class is an abstract class in charge of handling common Map operations.
 * @extends View
 */
class MapView extends View {
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems,options);

        // map Styler id to array of corresponding markers
        this.stylerIdToMarkers = {};

        // map Styler id to array of corresponding polylines
        this.stylerIdToPolylines= {};

    }

    /**
     * Associate a markerId to a Styler for a fast lookup
     * @param {PointMarker} styler - the Styler object
     * @param {Object} markerObject - the Map marker object
     */
    addMarkerToStyler(styler, markerObject) {
        // associate the list of markers owning by a specific marker
        if(!(styler.getId() in this.stylerIdToMarkers)) {
            this.stylerIdToMarkers[styler.getId()] = {};
        }
        this.stylerIdToMarkers[styler.getId()][styler.markerId] = markerObject;
    }

    /**
     * Associate a polylineId to a Styler for a fast lookup
     * @param {Polyline} styler - the Styler object
     * @param {Object} polylineObject - the Map polyline object
     */
    addPolylineToStyler(styler, polylineObject) {
        // associate the list of markers owning by a specific marker
        if(!(styler.getId() in this.stylerIdToPolylines)) {
            this.stylerIdToPolylines[styler.getId()] = {};
        }
        this.stylerIdToPolylines[styler.getId()][styler.polylineId] = polylineObject;
    }

    /**
     * Get the markerId associate to the Styler
     * @param {PointMarker} styler - the Styler Object
     */
    getMarker(styler) {
        if(!(styler.getId() in  this.stylerIdToMarkers)) {
            return null;
        }
        return this.stylerIdToMarkers[styler.getId()][styler.markerId];
    }

    /**
     * Get the markerId associate to the Styler
     * @param {Polyline} styler - the Styler Object
     */
    getPolyline(styler) {
        if(!(styler.getId() in  this.stylerIdToPolylines)) {
            return null;
        }
        return this.stylerIdToPolylines[styler.getId()][styler.polylineId];
    }

    /**
     * Remove Corresponding ViewItem
     * @param {Object} viewItem - The viewItem object
     */
    removeViewItem(viewItem) {
        super.removeViewItem(viewItem);
        // check for marker
        this.removeMarkers(viewItem.styler);

        // check for polylines
        this.removePolylines(viewItem.styler);
    }

    /**
     * Remove the markers corresponding to a PointMarker Styler
     * @param {PointMarker} pointMarker - the styler to remove the markers from
     */
    removeMarkers(pointMarker) {
        if(isDefined(pointMarker.markerId)) {
            const markersMap = this.stylerIdToMarkers[pointMarker.id];
            if(isDefined(markersMap)) {
                for(let markerId in markersMap) {
                    const marker = markersMap[markerId];
                    this.removeMarkerFromLayer(marker)
                }
            }

            // remove markers ids from Styler map
            delete this.stylerIdToMarkers[pointMarker.id];
        }
    }

    /**
     * Remove the polylines corresponding to a Polyline Styler
     * @param {Polyline} polyline - the styler to remove the polylines from
     */
    removePolylines(polyline) {
        if(isDefined(polyline.polylineId)) {
            const polylinesMap = this.stylerIdToPolylines[polyline.id];
            if(isDefined(polylinesMap)) {
                for(let polylineId in polylinesMap) {
                    const polyline = polylinesMap[polylineId];
                    this.removePolylineFromLayer(polyline)
                }
            }

            // remove polylines ids from Styler map
            delete this.stylerIdToPolylines[polyline.id];
        }
    }

    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependant.
     * @param {Object} marker - The Map marker object
     */
    removeMarkerFromLayer(marker) {}

    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @param {Object} polyline - The Map polyline object
     */
    removePolylineFromLayer(polyline) {}
}

export default MapView;