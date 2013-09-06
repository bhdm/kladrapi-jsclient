(function($){
    $.kladr = {};
    
    // Service URL
    $.kladr.url = 'http://kladr-api.ru/api.php';
    
    // Enum KLADR object types
    $.kladr.type = {
        region: 'region',
        district: 'district',
        city: 'city',
        street: 'street',
        building: 'building'
    };
    
    // Send query to service
    $.kladr.api = function( query, callback ){
        var params = {};
        
        if( query.token ) params.token = query.token;
        if( query.key ) params.key = query.key;
        if( query.type ) params.contentType = query.type;
        if( query.name ) params.query = query.name;
        
        if( query.parentType && query.parentId ){
            params[query.parentType+'Id'] = query.parentId;
        }
        
        if( query.withParents ) params.withParent = 1;
        params.limit = query.limit ? query.limit : 2000;
        
        $.getJSON($.kladr.url + "?callback=?",
            params,
            function( data ) {
                callback && callback( data.result );
            }
        );
    };
    
    // Check existence object
    $.kladr.check = function( query, callback ){
        query.withParents = false;
        query.limit = 1;
        
        $.kladr.api(query, function(objs){
            if(objs && objs.length){
                callback && callback(objs[0]); 
            } else {
                callback && callback(false);
            }
        });
    };
})(jQuery);