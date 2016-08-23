// grunt task specification
module.exports = {


    // ------------------------------------
    //   Default task
    //   performs development build and start watch & server
    // ------------------------------------
    'default': [

        // Pre
        'development',                   // generate development build           -> .grunt-tmp/ build/
        'concurrent'                   // run all forever-tasks via concurrent
        //'test'
    ],


    // ------------------------------------
    //   Development task
    //   does not minify any code, mainly used in development environments
    // ------------------------------------
    'development': [
        // Pre
        'clean:all',                     // clean all build files                -> .grunt-tmp/ build/

        // Generators
        'ngtemplates',                   // generate template file               -> .grunt-tmp/js/

        // Compile and concatenate
        'less',                          // compile all less project files       -> .grunt-tmp/css/
        'concat:styles_vendor',          // concatenate css vendor files         -> .grunt-tmp/css/
        'concat:scripts_project',        // concatenate js project files         -> .grunt-tmp/js/
        'concat:scripts_vendor',         // concatenate js vendor files          -> .grunt-tmp/js/
        
        // Critical CSS
        'criticalcss:custom:options',    // create criticalcss file              -> .grunt-tmp/css/critical.css
        
        // Autoprefixer processor
        'autoprefixer:styles_project',   // autoprefix project css files         -> .grunt-tmp/css/app.css
        'autoprefixer:styles_critical',  // autoprefix critical css file         -> .grunt-tmp/css/critical.css  
       
        // Image minify
        'imagemin:dynamic',              // image compression                    -> .grunt-tmp/images/
        
        // Responsive images
        'responsive_images:images',      // Responsive images                    -> .grunt-tmp/images/
        
        // Minify
        'cssmin:styles_project',         // minify & copy project css files      -> build/css/
        'cssmin:styles_vendor',          // minify & copy vendor css files       -> build/css/
        'cssmin:styles_critical',        // minify critical css                  -> buid/css/
        'uglify:scripts_project',        // minify & copy project js files       -> build/js/
        'uglify:scripts_vendor',         // minify & copy vendor js files        -> build/js/ 
        'htmlmin:index',                 // minify index.html                    -> .grunt-temp
        'htmlmin:views',                 // minify views                         -> .grunt-temp
        
        // Copy
        'copy:scripts_project',          // copy project scripts file            -> build/js/
        'copy:scripts_vendor',           // copy vendor scripts file             -> build/js/
        'copy:styles_project',           // copy project & vendor styles files   -> build/css/
        'copy:styles_vendor',            // copy project & vendor styles files   -> build/css/
        'copy:styles_critical',          // copy critical style file             -> src/css/        
        'copy:statics',                  // copy all static files to the root    -> build/
        'copy:statics_html',             // copy all static files to the root    -> build/        
        'copy:images',                   // copy all images to the images files  -> build/        
        //'replace:cache_bust_index',      // make sure js/css cache is busted   -> build/
        //'replace:cache_bust_sw',         // make sure js/css cache is busted   -> build/        

        // Post
        'clean:tmp',                     // cleanup temporary generated files    -> .grunt-tmp/
    ],
    
    'test': [
        'imagemin:dynamic',               // image compression                    -> .grunt-tmp/images/  
    ],

    // ------------------------------------
    //   Production task
    //   minifies all code, mainly used in deploys to production servers
    // ------------------------------------
    'production': [
        // Pre
        'clean:all',                     // clean all build files                -> .grunt-tmp/ build/

        // Generators
        'modernizr',                     // generate Modernizr build             -> .grunt-tmp/js/
        'ngtemplates',                   // generate template file               -> .grunt-tmp/js/

        // Compile and concatenate
        'less',                          // compile all less project files       -> .grunt-tmp/css/
        'concat:styles_vendor',          // concatenate css vendor files         -> .grunt-tmp/css/
        'concat:scripts_project',        // concatenate js project files         -> .grunt-tmp/js/
        'concat:scripts_vendor_prod',    // concatenate js vendor files          -> .grunt-tmp/js/

        // Autoprefixer processor
        'autoprefixer:styles_project',   // autoprefix project css files         -> .grunt-tmp/css/app.css

        // Pre-minify
        // 'ngAnnotate:project',         // prepare project code for mangling    -> .grunt-tmp/js/

        // Minify
        'cssmin:styles_project',         // minify & copy project css files      -> build/css/
        'cssmin:styles_vendor',          // minify & copy vendor css files       -> build/css/
        'uglify:scripts_project',        // minify & copy project js files       -> build/js/
        'uglify:scripts_vendor',         // minify & copy vendor js files        -> build/js/

        // Copy
        'copy:scripts_project',          // copy project scripts file            -> build/js/
        'copy:scripts_vendor',           // copy vendor scripts file             -> build/js/
        'copy:styles_project',           // copy project & vendor styles files   -> build/css/
        'copy:styles_vendor',            // copy project & vendor styles files   -> build/css/
        'copy:statics',                  // copy all static files to the root    -> build/
        'replace:cache_bust',            // make sure js/css cache is busted     -> build/

        // Post
        'clean:tmp',                     // cleanup temporary generated files    -> .grunt-tmp/
    ],


};
