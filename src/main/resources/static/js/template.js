//HEAD 
(function(app) {
try { app = angular.module("wayco.template"); }
catch(err) { app = angular.module("wayco.template", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("webapp/order/create/_create_order.html","<div class=\"container-fluid\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      \n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "")

$templateCache.put("webapp/order/list/_list_order.html","<div class=\"container-fluid\">\n" +
    "  <div class=\"row\">\n" +
    "    \n" +
    "  </div>\n" +
    "</div>\n" +
    "")
}]);
})();