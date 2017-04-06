/*
Original license:

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

Based on code in https://bugzilla.mozilla.org/show_bug.cgi?id=1271553.
*/
"use strict";
const self = require("sdk/self");
const {Cc, Ci} = require("chrome");
const HANDLER_NAME = "huft:// protocol handler";
const PROTOCOL_SCHEME = "huft";
const URI_TEMPLATE = "https://capacitorset.github.io/huft/#%s";
if (self.loadReason === "install" || self.loadReason === "enable") {
	const handler = Cc["@mozilla.org/uriloader/web-handler-app;1"].createInstance(Ci.nsIWebHandlerApp);
	handler.name = HANDLER_NAME;
	handler.uriTemplate = URI_TEMPLATE;
	const eps = Cc["@mozilla.org/uriloader/external-protocol-service;1"].getService(Ci.nsIExternalProtocolService);
	const protoInfo = eps.getProtocolHandlerInfo(PROTOCOL_SCHEME);
	protoInfo.possibleApplicationHandlers.appendElement(handler, false);
	protoInfo.preferredApplicationHandler = handler;
	protoInfo.alwaysAskBeforeHandling = false;
	const hs = Cc["@mozilla.org/uriloader/handler-service;1"].getService(Ci.nsIHandlerService);
	hs.store(protoInfo);
}
require("sdk/system/unload").when(function (unloadReason) {
	if (unloadReason !== "disable") return;
	const eps = Cc["@mozilla.org/uriloader/external-protocol-service;1"].getService(Ci.nsIExternalProtocolService);
	const protoInfo = eps.getProtocolHandlerInfo(PROTOCOL_SCHEME);
	const appHandlers = protoInfo.possibleApplicationHandlers;
	for (let i = 0; i < appHandlers.length; i++) {
		try {
			const handler = appHandlers.queryElementAt(i, Ci.nsIWebHandlerApp);
			if (handler && handler.uriTemplate === URI_TEMPLATE) {
				appHandlers.removeElementAt(i);
				if (protoInfo.preferredApplicationHandler === handler) {
					protoInfo.preferredApplicationHandler = null;
					protoInfo.alwaysAskBeforeHandling = true;
				}
				break;
			}
		} catch (e) {
			continue;
		}
	}
	const hs = Cc["@mozilla.org/uriloader/handler-service;1"].getService(Ci.nsIHandlerService);
	hs.store(protoInfo);
})