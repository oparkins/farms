class ApplicationController < ActionController::API
    include Response
    include ExceptionHandler
    before_action :set_headers

    protected
        def set_headers
            headers['FARMS-Server'] = 'yes-sir'
            headers['FARMS-API'] = 'v1'
            if User.count() == 0 then
                headers['FARMS-SETUP'] = 'no'
                puts "FARMS is not setup"
            end
        end

    
end
