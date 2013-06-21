﻿'use strict';

define([
    'app', 'marionette', 'Mixins/AsModelBoundView', 'bootstrap'

], function (App, Marionette, AsModelBoundView) {

    var view = Marionette.ItemView.extend({
        template : 'Settings/DownloadClient/DownloadClientTemplate',
        className: 'form-horizontal',

        ui: {
            bsSwitch            : '.switch',
            tooltip             : '.help-inline i',
            pathInput           : '.x-path',
            sabConfig           : '.x-sab-config',
            blackholeConfig     : '.x-blackhole-config',
            pneumaticConfig     : '.x-pneumatic-config',
            nzbGetConfig        : '.x-nzbget-config',
            downloadClientSelect: '.x-download-client'
        },

        events: {
            'change .x-download-client': 'downloadClientChanged'
        },

        onRender: function () {
            this.ui.pathInput.autoComplete('/directories');
            this.refreshUIVisibility(this.model.get('downloadClient'));
        },

        downloadClientChanged: function () {
            var clientId = this.ui.downloadClientSelect.val();
            this.refreshUIVisibility(clientId);
        },

        refreshUIVisibility: function (clientId) {

            if (!clientId) {
                clientId = "sabnzbd";
            }

            switch (clientId.toString()) {
                case "sabnzbd":
                    this.ui.sabConfig.show();
                    this.ui.blackholeConfig.hide();
                    this.ui.pneumaticConfig.hide();
                    this.ui.nzbGetConfig.hide();
                    break;

                case "blackhole":
                    this.ui.sabConfig.hide();
                    this.ui.blackholeConfig.show();
                    this.ui.pneumaticConfig.hide();
                    this.ui.nzbGetConfig.hide();
                    break;

                case "pneumatic":
                    this.ui.sabConfig.hide();
                    this.ui.blackholeConfig.hide();
                    this.ui.pneumaticConfig.show();
                    this.ui.nzbGetConfig.hide();
                    break;

                case "nzbget":
                    this.ui.sabConfig.hide();
                    this.ui.blackholeConfig.hide();
                    this.ui.pneumaticConfig.hide();
                    this.ui.nzbGetConfig.show();
                    break;

                default :
                    throw "unknown download client id" + clientId;
            }
        }
    });

    return AsModelBoundView.call(view);
});
