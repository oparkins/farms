class ApplicationController < ActionController::API
    include Response
    include ExceptionHandler
    before_action :set_headers

    protected
        def set_headers
            headers['FARMS-Server'] = 'yes-sir'
            headers['FARMS-API'] = 'v1'
        end
end
