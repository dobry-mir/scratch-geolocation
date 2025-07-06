(function (Scratch) {
    'use strict';

    class GeoExtension {
        constructor() {
            this.latitude = null;
            this.longitude = null;
            this.accuracy = null;
            this.altitude = null;
            this.altitudeAccuracy = null;
            this.speed = null;
            this.heading = null;

            this._updatePosition();
            setInterval(() => this._updatePosition(), 1000);
        }

        _updatePosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.accuracy = position.coords.accuracy;
                        this.altitude = position.coords.altitude;
                        this.altitudeAccuracy = position.coords.altitudeAccuracy;
                        this.speed = position.coords.speed;
                        this.heading = position.coords.heading;

                        console.log('[GeoExtension] Updated position:', {
                            lat: this.latitude,
                            lon: this.longitude,
                            accuracy: this.accuracy,
                            altitude: this.altitude,
                            altitudeAccuracy: this.altitudeAccuracy,
                            speed: this.speed,
                            heading: this.heading
                        });
                    },
                    (error) => {
                        console.error('[GeoExtension] Geolocation error:', error);
                        this.latitude = null;
                        this.longitude = null;
                        this.accuracy = null;
                        this.altitude = null;
                        this.altitudeAccuracy = null;
                        this.speed = null;
                        this.heading = null;
                    }
                );
            } else {
                console.log('[GeoExtension] Geolocation not supported.');
                this.latitude = null;
                this.longitude = null;
                this.accuracy = null;
                this.altitude = null;
                this.altitudeAccuracy = null;
                this.speed = null;
                this.heading = null;
            }
        }

        getLatitude() {
            return this.latitude !== null ? this.latitude : 'No data';
        }

        getLongitude() {
            return this.longitude !== null ? this.longitude : 'No data';
        }

        getAccuracy() {
            return this.accuracy !== null ? this.accuracy : 'No data';
        }

        getAltitude() {
            return this.altitude !== null ? this.altitude : 'No data';
        }

        getAltitudeAccuracy() {
            return this.altitudeAccuracy !== null ? this.altitudeAccuracy : 'No data';
        }

        getSpeed() {
            return this.speed !== null ? this.speed : 'No data';
        }

        getHeading() {
            return this.heading !== null ? this.heading : 'No data';
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
                    },
                    {
                        opcode: 'getAccuracy',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'accuracy (meters)',
                    },
                    {
                        opcode: 'getAltitude',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'altitude (meters)',
                    },
                    {
                        opcode: 'getAltitudeAccuracy',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'altitude accuracy (meters)',
                    },
                    {
                        opcode: 'getSpeed',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'speed (m/s)',
                    },
                    {
                        opcode: 'getHeading',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'heading (degrees)',
                    }
                ]
            };
        }
    }

    Scratch.extensions.register(new GeoExtension());
})(Scratch);
