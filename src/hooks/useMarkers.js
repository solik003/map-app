var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useCallback } from "react";
import { useFirebaseAddRecord } from "./useFirebaseAddRecord";
var useMarkers = function (token) {
    var _a = useState([]), markers = _a[0], setMarkers = _a[1];
    var addRecord = useFirebaseAddRecord(token).addRecord;
    var handleMapClick = useCallback(function (event) {
        var _a = event.lngLat, lng = _a.lng, lat = _a.lat;
        var newMarker = {
            id: Math.random().toString(36).substring(7),
            location: { lat: lat, lng: lng },
            timestamp: new Date().toISOString(),
            markerNumber: (markers.length + 1).toString(),
            nextMarkerId: markers.length > 0 ? markers[markers.length - 1].id : null,
        };
        addRecord('marker', newMarker).then(function () {
            setMarkers(function (prevMarkers) { return __spreadArray(__spreadArray([], prevMarkers, true), [newMarker], false); });
        });
    }, [markers, addRecord]);
    var handleMarkerDragEnd = function (id, event) {
        var _a = event.lngLat, lng = _a.lng, lat = _a.lat;
        setMarkers(function (prevMarkers) {
            return prevMarkers.map(function (marker) {
                return marker.id === id
                    ? __assign(__assign({}, marker), { location: { lat: lat, lng: lng } }) : marker;
            });
        });
    };
    var handleMarkerClick = function (id) {
        setMarkers(function (prevMarkers) {
            return prevMarkers.filter(function (marker) { return marker.id !== id; });
        });
        console.log("Deleted marker ID:", id);
    };
    var handleClearAllMarkers = function () {
        setMarkers([]);
    };
    return {
        markers: markers,
        handleMapClick: handleMapClick,
        handleMarkerDragEnd: handleMarkerDragEnd,
        handleMarkerClick: handleMarkerClick,
        handleClearAllMarkers: handleClearAllMarkers,
    };
};
export default useMarkers;
