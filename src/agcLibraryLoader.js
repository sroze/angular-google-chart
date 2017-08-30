/* global angular */
(function(){
    angular.module("googlechart")
        .provider("agcLibraryLoader", AgcLibraryLoaderProvider);

    AgcLibraryLoaderProvider.$inject = ["$injector"];

    function AgcLibraryLoaderProvider($injector){

        var DEFAULT_LOADER = "Jsapi";

        this.setLoader = function(loaderName){
            if (!$injector.has(this.getProviderName(loaderName))) {
                console.warn("[Angular-GoogleChart] Loader type \"" + loaderName + "\" doesn't exist. Defaulting to JSAPI loader.");

                loaderName = DEFAULT_LOADER;
            }
            
            this.$get = [this.getProviderName(loaderName), function(loader) {
                return loader;
            }];
        };

        this.getProviderName = function(loaderName){
            loaderName = loaderName.charAt(0).toUpperCase() + loaderName.slice(1);
            return "agc" + loaderName + "Loader";
        };

        this.setLoader(DEFAULT_LOADER);
    }
})();
