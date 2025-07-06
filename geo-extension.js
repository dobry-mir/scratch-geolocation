(function (Scratch) {
    'use strict';

    class GeoExtension {
        constructor() {
            this.latitude = null;
            this.longitude = null;
            this._updatePosition();
            setInterval(() => this._updatePosition(), 10000);
        }

        _updatePosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        console.log('[GeoExtension] Position updated:', this.latitude, this.longitude);
                    },
                    (error) => {
                        console.error('[GeoExtension] Geolocation error:', error);
                        this.latitude = null;
                        this.longitude = null;
                    }
                );
            } else {
                console.log('[GeoExtension] Geolocation not supported.');
                this.latitude = null;
                this.longitude = null;
            }
        }

        getLatitude() {
            return this.latitude !== null ? this.latitude : 'No data';
        }

        getLongitude() {
            return this.longitude !== null ? this.longitude : 'No data';
        }

        getInfo() {
            return {
                id: 'geoExtension',
                name: 'Geolocation',
                color1: '#4a90e2',
                blocks: [
                    {
                        opcode: 'getLatitude',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'latitude',
                    },
                    {
                        opcode: 'getLongitude',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'longitude',
                    }
                ]
            };
        }
    }

    Scratch.extensions.register(new GeoExtension());
})(Scratch);
