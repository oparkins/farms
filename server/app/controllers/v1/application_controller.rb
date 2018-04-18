class V1::ApplicationController < ActionController::API
    include Response
    include ExceptionHandler
    include DeviseTokenAuth::Concerns::SetUserByToken

    before_action :set_headers, :authenticate_user!

    protected
        def set_headers
            headers['FARMS-Server'] = 'yes-sir'
            headers['FARMS-API'] = 'v1'
        end
end
