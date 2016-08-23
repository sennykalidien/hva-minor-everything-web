app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: false,
        closeHtml: '',
        containerId: 'bln-toastcontainer',
        iconClass: 'bln-sub-icon',
        iconClasses: {
            error: 'bln-toast-error',
            info: 'bln-toast-info',
            success: 'bln-toast-success',
            warning: 'bln-toast-warning'
        },
        maxOpened: 5,
        messageClass: 'bln-sub-message',
        newestOnTop: true,
        onHidden: null,
        onShown: null,
        positionClass: '',
        preventDuplicates: false,
        progressBar: false,
        tapToDismiss: false,
        target: 'bln-app, bln-modals',
        timeOut: 3500,
        titleClass: 'bln-sub-title',
        toastClass: 'bln-toast'
    });
});